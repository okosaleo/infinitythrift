"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { signUpSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setPending(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Account created",
          description: "Your account has been created. Check your email for a verification link.",
        });
        // Optionally, redirect the user after sign up
      } else {
        toast({
          title: "Something went wrong",
          description: result.error || "An error occurred during sign up.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message || "An error occurred during sign up.",
      });
    }
    setPending(false);
  };

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password" },
    { name: "referralCode", label: "Referral Code", type: "text", placeholder: "Enter referral code (optional)" },
  ];

  return (
    <div className="bg-[url('https://utfs.io/f/mLASHSxEsNLitNpkuevdDyTUwOs4lMG1QKpfbLqNzXERgS7I')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen relative">
      <Card className="mx-auto max-w-md max-h-[92vh] w-full h-fit flex flex-col items-center justify-center p-2 bg-text-button absolute">
        <CardHeader className="flex flex-col items-center mb-[-28px] mt-[-30px]">
          <Image
            src="/img/infilogo.png"
            alt="logo"
            width={112}
            height={40}
            className="object-cover mb-[-23]"
          />
          <CardTitle className="text-content-day text-xl mt-[-10px] font-semibold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="text-content-day w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof z.infer<typeof signUpSchema>}
                  render={({ field: fieldProps, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={field.type}
                          placeholder={field.placeholder}
                          {...fieldProps}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage className="text-[11px]">{error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex flex-col">
                <div className="flex items-center md:justify-center justify-start text-[13px] mt-2 text-primary-day">
                  <Link href="/sign-in">Already have an account? Sign in.</Link>
                </div>
              </div>
              {pending ? (
                <Button disabled className="text-text-button bg-primary-day w-full hover:bg-hover-btn">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">
                  Sign Up
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}



