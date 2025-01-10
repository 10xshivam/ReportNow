import {PrismaAdapter} from '@next-auth/prisma-adapter'
import prisma from './prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions : NextAuthOptions  = {
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            id:"Credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"email"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing credentials");
                }

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
                    image:user.image ?? ''
                };
            },
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
                token.email = user.email
                token.image = user.image
            }
            return token;
        },
        async session({session,token}){
            if(session){
                session.user.id = token.id
                session.user.email = token.email
                session.user.image = token.image
            }
            return session
        }
    },
    pages:{
        signIn:"/admin/login"
    },
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}
