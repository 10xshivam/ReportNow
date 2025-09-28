import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { validateTurnstileToken } from '@/lib/turnstile'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                turnstileToken: { label: "Turnstile Token", type: "text" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password || !credentials?.turnstileToken) {
                    throw new Error("Missing credentials or captcha verification");
                }

                // Get client IP for Turnstile validation
                const forwarded = req.headers?.["x-forwarded-for"];
                const realIp = req.headers?.["x-real-ip"];
                const cfConnectingIp = req.headers?.["cf-connecting-ip"];
                
                const ip = cfConnectingIp || 
                          (forwarded 
                            ? (typeof forwarded === 'string' ? forwarded : forwarded[0]).split(',')[0].trim()
                            : realIp || 
                              'unknown');

                // Validate Turnstile token first
                try {
                    const turnstileValidation = await validateTurnstileToken(
                        credentials.turnstileToken,
                        typeof ip === 'string' ? ip : 'unknown',
                        {
                            // Optional: specify expected action if you set it on client
                            // expectedAction: 'login',
                            // Optional: specify expected hostname for additional security
                            expectedHostname: process.env.NEXTAUTH_URL 
                                ? new URL(process.env.NEXTAUTH_URL).hostname 
                                : undefined
                        }
                    );

                    if (!turnstileValidation.isValid) {
                        console.error('Turnstile validation failed:', turnstileValidation.error);
                        throw new Error("TurnstileError");
                    }

                    console.log('Turnstile validation successful for IP:', ip);
                } catch (error) {
                    console.error('Turnstile validation error:', error);
                    throw new Error("TurnstileError");
                }

                // Proceed with user validation after successful captcha
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user) {
                        throw new Error("Users are not allowed to login");
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password!
                    );

                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password");
                    }

                    return {
                        id: user.id,
                        name: user.name ?? '',
                        email: user.email,
                        image: user.image ?? ''
                    };
                } catch (error) {
                    // Re-throw the error to maintain your existing error handling
                    throw error;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.image = user.image
            }
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.image = token.image as string
            }
            return session
        }
    },
    pages: {
        signIn: "/admin/login"
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}