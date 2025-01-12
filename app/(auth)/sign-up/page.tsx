"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { signUpSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/auth-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";


export default function SignUp() {
    const [pending, setPending] = useState(false)
    const { toast } = useToast();

    const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onRequest: () => {
					setPending(true);
				},
				onSuccess: () => {
					toast({
						title: "Account created",
						description:
							"Your account has been created. Check your email for a verification link.",
					});
				},
				onError: (ctx) => {
					console.log("error", ctx);
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
					});
				},
			}
		);
		setPending(false);
	};

  return (
    <div className="bg-[url('/img/infi.png')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen relative">
        <Card className=" mx-auto max-w-md max-h-[92vh] w-full h-fit flex flex-col items-center justify-center p-2 bg-text-button absolute ">
        <CardHeader className="flex flex-col items-center mb-[-20] mt-[-25]">
            <Image src="/img/infilogo.png" alt="logo" width={112} height={45} className="object-cover mb-[-23]" />
            <CardTitle className="text-content-day text-xl font-semibold ">Sign Up</CardTitle>
        </CardHeader>
            <CardContent className="text-content-day w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                {["name", "email", "password", "confirmPassword", "Referral Code"].map((field) => (
								<FormField
									control={form.control}
									key={field}
									name={field as keyof z.infer<typeof signUpSchema>}
									render={({ field: fieldProps }) => (
										<FormItem>
											<FormLabel>
												{field.charAt(0).toUpperCase() + field.slice(1)}
											</FormLabel>
											<FormControl>
												<Input
													type={
														field.includes("password")
															? "password"
															: field === "email"
															? "email"
															: "name"
													}
													placeholder={`Enter your ${field}`}
													{...fieldProps}
													autoComplete="off"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
                            <div className="flex mt-2 flex-col ">
                                
                                <div className="flex items-center md:justify-center justify-start text-[13px] md:mt-4 mt-2 text-primary-day">
                                <Link href="/sign-in">Already have an acccount? Sign in.</Link>
                                </div>
                                
                            </div>
                            {pending ? (
        <Button disabled className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">Sign Up</Button>
      )}
                    </form>
                    </Form>
            </CardContent>
        </Card>

    </div>
  )
}

