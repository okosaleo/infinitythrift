"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicker } from "./Date";
import { useState } from "react";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";



export default function KYC() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedState, setSelectedState] = useState<StateKey | "">("");
  const [selectedCity, setSelectedCity] = useState('');
  const [step, setStep] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const stateCities = {
    'Abia': ['Aba', 'Umuahia', 'Ohafia', 'Arochukwu', 'Abiriba'],
    'Adamawa': ['Yola', 'Mubi', 'Jimeta', 'Numan', 'Ganye'],
    'Akwa Ibom': ['Uyo', 'Eket', 'Ikot Ekpene', 'Oron', 'Abak'],
    'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Aguata', 'Ogidi'],
    'Bauchi': ['Bauchi', 'Azare', 'Jamaare', 'Katagum', 'Misau'],
    'Bayelsa': ['Yenagoa', 'Brass', 'Ogbia', 'Nembe', 'Ekeremor'],
    'Benue': ['Makurdi', 'Gboko', 'Otukpo', 'Katsina-Ala', 'Vandeikya'],
    'Borno': ['Maiduguri', 'Bama', 'Dikwa', 'Biram', 'Gubio'],
    'Cross River': ['Calabar', 'Ugep', 'Ogoja', 'Ikom', 'Obudu'],
    'Delta': ['Asaba', 'Warri', 'Sapele', 'Agbor', 'Koko'],
    'Ebonyi': ['Abakaliki', 'Afikpo', 'Onueke', 'Edda', 'Ishieke'],
    'Edo': ['Benin City', 'Auchi', 'Ekpoma', 'Igueben', 'Uromi'],
    'Ekiti': ['Ado Ekiti', 'Ikere', 'Ise-Ekiti', 'Emure', 'Aramoko'],
    'Enugu': ['Enugu', 'Nsukka', 'Agbani', 'Awgu', 'Udi'],
    'FCT': ['Abuja', 'Gwagwalada', 'Kuje', 'Bwari', 'Kubwa'],
    'Gombe': ['Gombe', 'Bajoga', 'Kaltungo', 'Dukku', 'Deba'],
    'Imo': ['Owerri', 'Okigwe', 'Orlu', 'Mgbidi', 'Awo-Omamma'],
    'Jigawa': ['Dutse', 'Hadejia', 'Birnin Kudu', 'Gumel', 'Kazaure'],
    'Kaduna': ['Kaduna', 'Zaria', 'Kafanchan', 'Sabon Gari', 'Makera'],
    'Kano': ['Kano', 'Daura', 'Wudil', 'Gaya', 'Rano'],
    'Katsina': ['Katsina', 'Funtua', 'Daura', 'Malumfashi', 'Dutsinma'],
    'Kebbi': ['Birnin Kebbi', 'Argungu', 'Yelwa', 'Zuru', 'Gwandu'],
    'Kogi': ['Lokoja', 'Okene', 'Idah', 'Kabba', 'Ajaokuta'],
    'Kwara': ['Ilorin', 'Offa', 'Jebba', 'Patigi', 'Lafiagi'],
    'Lagos': ['Lagos', 'Ikeja', 'Badagry', 'Epe', 'Ikorodu'],
    'Nasarawa': ['Lafia', 'Keffi', 'Akwanga', 'Nasarawa', 'Karu'],
    'Niger': ['Minna', 'Bida', 'Suleja', 'Kontagora', 'Lapai'],
    'Ogun': ['Abeokuta', 'Sagamu', 'Ijebu-Ode', 'Ilaro', 'Ota'],
    'Ondo': ['Akure', 'Ondo', 'Owo', 'Okitipupa', 'Ado-Ekiti'],
    'Osun': ['Osogbo', 'Ile-Ife', 'Ede', 'Ikirun', 'Iwo'],
    'Oyo': ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Saki'],
    'Plateau': ['Jos', 'Bukuru', 'Shendam', 'Pankshin', 'Langtang'],
    'Rivers': ['Port Harcourt', 'Bonny', 'Okrika', 'Eleme', 'Degema'],
    'Sokoto': ['Sokoto', 'Tambuwal', 'Wurno', 'Gwadabawa', 'Bodinga'],
    'Taraba': ['Jalingo', 'Bali', 'Wukari', 'Takum', 'Ibi'],
    'Yobe': ['Damaturu', 'Potiskum', 'Gashua', 'Nguru', 'Geidam'],
    'Zamfara': ['Gusau', 'Kaura Namoda', 'Tsafe', 'Anka', 'Talata Mafara']
  };

  type StateKey = keyof typeof stateCities;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsDialogOpen(false); // Close dialog when finished
    }
  };

  // Move back one step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value as keyof typeof stateCities);
    setSelectedCity(''); // Reset city when state changes
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogHeader>
      {step > 1 && (
              <Button variant="ghost" onClick={handleBack} className="mt-[-70px] rounded-full bg-outline-day h-12 w-12">
                <ArrowLeft className="size-5 text-icon-day " />
              </Button>
            )}
       </DialogHeader>
      {step === 1 && ( 
      <div className="flex flex-col gap-2 mt-[-24px]">
        <div className="text-content2-day flex gap-5">
            <div className="flex flex-col gap-1">
                <Label>First name</Label>
                <Input />
            </div>
            <div className="flex gap-1 flex-col">
            <Label>Last name</Label>
            <Input />
        </div>
        </div>
        <div className="w-full  text-content2-day flex gap-[0.5px] flex-col">
            <Label>Date of Birth</Label>
         <div className="flex border-[0.8px] p-1 rounded-md items-center border-input w-full">
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
            <CalendarIcon className="size-5 text-icon-day" />
      </div>
        </div>
        <div className="text-content2-day">
          <Label>Gender</Label>
          <Select>
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
        </div>
        <div className="text-content2-day">
        <div className="flex flex-col gap-1">
                <Label>Address</Label>
                <Input placeholder="Enter Address" />
            </div>
        </div>
        <div className="text-content2-day flex gap-5">
        <div className="w-full rounded-lg ">
      <div className="flex gap-5">
        {/* State Selector */}
        <div className="flex-1">
          <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </Label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="w-full p-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {Object.keys(stateCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City Selector - Always Visible */}
        <div className="flex-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            className="w-full p-1 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">{selectedState ? "Select City" : "Select State First"}</option>
            {selectedState && stateCities[selectedState].map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
    </div>

    
    </div>
    <div className="text-content2-day">
    <Label>proof of address type</Label>
          <Select>
            <SelectTrigger>
            <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="National Id">National ID</SelectItem>
          <SelectItem value="Passport">Passport</SelectItem>
          <SelectItem value="Voters card">Voters Card</SelectItem>
          <SelectItem value="LIscence">Drivers Liscense</SelectItem>
        </SelectGroup>
      </SelectContent>
          </Select>
    </div>

    <div>
      <Label>Upload Proof of Address</Label>
      <UploadDropzone className="h-[10vh] border-primary-day bg-active-nav ut-label:text-primary-day"
       endpoint="imageUploader"
        />
    </div>
    <DialogTrigger asChild>
    <Button onClick={handleNext}>Next</Button>
    </DialogTrigger>
    </div>   )}

    {step === 2 && (
          <div className="flex flex-col gap-2">
             <div className="flex items-center justify-center mt-[-19px]">
        <p>2/4</p>
        </div>
            <div className="flex flex-col gap-2 text-content2-day">
            <Label>Occupation</Label>
            <Input placeholder="Enter Occupation" />
            </div>
            <div className="flex flex-col gap-2 text-content2-day">
            <Label>Employer</Label>
            <Input placeholder="Employer Name" />
            </div>
            <div className="flex flex-col gap-2 text-content2-day">
            <Label>monthly income estimate</Label>
            <Input placeholder="Enter amount" />
            </div>
            <div className="flex flex-col gap-2 text-content2-day">
            <Label>Bank Verification Number(BVN)</Label>
            <Input placeholder="Enter BVN" />
            </div>
            
            <Button onClick={handleNext}>Next</Button>
          </div>
        )}

{step === 3 && (
          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-center mt-[-29px]">
        <p>3/4</p>
        </div>
        <div className="flex flex-col gap-2">
        <Label className="text-content2-day">Issued ID Type</Label>
            <Select>
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

            <div className="text-content2-day"> 
      <Label>ID Upload</Label>
      <div className="flex flex-col gap-[0.7px]">
      <p className="text-sm">If uploading ensure that:</p>
      <p className="text-[12px]">The entire ID is visible.</p>
      <p className="text-[12px]">It is done in a well lit room</p>
      </div>
      <UploadDropzone className="h-[15vh] border-primary-day bg-active-nav ut-label:text-primary-day"
       endpoint="imageUploader"
        />
    </div>
            <div className="flex flex-col gap-2 mt-2 text-content2-day">
            <Label>Identification Number</Label>
            <Input placeholder="Enter Number" />
            </div>

            <div className="text-content2-day"> 
      <Label>Upload a Selfie with your chosen ID</Label>
      <UploadDropzone className="h-[15vh] border-primary-day bg-active-nav ut-label:text-primary-day"
       endpoint="imageUploader"
        />
    </div>
        </div>
            <Button onClick={handleNext}>Next</Button>
          </div>
        )}

{step === 4 && (
          <div className="flex flex-col gap-4">
           <div className="flex items-center justify-center mt-[-19px]">
           <p>4/4</p></div>
           <div className="text-content2-day"> 
      <Label>Upload Photo</Label>
      <div className="flex flex-col gap-[0.7px]">
      <p className="text-[13px]">Your fce must be clearly visible</p>
      </div>
      <UploadDropzone className="h-[15vh] border-primary-day bg-active-nav ut-label:text-primary-day"
       endpoint="imageUploader"
        />
    </div>
           <div className="flex flex-col gap-2 mt-2 text-content2-day">
            <Label>Signature</Label>
            <Input placeholder="Enter Full Name" />
            <p className="text-[12px]">Write your full government name in all caps</p>
            </div>
            <Button onClick={handleNext}>Submit KYC</Button>
          </div>
        )}

    </Dialog>
  )
}
