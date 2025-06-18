"use client";
import { getInitialValue } from "@/lib/getInitialValue";
import { Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";

type StepButtonProps = {
  isPrevious?: boolean;
  title: string;
  step: string;
};

const StepButton = ({ isPrevious, title, step }: StepButtonProps) => (
  <Controller
    render={({ field: { onChange } }) => (
      <div className="mt-6 w-full flex">
        {isPrevious ? (
          <button
            className="flex-1 group bg-white hover:bg-gray-50 rounded-xl p-4 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
            onClick={() => {
              localStorage.setItem("step", step);
              onChange(step);
            }}
          >
            <div className="flex gap-3 items-center mb-2">
              <div className="w-8 h-8 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                <ArrowLeft className="w-4 h-4 text-gray-600 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <span className="text-sm font-semibold text-gray-600">Previous</span>
            </div>
            <p className="font-semibold text-left text-gray-900 group-hover:text-gray-900 transition-colors">
              {title}
            </p>
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.setItem("step", step);
              onChange(step);
            }}
            className="flex-1 group bg-gradient-to-r from-gray-800 to-slate-700 hover:from-gray-900 hover:to-slate-800 rounded-xl p-4 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <div className="flex gap-3 justify-end items-center mb-2">
              <span className="text-sm font-semibold text-white">Next</span>
              <div className="w-8 h-8 bg-white/20 group-hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
            <p className="font-semibold text-right text-white">
              {title}
            </p>
          </button>
        )}
      </div>
    )}
    name="step"
    defaultValue={getInitialValue("step") ?? "1"}
  />
);

export default StepButton;