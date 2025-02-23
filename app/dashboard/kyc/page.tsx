"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./Date";
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// Define the shape of your form data.
interface KYCFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string
  gender: string;
  address: string;
  state: string;
  city: string;
  proofOfAddressType: string;
  proofOfAddressFile: string;
  occupation: string;
  employer: string;
  monthlyIncomeEstimate: string;
  bvn: string;
  issuedIdType: string;
  idUpload: string;
  selfieWithId: string;
  identificationNumber: string;
  idSelfie: string;
  signature: string;
}

const stateCities = {
  Abia: ["Aba", "Umuahia", "Ohafia", "Arochukwu", "Abiriba"],
  Adamawa: ["Yola", "Mubi", "Jimeta", "Numan", "Ganye"],
  "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak"],
  Anambra: ["Awka", "Onitsha", "Nnewi", "Aguata", "Ogidi"],
  Bauchi: ["Bauchi", "Azare", "Jamaare", "Katagum", "Misau"],
  Bayelsa: ["Yenagoa", "Brass", "Ogbia", "Nembe", "Ekeremor"],
  Benue: ["Makurdi", "Gboko", "Otukpo", "Katsina-Ala", "Vandeikya"],
  Borno: ["Maiduguri", "Bama", "Dikwa", "Biram", "Gubio"],
  "Cross River": ["Calabar", "Ugep", "Ogoja", "Ikom", "Obudu"],
  Delta: ["Asaba", "Warri", "Sapele", "Agbor", "Koko"],
  Ebonyi: ["Abakaliki", "Afikpo", "Onueke", "Edda", "Ishieke"],
  Edo: ["Benin City", "Auchi", "Ekpoma", "Igueben", "Uromi"],
  Ekiti: ["Ado Ekiti", "Ikere", "Ise-Ekiti", "Emure", "Aramoko"],
  Enugu: ["Enugu", "Nsukka", "Agbani", "Awgu", "Udi"],
  FCT: ["Abuja", "Gwagwalada", "Kuje", "Bwari", "Kubwa"],
  Gombe: ["Gombe", "Bajoga", "Kaltungo", "Dukku", "Deba"],
  Imo: ["Owerri", "Okigwe", "Orlu", "Mgbidi", "Awo-Omamma"],
  Jigawa: ["Dutse", "Hadejia", "Birnin Kudu", "Gumel", "Kazaure"],
  Kaduna: ["Kaduna", "Zaria", "Kafanchan", "Sabon Gari", "Makera"],
  Kano: ["Kano", "Daura", "Wudil", "Gaya", "Rano"],
  Katsina: ["Katsina", "Funtua", "Daura", "Malumfashi", "Dutsinma"],
  Kebbi: ["Birnin Kebbi", "Argungu", "Yelwa", "Zuru", "Gwandu"],
  Kogi: ["Lokoja", "Okene", "Idah", "Kabba", "Ajaokuta"],
  Kwara: ["Ilorin", "Offa", "Jebba", "Patigi", "Lafiagi"],
  Lagos: ["Lagos", "Ikeja", "Badagry", "Epe", "Ikorodu"],
  Nasarawa: ["Lafia", "Keffi", "Akwanga", "Nasarawa", "Karu"],
  Niger: ["Minna", "Bida", "Suleja", "Kontagora", "Lapai"],
  Ogun: ["Abeokuta", "Sagamu", "Ijebu-Ode", "Ilaro", "Ota"],
  Ondo: ["Akure", "Ondo", "Owo", "Okitipupa", "Ado-Ekiti"],
  Osun: ["Osogbo", "Ile-Ife", "Ede", "Ikirun", "Iwo"],
  Oyo: ["Ibadan", "Ogbomoso", "Oyo", "Iseyin", "Saki"],
  Plateau: ["Jos", "Bukuru", "Shendam", "Pankshin", "Langtang"],
  Rivers: ["Port Harcourt", "Bonny", "Okrika", "Eleme", "Degema"],
  Sokoto: ["Sokoto", "Tambuwal", "Wurno", "Gwadabawa", "Bodinga"],
  Taraba: ["Jalingo", "Bali", "Wukari", "Takum", "Ibi"],
  Yobe: ["Damaturu", "Potiskum", "Gashua", "Nguru", "Geidam"],
  Zamfara: ["Gusau", "Kaura Namoda", "Tsafe", "Anka", "Talata Mafara"],
};

export default function KYC() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selfie, setSelfie] = useState<string>("");
  const [selfieWithId, setSelfieWithId] = useState<string>("");
  const [idSelfie, setIdSelfie] = useState<string>("");
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {isSubmitting, errors },
  } = useForm<KYCFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      state: "",
      city: "",
      proofOfAddressType: "",
      proofOfAddressFile: "",
      occupation: "",
      employer: "",
      monthlyIncomeEstimate: "",
      bvn: "",
      issuedIdType: "",
      idUpload: "",
      selfieWithId: "",
      identificationNumber: "",
      idSelfie: "",
      signature: "",
    },
  });

  // Use local state for native selects if needed.
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
    } else {
      setIsDialogOpen(false);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>, onChange: (value: string) => void) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedCity(""); // reset city when state changes
    onChange(newState);
  };

  const onSubmit = async (data: KYCFormData) => {
    try {
      // Merge extra state values not directly from the form inputs.
      const payload = {
        ...data,
        dateOfBirth: selectedDate ? selectedDate.toISOString() : "",
        state: selectedState,
        city: selectedCity,
        proofOfAddressFile: imageUrl,
        idUpload: idSelfie,
        selfieWithId: selfieWithId,
        selfie: selfie,
      };

      const res = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast({
          title: "KYC Submitted",
          description: "Your KYC details have been successfully submitted.",
        });
      } else {
        const errorData = await res.json();
        toast({
          title: "Submission Error",
          description: errorData.error || "Error submitting your KYC.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          {step > 1 && (
            <Button variant="ghost" onClick={handleBack} className="mt-[-50px] rounded-full bg-outline-day h-12 w-12">
              <ArrowLeft className="size-5 text-icon-day" />
            </Button>
          )}
        </DialogHeader>

        {/* STEP 1 */}
        <div className={step === 1 ? "" : "hidden"}>
          <div className="flex flex-col gap-2 mt-[-13px]">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1">
                <Label>First name</Label>
                <Input placeholder="First Name" {...(control.register ? control.register("firstName", { required: "Required" }) : {})} />
                {errors.firstName && <p className="text-destructive text-[10px]">{errors.firstName.message}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Label>Last name</Label>
                <Input placeholder="Last Name" {...(control.register ? control.register("lastName", { required: "Required" }) : {})} />
                {errors.lastName && <p className="text-destructive text-[10px]">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-[0.5px]">
              <Label>Date of Birth</Label>
              <div className="flex border-[0.8px] p-1 rounded-md items-center border-input w-full">
                <DatePicker date={selectedDate} setDate={setSelectedDate} name="dateOfBirth" />
                <CalendarIcon className="size-5 text-icon-day" />
              </div>
              {errors.dateOfBirth && <p className="text-destructive text-[10px]">{errors.dateOfBirth.message}</p>}
            </div>
            <div>
              <Label>Gender</Label>
              <Controller
                control={control}
                name="gender"
                rules={{ required: "Gender is required" }}
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <p className="text-destructive text-[10px]">{errors.gender.message}</p>}
            </div>
            <div>
              <Label>Address</Label>
              <Input placeholder="Enter Address" {...(control.register ? control.register("address", { required: "Required" }) : {})} />
              {errors.address && <p className="text-destructive text-[10px]">{errors.address.message}</p>}
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <Label htmlFor="state">State</Label>
                <Controller
                  control={control}
                  name="state"
                  rules={{ required: "State is required" }}
                  render={({ field: { value, onChange } }) => (
                    <select
                      id="state"
                      value={selectedState || value}
                      onChange={(e) => {
                        onChange(e.target.value);
                        handleStateChange(e, onChange);
                      }}
                      className="w-full p-1 border border-input rounded-md"
                    >
                      <option value="">Select State</option>
                      {Object.keys(stateCities).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.state && <p className="text-destructive text-[10px]">{errors.state.message}</p>}
              </div>
              <div className="w-full">
                <Label htmlFor="city">City</Label>
                <Controller
                  control={control}
                  name="city"
                  rules={{ required: "City is required" }}
                  render={({ field: { value, onChange } }) => (
                    <select
                      id="city"
                      value={selectedCity || value}
                      onChange={(e) => {
                        onChange(e.target.value);
                        setSelectedCity(e.target.value);
                      }}
                      disabled={!selectedState}
                      className="w-full p-1 border border-input rounded-md"
                    >
                      <option value="">{selectedState ? "Select City" : "Select State First"}</option>
                      {selectedState &&
                        stateCities[selectedState].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  )}
                />
                {errors.city && <p className="text-destructive text-[10px]">{errors.city.message}</p>}
              </div>
            </div>
            <div>
              <Label>Proof of address type</Label>
              <Controller
                control={control}
                name="proofOfAddressType"
                rules={{ required: "Select a proof type" }}
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>ID</SelectLabel>
                        <SelectItem value="National Id">National ID</SelectItem>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="Voters card">Voters Card</SelectItem>
                        <SelectItem value="Liscence">Drivers License</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.proofOfAddressType && <p className="bg-destructive text-[10px]">{errors.proofOfAddressType.message}</p>}
            </div>
            <div>
              <Label>Upload Proof of Address</Label>
              <input type="hidden" {...(control.register ? control.register("proofOfAddressFile") : {})} value={imageUrl || ""} />
              {imageUrl ? (
                <Image src={imageUrl} alt="Uploaded Image" unoptimized width={100} height={100} className="object-cover rounded-lg" />
              ) : (
                <UploadButton
                  className="h-[10vh] border-dotted border border-primary-day bg-active-nav"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].ufsUrl);
                    toast({
                      title: "Image Uploaded",
                      description: "Proof of address uploaded successfully",
                    });
                  }}
                  onUploadError={() => {
                    toast({
                      title: "Upload Error",
                      description: "Image might be too large or an error occurred",
                      variant: "destructive",
                    });
                  }}
                />
              )}
            </div>
            <DialogTrigger asChild>
              <Button onClick={handleNext}>Next</Button>
            </DialogTrigger>
          </div>
        </div>

        {/* STEP 2 */}
        <div className={step === 2 ? "" : "hidden"}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <p>2/4</p>
            </div>
            <div>
              <Label>Occupation</Label>
              <Controller
                control={control}
                name="occupation"
                rules={{ required: "Occupation is required" }}
                render={({ field }) => (
                  <Input placeholder="Enter Occupation" {...field} />
                )}
              />
              {errors.occupation && <p className="text-destructive text-[10px]">{errors.occupation.message}</p>}
            </div>
            <div>
              <Label>Employer</Label>
              <Controller
                control={control}
                name="employer"
                render={({ field }) => <Input placeholder="Employer Name" {...field} />}
              />
            </div>
            <div>
              <Label>Monthly Income Estimate</Label>
              <Controller
                control={control}
                name="monthlyIncomeEstimate"
                rules={{ required: "Monthly income is required" }}
                render={({ field }) => <Input placeholder="Enter amount" {...field} />}
              />
              {errors.monthlyIncomeEstimate && <p className="text-destructive text-[10px]">{errors.monthlyIncomeEstimate.message}</p>}
            </div>
            <div>
              <Label>Bank Verification Number (BVN)</Label>
              <Controller
                control={control}
                name="bvn"
                rules={{ required: "BVN is required" }}
                render={({ field }) => <Input placeholder="Enter BVN" {...field} />}
              />
              {errors.bvn && <p className="text-destructive text-[10px]">{errors.bvn.message}</p>}
            </div>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>

        {/* STEP 3 */}
        <div className={step === 3 ? "" : "hidden"}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <p>3/4</p>
            </div>
            <div>
              <Label>Issued ID Type</Label>
              <Controller
                control={control}
                name="issuedIdType"
                rules={{ required: "Issued ID Type is required" }}
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Document Type</SelectLabel>
                        <SelectItem value="National Id">National ID</SelectItem>
                        <SelectItem value="Passport">Passport</SelectItem>
                        <SelectItem value="Voters card">Voter&apos;s Card</SelectItem>
                        <SelectItem value="License">Driver&apos;s License</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.issuedIdType && <p className="text-destructive text-[10px]">{errors.issuedIdType.message}</p>}
            </div>
            <div>
              <Label>ID Upload</Label>
              <div className="flex flex-col gap-[0.7px]">
                <p className="text-sm">Ensure that:</p>
                <p className="text-[12px]">The entire ID is visible.</p>
                <p className="text-[12px]">It is taken in a well-lit environment.</p>
              </div>
              <input type="hidden" {...(control.register ? control.register("idUpload") : {})} value={idSelfie || ""} />
              {idSelfie ? (
                <Image src={idSelfie} alt="Uploaded ID" unoptimized width={100} height={100} className="object-cover rounded-lg" />
              ) : (
                <UploadButton
                  className="h-[15vh] border-dotted border border-primary-day bg-active-nav"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setIdSelfie(res[0].ufsUrl);
                    toast({
                      title: "Image Uploaded",
                      description: "ID image uploaded successfully.",
                    });
                  }}
                  onUploadError={() => {
                    toast({
                      title: "Upload Error",
                      description: "Error uploading the ID image.",
                      variant: "destructive",
                    });
                  }}
                />
              )}
            </div>
            <div>
              <Label>Identification Number</Label>
              <Controller
                control={control}
                name="identificationNumber"
                rules={{ required: "Identification number is required" }}
                render={({ field }) => <Input placeholder="Enter Number" {...field} />}
              />
              {errors.identificationNumber && <p className="text-destructive text-[10px]">{errors.identificationNumber.message}</p>}
            </div>
            <div>
              <Label>Upload a Selfie with your chosen ID</Label>
              <input type="hidden" {...(control.register ? control.register("selfieWithId") : {})} value={selfieWithId || ""} />
              <Controller
                control={control}
                name="selfieWithId"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange } }) => (
                  <>
                    {selfieWithId ? (
                      <Image src={selfieWithId} alt="Uploaded Selfie with ID" unoptimized width={100} height={100} className="object-cover rounded-lg" />
                    ) : (
                      <UploadButton
                        className="h-[15vh] border-dotted border border-primary-day bg-active-nav"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setSelfieWithId(res[0].ufsUrl);
                          onChange(res[0].ufsUrl);
                          toast({
                            title: "Image Uploaded",
                            description: "Selfie with ID uploaded successfully.",
                          });
                        }}
                        onUploadError={() => {
                          toast({
                            title: "Upload Error",
                            description: "Error uploading selfie with ID.",
                            variant: "destructive",
                          });
                        }}
                      />
                    )}
                  </>
                )}
              />
            </div>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>

        {/* STEP 4 */}
        <div className={step === 4 ? "" : "hidden"}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center">
              <p>4/4</p>
            </div>
            <div>
              <Label>Upload Photo</Label>
              <div className="flex flex-col gap-[0.7px]">
                <p className="text-[13px]">Your face must be clearly visible.</p>
              </div>
              <input type="hidden" {...(control.register ? control.register("idSelfie") : {})} value={selfie || ""} />
              <Controller
                control={control}
                name="idSelfie"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange } }) => (
                  <>
                    {selfie ? (
                      <Image src={selfie} alt="Uploaded Selfie" unoptimized width={200} height={200} className="object-cover rounded-lg" />
                    ) : (
                      <UploadButton
                        className="h-[15vh] border-dotted border border-primary-day bg-active-nav"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setSelfie(res[0].ufsUrl);
                          onChange(res[0].ufsUrl);
                          toast({
                            title: "Image Uploaded",
                            description: "Selfie uploaded successfully.",
                          });
                        }}
                        onUploadError={() => {
                          toast({
                            title: "Upload Error",
                            description: "Error uploading selfie.",
                            variant: "destructive",
                          });
                        }}
                      />
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <Label>Signature</Label>
              <Controller
                control={control}
                name="signature"
                rules={{ required: "Signature is required" }}
                render={({ field }) => <Input placeholder="Enter Full Name" {...field} />}
              />
              {errors.signature && <p className="text-destructive text-[10px]">{errors.signature.message}</p>}
              <p className="text-[12px]">Write your full government name in all caps</p>
            </div>
            { isSubmitting ? (
            <Button className="w-full mt-4 flex gap-2">
                <p>Please Wait</p>
                <Loader2 className="size-4 animate-spin" />
            </Button>
          ) :
          <Button type="submit" className="w-full mt-4">
            Fund Wallet
          </Button>}
          </div>
        </div>
      </form>
    </Dialog>
  );
}
