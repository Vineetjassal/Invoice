"use client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currencyList } from "@/lib/currency";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

const CurrencyInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const currencyDetails = currencyList.find(
          (currency) => currency.value.toLowerCase() === value.toLowerCase()
        )?.details;

        return (
          <div className="flex group items-center relative h-[60px]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="w-full">
                <button className="flex gap-2 items-center justify-between w-full py-3 focus:outline-none">
                  <label className="block text-sm font-semibold leading-6 text-gray-700 whitespace-nowrap">
                    Currency
                  </label>
                  <div className="flex gap-2 bg-gradient-to-r from-gray-50 to-slate-50 text-sm px-3 py-2 rounded-xl items-center border border-gray-200 hover:border-gray-300 transition-colors">
                    {currencyDetails && (
                      <currencyDetails.icon className="w-5 h-5 rounded-full" />
                    )}
                    <span className="font-semibold text-gray-700">
                      {currencyDetails?.currencyShortForm}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 PopoverContent mt-2 border-gray-200 shadow-xl">
                <Command className="w-full">
                  <CommandInput
                    placeholder="Search currency..."
                    className="peer block w-full border-0 py-3 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 placeholder:text-gray-400 placeholder:font-medium caret-gray-500"
                  />
                  <CommandEmpty>No currency found.</CommandEmpty>
                  <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
                    {currencyList.map((currency) => (
                      <CommandItem
                        key={currency.value}
                        value={currency.value}
                        onSelect={(currentValue) => {
                          const updatedValue =
                            currentValue === value ? "INR" : currentValue;
                          localStorage.setItem("currency", updatedValue);
                          onChange(updatedValue);
                          setOpen(false);
                        }}
                        className="w-full cursor-pointer my-1 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex gap-3 justify-between items-center w-full">
                          <div className="flex gap-3 items-center">
                            <currency.details.icon className="w-7 h-7 rounded-full border-2 border-gray-200" />
                            <div>
                              <p className="font-semibold text-gray-900">
                                {currency.details.currencyName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {currency.details.currencyShortForm}
                              </p>
                            </div>
                          </div>
                          <CheckCircle2
                            className={cn(
                              "h-6 w-6 rounded-full transition-all",
                              value.toLowerCase() ===
                                currency.value.toLowerCase()
                                ? "opacity-100 bg-gray-700 text-white scale-110"
                                : "opacity-0 scale-90"
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div
              className={`absolute inset-x-0 bottom-0 border-t-2 border-gray-200 transition-colors duration-200 ${
                open ? "border-gray-500" : "group-hover:border-gray-300"
              }`}
              aria-hidden="true"
            />
          </div>
        );
      }}
      name="currency"
      defaultValue={getInitialValue("currency", "INR")}
    />
  );
};

export default CurrencyInput;