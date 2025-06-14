"use client";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

type CustomNumberProps = {
  label: string;
  variableName: string;
};

const DateInput = ({ label, variableName }: CustomNumberProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div className="flex group items-center relative h-[60px]">
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild className="w-full">
              <button className="flex gap-2 items-center justify-between w-full py-3 focus:outline-none">
                <label
                  htmlFor={label}
                  className="block text-sm font-semibold leading-6 text-gray-700 whitespace-nowrap"
                >
                  {label}
                </label>
                <div className="flex gap-2 items-center text-sm bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-xl border border-blue-200 hover:border-blue-300 transition-colors">
                  <span className="font-semibold text-blue-700">
                    {value ? format(value, "MMM dd, yyyy") : "Pick a date"}
                  </span>
                  <CalendarIcon className="h-4 w-4 text-blue-600" />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-2 border-blue-200 shadow-xl" align="end">
              <Calendar
                mode="single"
                selected={new Date(value)}
                onSelect={(day: Date | undefined) => {
                  if (day?.toString()) {
                    const updatedValue = day.toString();
                    localStorage.setItem(variableName, updatedValue);
                    onChange(updatedValue);
                    setOpen(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div
            className={`absolute inset-x-0 bottom-0 border-t-2 border-gray-200 transition-colors duration-200 ${
              open ? "border-blue-500" : "group-hover:border-blue-300"
            }`}
            aria-hidden="true"
          />
        </div>
      )}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
    />
  );
};

export default DateInput;