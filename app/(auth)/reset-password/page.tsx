"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/auth-client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { resetPasswordSchema } from "@/lib/zodSchemas";
import Image from "next/image";

function ResetPasswordContent() {
	const router = useRouter();
	const { toast } = useToast();
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
  const token = searchParams.get("token");
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
		setIsPending(true);
    if (!token) {
      toast({
        title: "Error",
        description: "Invalid reset token",
        variant: "destructive",
      });
      setIsPending(false);
      return;
    }
		const { error } = await authClient.resetPassword({
			newPassword: data.password,
      token: token,
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
				description: "Password reset successful. Login to continue.",
			});
			router.push("/sign-in");
		}
		setIsPending(false);
	};

	if (error === "invalid_token") {
		return (
			<div className="grow flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center text-content-day">
							Invalid Reset Link
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<p className="text-center text-primary-day">
								This password reset link is invalid or has expired.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
    <div className="bg-[url('https://utfs.io/f/mLASHSxEsNLiuuEsIS1jozy9UTrqw6tkM4On82eKlLvIfSu7')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen relative">
			<Card className="w-full max-w-md max-h-[92vh] h-fit flex flex-col  items-center justify-center p-3 bg-text-button absolute">
				<CardHeader className="flex flex-col items-center mb-[-20] mt-[-25]">
           <Image src="/img/infilogo.png" alt="logo" width={112} height={45} />
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Reset Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter your new password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm your new password"
												{...field}
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

export default function ResetPassword() {
	return (
		<Suspense>
			<ResetPasswordContent />
		</Suspense>
	);
}
