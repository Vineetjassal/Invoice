"use client";
import Image from "next/image";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { FormSteps } from "@/app/component/form/step/fromSteps";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const step = localStorage.getItem("step");
        if (!(step && typeof +step === "number"))
          localStorage.setItem("step", "1");
      } catch (e) {
        localStorage.setItem("step", "1");
      }
    }
  }, []);

  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          <div className="max-w-lg min-h-screen w-full h-full p-6 md:p-8 border-r border-gray-200 flex flex-col justify-between bg-gradient-to-br from-white via-gray-50 to-slate-50">
            <div>
              {/* Header */}
              <div className="mb-8">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-gray-600 hover:text-gray-700 transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gray-800/20 rounded-xl blur-lg"></div>
                    <Image
                      src="/receipt copy.png"
                      width={48}
                      height={48}
                      className="relative rounded-xl shadow-lg"
                      alt="logo"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent">
                      InvoiceFlow
                    </h1>
                    <p className="text-gray-600 text-sm font-medium">Professional & Free</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-700 to-slate-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center mb-3">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Create Your Invoice</span>
                  </div>
                  <p className="text-gray-100 text-sm leading-relaxed">
                    Fill in your details step by step to generate a professional invoice that gets you paid faster.
                  </p>
                </div>
              </div>
              
              <UserInputForm />
            </div>
            <FormSteps />
          </div>
          
          <div className="relative min-h-screen h-full w-full flex justify-center items-center p-6 md:p-8 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-400/5 rounded-full blur-3xl"></div>
            </div>
            
            {/* Preview Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Preview</h2>
                  <p className="text-gray-600">Watch your invoice come to life</p>
                </div>
                <UserDataPreview />
              </div>
            </div>
          </div>
        </FormProvider>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
        </div>
      )}
    </>
  );
};