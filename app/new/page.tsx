import { NewInvoiceForm } from "@/app/new/component/NewInvoiceForm";
import { Suspense } from "react";

const Page = () => (
  <div className="min-h-screen overflow-y-auto h-full flex items-stretch md:flex-row flex-col-reverse bg-gradient-to-br from-slate-50 to-gray-50">
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading InvoiceFlow...</p>
        </div>
      </div>
    }>
      <NewInvoiceForm />
    </Suspense>
  </div>
);

export default Page;