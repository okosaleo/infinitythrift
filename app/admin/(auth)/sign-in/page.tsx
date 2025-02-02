"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { signInSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/auth-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function SignUp() {
    const [pending, setPending] = useState(false)
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password, 
			},
			{
				onRequest: () => {
					setPending(true);
				},
				onSuccess: () => {
					setPending(false);
					router.push("/admin/dashboard");
				},
				onError: (ctx) => {
					console.log("error", ctx);
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Sign up or check your inputs",
                        variant: "destructive"
					});
				},
			}
		);
		setPending(false);
	};

  return (
    <div className="bg-[url('/img/infi.png')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen relative">
        <Card className=" mx-auto max-w-md max-h-[92vh] w-full h-fit flex flex-col  items-center justify-center p-3 bg-text-button absolute ">
        <CardHeader className="flex flex-col items-center mb-[-20] mt-[-25]">
            <Image src="/img/infilogo.png" alt="logo" width={112} height={45} />
            <CardTitle className="text-content-day text-xl font-semibold mb-[-23]">Sign In</CardTitle>
        </CardHeader>
            <CardContent className="text-content-day w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                {[ "email", "password"].map((field) => (
								<FormField
									control={form.control}
									key={field}
									name={field as keyof z.infer<typeof signInSchema>}
									render={({ field: fieldProps }) => (
										<FormItem>
											<FormLabel>
												{field.charAt(0).toUpperCase() + field.slice(1)}
											</FormLabel>
											<FormControl>
												<Input
													type={field === "password" ? "password" : "email"}
													placeholder={`Enter your ${field}`}
													{...fieldProps}
													autoComplete={
														field === "password" ? "current-password" : "email" }
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
                            <div className="flex mt-2 flex-col ">
                            <div className="flex md:flex-row flex-col justify-between gap-2">
                                <div className="flex flex-row items-center gap-2 text-sm"><Checkbox /> <p>Remember Me</p></div>
                                <Link href="/forgot-password" className="text-[12px] text-primary-day ">Forgot Password?</Link>
                                </div>
                                
                            </div>
                            {pending ? (
        <Button disabled className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">Sign In</Button>
      )}
                    </form>
                    </Form>
            </CardContent>
        </Card>

    </div>
  )
}