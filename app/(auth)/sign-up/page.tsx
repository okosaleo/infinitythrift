"use client"
import { CreateUser } from "@/actions/create-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useActionState } from "react";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { signUpSchema } from "@/lib/zodSchemas";


export default function SignUp() {
    const [lastResult, action] = useActionState(CreateUser, undefined)

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: signUpSchema});
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: "onInput",
    })
  return (
    <div className="bg-[url('/img/infi.png')] lg:bg-[length:70vw_100vh] bg-[length:100vw_100vh] bg-center w-full flex items-center justify-center h-screen relative">
        <Card className=" mx-auto max-w-md w-2/3 flex flex-col items-center justify-center p-2 bg-text-button absolute ">
        <CardHeader className="flex flex-col items-center">
            <Image src="/img/infilogo.png" alt="logo" width={112} height={45} />
            <CardTitle className="text-content-day text-xl font-semibold">Sign Up</CardTitle>
        </CardHeader>
            <CardContent className="text-content-day w-full">
                <form id={form.id} onSubmit={form.onSubmit} action={action}>
                    <div className="flex flex-col md:gap-2 gap-0">
                    <div>
                        <Label htmlFor="first-name">First name</Label>
                        <Input
                        key={fields.firstName.key}
                        name={fields.firstName.name}
                        defaultValue={fields.firstName.initialValue}
                         id="first-name" placeholder="John" className="border-primary-day" />
                         <p className=" text-sm text-destructive-day">{fields.firstName.errors}</p>
                    </div>
                    <div>
                        <Label htmlFor="last-name">Last name</Label>
                        <Input 
                          key={fields.lastName.key}
                          name={fields.lastName.name}
                          defaultValue={fields.lastName.initialValue}
                        id="last-name" placeholder="Doe" className="border-primary-day" />
                         <p className=" text-sm text-destructive-day">{fields.lastName.errors}</p>
                    </div>
                    <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                        key={fields.email.key}
                        name={fields.email.name}
                        defaultValue={fields.email.initialValue}
                         id="email" placeholder="w@gmail.com"  className="border-primary-day"/>
                         <p className="text-sm text-destructive-day">{fields.email.errors}</p>
                    </div>
                   <div>
                        <Label htmlFor="first-name">Password</Label>
                        <Input
                        key={fields.password.key}
                        defaultValue={fields.password.initialValue}
                        name={fields.password.name}
                         id="password" type="password" className="border-primary-day" />
                         <p className="text-sm text-destructive-day">{fields.password.errors}</p>
                    </div>
                    <div className="flex md:flex-row flex-col mt-4 md:gap-0 gap-4 justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <Checkbox />
                            <Label>Remember me</Label>
                        </div>
                        <div>
                            <p className="text-primary-day text-sm"> Forgot Password ?</p>
                        </div>
                    </div>
                    </div>
                    <Button type="submit" className="text-text-button mt-4 bg-primary-day w-full hover:bg-hover-btn">Sign Up</Button>
                    </form>
            </CardContent>
        </Card>

    </div>
  )
}