"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { kycSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import SubmitLoaders from "@/components/submitLOaders";


type KYCFormData = z.infer<typeof kycSchema>;

export default function EditProfile() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KYCFormData>({
    resolver: zodResolver(kycSchema),
  });

  const onSubmit = async (data: KYCFormData) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch("/api/update-kyc", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update KYC");
      }

      await response.json();
      toast({
        title: "You just edited your Profile.",
        description: "You just changed profile info ",
      });
      // Optionally, you might want to redirect or update UI here.
    } catch (error) {
      console.error("Error updating KYC:", error);
      toast({
        title: "Error Updating Your Profile.",
        description: "Error",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen p-3">
      <Card className="md:w-1/3 w-full shadow-md">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Edit Your Account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input placeholder="John" {...register("firstName")} />
                {errors.firstName && (
                  <span className="text-destructive text-sm">{errors.firstName.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input placeholder="Doe" {...register("lastName")} />
                {errors.lastName && (
                  <span className="text-destructive text-sm">{errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Phone Number</Label>
              <Input placeholder="Input phone number" {...register("phoneNumber")} />
              {errors.phoneNumber && (
                <span className="text-destructive text-sm">{errors.phoneNumber.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full">
            <SubmitLoaders text="Save" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

