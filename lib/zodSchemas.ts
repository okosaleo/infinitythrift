import { object, string } from "zod";
import { z } from 'zod';
import { ThriftCategory, SavingsStatus } from "@prisma/client";

const getPasswordSchema = (type: "password" | "confirmPassword") =>
  string({ required_error: `${type} is required` })
    .min(8, `${type} must be at least 8 characters`)
    .max(32, `${type} cannot exceed 32 characters`);

const getEmailSchema = () =>
  string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email");

const getNameSchema = () =>
  string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters");

const getReferralSchema = () =>
  string()
    .max(15, "Referral code must be less than 15 characters")
    .optional();

export const signUpSchema = object({
  name: getNameSchema(),
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
  referralCode: getReferralSchema(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const signInSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema("password"),
});

export const forgotPasswordSchema = object({
  email: getEmailSchema(),
});

export const resetPasswordSchema = object({
  password: getPasswordSchema("password"),
  confirmPassword: getPasswordSchema("confirmPassword"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export const kycSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  phoneNumber: z.string().nonempty("input your phone number"),
});

 export const withdrawalSchema = z.object({
  amount: z
    .string()
    .nonempty("Amount is required")
    .refine((val) => !isNaN(Number(val)), "Amount must be a valid number")
    .transform((val) => Number(val))
    .refine((val) => val > 0, "Amount must be positive"),
  bankName: z.string().nonempty("Bank name is required"),
  accountNumber: z.string().nonempty("Account number is required"),
  note: z.string().optional(),
});

export const ThriftSavingsSchema = z.object({
  category: z.enum([
    ThriftCategory.BRONZE,
    ThriftCategory.SILVER,
    ThriftCategory.GOLD,
    ThriftCategory.INFINITY
  ]),
  dailyAmount: z.number().positive(),
  description: z.string().optional(),
  targetAmount: z.number().positive().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum([
    SavingsStatus.ACTIVE,
    SavingsStatus.COMPLETED,
    SavingsStatus.WITHDRAWN,
  ]).optional()
});

export type ThriftSavingsFormValues = z.infer<typeof ThriftSavingsSchema>;