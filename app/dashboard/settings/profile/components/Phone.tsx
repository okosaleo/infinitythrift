"use client";

import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput: React.FC = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full flex flex-col items-start">
      <Label className="mb-2 text-content2-day">Phone Number</Label>
      <PhoneInput
        country={"ng"} // Default country
        value={phone}
        onChange={setPhone}
        inputStyle={{
          width: "100%",
          height: "40px",
        }}
        dropdownStyle={{
          zIndex: 1000, // Prevents dropdown being hidden behind elements
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;
