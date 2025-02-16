import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePicker({ date, setDate }) {
  return (
    <ReactDatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="MM/dd/yyyy"
      wrapperClassName="w-full"
      className="w-full border-0 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-transparent hover:border-gray-400"
    />
  );
}



