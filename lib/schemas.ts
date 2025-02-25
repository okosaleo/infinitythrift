import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;


export const categorySavingsSchema = z.object({
  amount: z.number().positive({ message: "Amount must be positive" }),
  description: z.string().max(500).optional(),
});

export type CategorySavingsFormData = z.infer<typeof categorySavingsSchema>;