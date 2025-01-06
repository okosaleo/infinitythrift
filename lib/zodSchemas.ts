import {z} from "zod"

export const signUpSchema = z.object({
    firstName: z.string().min(1).max(25),
    lastName: z.string().min(1).max(25),
    email: z.string().email(),
    password: z.string().min(8).max(32),
})

