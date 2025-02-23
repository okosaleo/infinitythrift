import { z } from 'zod';

export const kycSchema = z.object({
  // Step 1
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.preprocess((arg) => {
    // If arg is a string or already a Date, convert it to a Date
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  state: z.enum(
    [
      'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
      'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
      'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
      'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
      'Yobe', 'Zamfara'
    ],
    { required_error: "State is required" }
  ),
  city: z.string().min(1, { message: "City is required" }),
  proofOfAddressType: z.enum(
    ["National Id", "Passport", "Voters card", "Liscence"],
    { required_error: "Proof of address type is required" }
  ),
  // assuming file uploads return a string (such as a URL or file ID)
  proofOfAddressFile: z.string().min(1),

  // Step 2
  occupation: z.string().min(1, { message: "Occupation is required" }),
  employer: z.string().min(1, { message: "Employer is required" }),
  monthlyIncomeEstimate: z.string().min(1, { message: "Monthly income estimate is required" }),
  bvn: z.string().min(1, { message: "BVN is required" }),

  // Step 3
  issuedIdType: z.enum(
    ["National Id", "Passport", "Voters card", "License"],
    { required_error: "Issued ID type is required" }
  ),
  idUpload: z.string().min(1),
  identificationNumber: z.string().min(1, { message: "Identification number is required" }),
  selfieWithId: z.string().min(1),
  // Step 4
  idSelfie: z.string().min(1),
  signature: z
    .string()
    .min(1, { message: "Signature is required" })
    .refine((val) => val === val.toUpperCase(), {
      message: "Signature must be in all caps",
    }),
});
