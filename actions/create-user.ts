"use server"
import { signUpSchema } from "@/lib/zodSchemas"
import {parseWithZod} from "@conform-to/zod"
import { redirect } from "next/navigation";


export async function CreateUser(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: signUpSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    return redirect("/email-verified")
}