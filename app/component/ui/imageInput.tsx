/* eslint-disable @next/next/no-img-element */
"use client";

import { getInitialValue } from "@/lib/getInitialValue";
import { Plus, Upload } from "lucide-react";
import { useRef } from "react";
import { Controller } from "react-hook-form";

type CustomNumberProps = {
  label: string;
  variableName: string;
};

export const ImageInput = ({ label, variableName }: CustomNumberProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isAcceptedFileType = (file: File) => {
    return ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div
          className="flex items-center relative justify-between h-[60px] cursor-pointer group"
          onClick={handleButtonClick}
        >
          {label && (
            <label
              htmlFor={label}
              className="block text-sm font-semibold leading-6 text-gray-700 whitespace-nowrap"
            >
              {label}
            </label>
          )}
          {value ? (
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-xl border border-blue-200 hover:border-blue-300 transition-colors">
              <img
                src={value}
                className="h-8 w-8 rounded-lg object-cover"
                alt="uploaded logo"
              />
              <span className="text-sm font-semibold text-blue-700">Logo uploaded</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-300 transition-all group-hover:text-blue-600">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload logo</span>
            </div>
          )}
          <input
            accept=".png, .jpg, .jpeg, .svg, .svg+xml"
            ref={inputRef}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file && isAcceptedFileType(file)) {
                const reader = new FileReader();
                reader.onload = () => {
                  const url = reader.result as string;
                  onChange(url);
                  localStorage.setItem(variableName, url);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />
          <div
            className="absolute inset-x-0 bottom-0 border-t-2 border-gray-200 peer-hover:border-blue-300 peer-focus:border-blue-500 group-hover:border-blue-300 transition-colors duration-200"
            aria-hidden="true"
          />
        </div>
      )}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
    />
  );
};

export default ImageInput;