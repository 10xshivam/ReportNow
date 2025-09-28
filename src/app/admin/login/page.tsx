"use client";
import { loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { TurnstileRenderOptions } from "@/types/turnstile";

// Declare Turnstile types
declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: TurnstileRenderOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
      isExpired: (widgetId: string) => boolean;
      execute: (element: string | HTMLElement) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Load Turnstile script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    
    window.onTurnstileLoad = () => {
      setTurnstileLoaded(true);
    };

    script.onload = () => {
      if (window.turnstile) {
        setTurnstileLoaded(true);
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, []);

  // Render Turnstile widget when loaded
  useEffect(() => {
    if (turnstileLoaded && turnstileRef.current && window.turnstile) {
      widgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback: (token: string) => {
          setTurnstileToken(token);
        },
        'error-callback': () => {
          setTurnstileToken("");
          toast({
            title: "Captcha Error",
            description: "Please try again",
            variant: "destructive",
          });
        },
        'expired-callback': () => {
          setTurnstileToken("");
        },
        theme: 'dark', // matches your dark theme
        size: 'normal',
      });
    }
  }, [turnstileLoaded, toast]);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    if (!turnstileToken) {
      toast({
        title: "Captcha Required",
        description: "Please complete the captcha verification",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        turnstileToken, // Pass the turnstile token
      });
      
      console.log(result);
      
      if (result?.error) {
        // Reset captcha on error
        if (widgetId.current && window.turnstile) {
          window.turnstile.reset(widgetId.current);
          setTurnstileToken("");
        }
        
        if (result.error === "CredentialsSignin") {
          toast({
            title: "Login Failed",
            description: "Incorrect username or password",
            variant: "destructive",
          });
        } else if (result.error === "TurnstileError") {
          toast({
            title: "Captcha Verification Failed",
            description: "Please complete the captcha again",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
      }
      
      if (result?.url) {
        router.replace('/admin/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen max-md:px-5">
      <div className="flex justify-center items-center flex-col w-96 bg-white/5 p-8 rounded-xl border border-white/10">
        <h2 className="text-3xl mb-7 tracking-tight font-semibold">
          Admin Login
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Turnstile Widget */}
            <div className="flex justify-center">
              <div ref={turnstileRef} />
            </div>
            
            <Button
              type="submit"
              className="w-full h-10 bg-blue-500 hover:bg-blue-600"
              disabled={!turnstileToken || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}