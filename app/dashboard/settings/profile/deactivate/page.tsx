"use client";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialogCancel, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Deactivate() {
  const { toast } = useToast();
  const router = useRouter();

  const deleteAccount = async () => {
    try {
      const response = await axios.delete('/api/delete-account');
      if (response.status === 200) {
        toast({
          title: "Your Account was deleted!",
          description: "You have deleted your account.",
          variant: "destructive"
        });
        // Redirect after deletion – adjust the path as needed
        router.push("/sign-in");
      } else {
        toast({
          title: "Sysytem Error!",
          description: "We encountered a problem deleting your account.",
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("There was an error deleting your account.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <AlertDialog>
        <Card>
          <CardContent className="bg-active-nav rounded-md">
            <CardHeader>
              <CardTitle>
                Are you sure you want to delete or deactivate this account?
              </CardTitle>
            </CardHeader>
            <div className="flex w-full justify-between gap-4">
              <Link 
                href="/dashboard" 
                className="w-1/2 bg-primary-day rounded-md flex justify-center items-center text-text-button"
              > 
                <p>No</p>
              </Link>
              <AlertDialogTrigger className="w-1/2">
                <Button className="w-full" variant="destructive">
                  Yes
                </Button>
              </AlertDialogTrigger>
            </div>
          </CardContent>
        </Card>
        <AlertDialogContent className="bg-active-nav mt-10">
          <AlertDialogHeader className="flex items-center justify-center">
            <AlertDialogTitle>Are you really sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="w-full flex gap-4">
            <AlertDialogCancel className="w-1/2">
              <Button className="w-full">No</Button>
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAccount}
              className="bg-destructive w-1/2 hover:bg-destructive-day"
            >
              Yes
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
