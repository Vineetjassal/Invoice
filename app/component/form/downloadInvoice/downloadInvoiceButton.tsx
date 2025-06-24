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

// Register fonts before component
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.woff2",
      fontWeight: "bold",
    },
  ],
});

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

  const generatePDF = async () => {
    try {
      setStatus("downloading");
      
      // Get currency details
      const currencyDetails = currencyList.find(
        (currencyDetail) =>
          currencyDetail.value.toLowerCase() ===
          (invoiceDetails.currency || "INR").toLowerCase()
      )?.details;

      const defaultCurrency = currencyList.find(
        (currencyDetail) =>
          currencyDetail.value.toLowerCase() === "INR".toLowerCase()
      )?.details;

      // Get flag SVG
      let countryImageUrl = "";
      try {
        const flagResponse = await fetch(
          `/flag/1x1/${
            currencyDetails?.iconName || defaultCurrency?.iconName || "IN"
          }.svg`
        );
        
        if (flagResponse.ok) {
          const svgFlag = await flagResponse.text();
          countryImageUrl = await svgToDataUri(svgFlag) || "";
        }
      } catch (flagError) {
        console.warn("Could not load flag, proceeding without it:", flagError);
      }

      // Generate PDF
      const MyDocument = () => (
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
      );

      const blob = await pdf(<MyDocument />).toBlob();
      
      // Generate filename with invoice number or timestamp
      const invoiceNumber = invoiceTerms.invoiceNumber || "invoice";
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${invoiceNumber.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.pdf`;
      
      saveAs(blob, filename);
      setStatus("downloaded");
      
    } catch (error) {
      console.error("PDF generation error:", error);
      setStatus("not-downloaded");
      
      // Show user-friendly error message
      alert("There was an error generating the PDF. Please check that all required fields are filled and try again.");
    }
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-slate-600 rounded-full blur-2xl opacity-20"></div>
          <div className="relative mt-6 w-24 h-24 bg-gradient-to-r from-gray-700 to-slate-600 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Invoice Ready
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Professional Invoice is Ready!
          </h1>
          
          <p className="text-md text-gray-600 leading-relaxed">
            Your beautifully crafted invoice has been generated successfully. 
            Review the details and download your professional PDF invoice.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            disabled={status === "downloading"}
            onClick={generatePDF}
            type="button"
            className="w-full max-w-md h-14 rounded-xl text-lg font-bold bg-gradient-to-r from-gray-800 to-slate-700 hover:from-gray-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
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

          <p className="text-sm text-gray-500 mb-8">
            Your invoice will be downloaded as a PDF file
          </p>
        </div>
      </div>
    </div>
  );
};