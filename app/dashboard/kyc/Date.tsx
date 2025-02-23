import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerWithFieldProps {
  name: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
  defaultValue?: Date | null;
  fieldKey?: string;
}

export function DatePicker({
  name,
  date,
  setDate,
  defaultValue = null,
  fieldKey,
}: DatePickerWithFieldProps) {
  const dateValue = date || defaultValue;
  return (
    <>
    <ReactDatePicker
      selected={dateValue}
      key={fieldKey}
      name={name}
      onChange={(date) => setDate(date)}
      dateFormat="MM/dd/yyyy"
      wrapperClassName="w-full"
      className="w-full border-0 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-transparent hover:border-gray-400"
    />
    </>
  );
}



