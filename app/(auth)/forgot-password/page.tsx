"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/auth-client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { forgotPasswordSchema } from "@/lib/zodSchemas";


export default function ForgotPassword() {
	const { toast } = useToast();
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
		setIsPending(true);
		const { error } = await authClient.forgetPassword({
			email: data.email,
			redirectTo: "/reset-password",
		});

		if (error) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Success",
				description:
					"If an account exists with this email, you will receive a password reset link.",
			});
		}
		setIsPending(false);
	};
    return (
        <div className="bg-[url('https://utfs.io/f/mLASHSxEsNLiuuEsIS1jozy9UTrqw6tkM4On82eKlLvIfSu7')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen relative">
             <Card className=" mx-auto max-w-md max-h-[92vh] w-full h-fit flex flex-col  items-center justify-center p-3 bg-text-button absolute ">
        <CardHeader className="flex flex-col items-center mb-[-20] mt-[-25]">
            <Image src="/img/infilogo.png" alt="logo" width={112} height={45} />
            <CardTitle className="text-content-day text-xl font-semibold mb-[-23]">Sign In</CardTitle>
        </CardHeader>
            <CardContent className="text-content-day w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Email
											</FormLabel>
											<FormControl>
												<Input
													type="email"
                                                    placeholder="Enter your email"
                                                    {...field}
                                                    autoComplete="email"
    
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
                            {isPending ? (
        <Button disabled className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">Send Reset Link</Button>
      )}
                    </form>
                    </Form>
            </CardContent>
        </Card>
        </div>
    );
}