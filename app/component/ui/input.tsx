import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div
      className={`flex items-center relative ${
        label ? "h-[60px]" : "h-[48px]"
      } group`}
    >
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-semibold leading-6 text-gray-700 whitespace-nowrap min-w-0"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        {...props}
        name={label}
        id={label}
        className={`peer block w-full border-0 py-3 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 ${
          label ? "text-right" : "px-4"
        } placeholder:text-gray-400 placeholder:font-medium caret-blue-500 bg-transparent focus:outline-none`}
      />
      <div
        className="absolute inset-x-0 bottom-0 border-t-2 border-gray-200 peer-hover:border-blue-300 peer-focus:border-blue-500 transition-colors duration-200"
        aria-hidden="true"
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };