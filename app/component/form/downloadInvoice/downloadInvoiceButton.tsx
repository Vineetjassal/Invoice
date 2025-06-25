"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Document, Page, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  CheckCircle2,
  Download,
  LoaderIcon,
  Sparkles,
  FileText,
} from "lucide-react";
import { useData } from "@/app/hooks/useData";
import { PdfDetails } from "../pdfDetails";
import { currencyList } from "@/lib/currency";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { pdfContainers } from "@/lib/pdfStyles";

interface InvoiceData {
  companyDetails?: Record<string, any>;
  invoiceDetails?: {
    currency?: string;
    [key: string]: any;
  };
  invoiceTerms?: {
    invoiceNumber?: string;
    [key: string]: any;
  };
  paymentDetails?: Record<string, any>;
  yourDetails?: Record<string, any>;
}

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<"downloaded" | "downloading" | "not-downloaded">("not-downloaded");

  const data: InvoiceData = useData() || {};

  const {
    companyDetails = {},
    invoiceDetails = {},
    invoiceTerms = {},
    paymentDetails = {},
    yourDetails = {},
  } = data;

  useEffect(() => {
    if (status === "downloaded") {
      const timer = setTimeout(() => setStatus("not-downloaded"), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const generatePDF = async () => {
    try {
      setStatus("downloading");

      const selectedCurrency = (invoiceDetails?.currency ?? "INR").toLowerCase();
      const currencyDetails =
        currencyList.find((c) => c.value.toLowerCase() === selectedCurrency)?.details ||
        currencyList.find((c) => c.value === "INR")?.details;

      let countryImageUrl = "";

      try {
        const flagRes = await fetch(`/flag/1x1/${currencyDetails?.iconName || "in"}.svg`);
        if (flagRes.ok) {
          const svgFlag = await flagRes.text();
          countryImageUrl = await svgToDataUri(svgFlag);
        }
      } catch (err) {
        console.warn("Flag image fetch failed:", err);
      }

      const doc = (
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

      const blob = await pdf(doc).toBlob();

      const invoiceNumber = invoiceTerms?.invoiceNumber || "invoice";
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `${invoiceNumber.replace(/[^a-zA-Z0-9]/g, "_")}_${timestamp}.pdf`;

      saveAs(blob, filename);
      setStatus("downloaded");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Something went wrong while generating your invoice. Please try again.");
      setStatus("not-downloaded");
    }
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div className="text-center max-w-2xl mx-auto px-6">
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
            Your Professional Invoice{" "}
            <span className="bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent">
              is Ready!
            </span>
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
