"use server";
 
import { kycSchema } from "@/lib/kycSchemas";
import { parseWithZod } from "@conform-to/zod";


export async function CreateKYC(prevState:any, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: kycSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value

    console.log(data)
     
}