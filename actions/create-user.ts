"use server"
import { auth } from "@/auth";
import { signUpSchema } from "@/lib/zodSchemas"
import {parseWithZod} from "@conform-to/zod"


export async function CreateUser(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: signUpSchema,
    });

    if(submission.status !== "success") {
        return submission.reply();
    }

    const validatedFields = signUpSchema.safeParse({
        email: formData.get("email"),
        lastName: formData.get("lastName"),
        firstName: formData.get("firstName"),
        password: formData.get("password"),
    })

}