"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon, Sparkles, FileText } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 2000);
    }
  }, [status]);

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-20"></div>
          <div className="relative w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Invoice Ready
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Professional Invoice
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              is Ready!
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Your beautifully crafted invoice has been generated successfully. 
            Review the details and download your professional PDF invoice.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            disabled={status === "downloading"}
            onClick={async () => {
              try {
                setStatus("downloading");
                const currencyDetails = currencyList.find(
                  (currencyDetail) =>
                    currencyDetail.value.toLowerCase() ===
                    invoiceDetails.currency.toLowerCase()
                )?.details;

                const defaultCurrency = currencyList.find(
                  (currencyDetail) =>
                    currencyDetail.value.toLowerCase() === "INR".toLowerCase()
                )?.details;

                const data = await fetch(
                  `/flag/1x1/${
                    currencyDetails?.iconName || defaultCurrency?.iconName
                  }.svg`
                );
                const svgFlag = await data.text();
                const countryImageUrl = await svgToDataUri(svgFlag);
                if (countryImageUrl) {
                  const blob = await pdf(
                    <Document>
                      <Page size="A4" style={pdfContainers.page}>
                        <PdfDetails
                          companyDetails={companyDetails}
                          invoiceDetails={invoiceDetails}
                          invoiceTerms={invoiceTerms}
                          paymentDetails={paymentDetails}
                          yourDetails={yourDetails}
                          countryImageUrl={countryImageUrl}
                        />
                      </Page>
                    </Document>
                  ).toBlob();
                  saveAs(blob, "invoice.pdf");
                  setStatus("downloaded");
                } else {
                  setStatus("not-downloaded");
                }
              } catch (e) {
                console.error(e);
                setStatus("not-downloaded");
              }
            }}
            type="button"
            className="w-full max-w-md h-14 rounded-xl text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            {status === "not-downloaded" && (
              <>
                <Download className="mr-3 h-6 w-6" /> 
                Download Your Invoice
              </>
            )}
            {status === "downloading" && (
              <>
                <LoaderIcon className="mr-3 h-6 w-6 animate-spin" />
                Generating PDF...
              </>
            )}
            {status === "downloaded" && (
              <>
                <CheckCircle2 className="mr-3 h-6 w-6" /> 
                Downloaded Successfully!
              </>
            )}
          </Button>

          <p className="text-sm text-gray-500">
            Your invoice will be downloaded as a PDF file
          </p>
        </div>
      </div>
    </div>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    {
      src: "/font/Geist-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/font/Geist-Ultralight.ttf",
      fontWeight: "ultralight",
    },
    {
      src: "/font/Geist-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/font/Geist-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/Geist-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/font/Geist-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/font/Geist-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/font/Geist-UltraBlack.ttf",
      fontWeight: "ultrabold",
    },
  ],
});