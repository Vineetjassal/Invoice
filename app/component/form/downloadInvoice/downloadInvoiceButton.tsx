"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Document, Page, StyleSheet, pdf } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { saveAs } from "file-saver";
import { useData } from "@/app/hooks/useData";
import { PdfDetails } from "../pdfDetails";
import { currencyList } from "@/lib/currency";
import { svgToDataUri } from "@/lib/svgToDataUri";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
});

const MyPDFDocument = ({
  companyDetails,
  invoiceDetails,
  invoiceTerms,
  paymentDetails,
  yourDetails,
  countryImageUrl,
}: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
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
      const timer = setTimeout(() => setStatus("not-downloaded"), 1500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleDownload = async () => {
    try {
      setStatus("downloading");

      // Get currency flag
      const currencyDetails = currencyList.find(
        (c) => c.value.toLowerCase() === invoiceDetails.currency.toLowerCase()
      )?.details;

      const defaultCurrency = currencyList.find(
        (c) => c.value.toLowerCase() === "inr"
      )?.details;

      const flagRes = await fetch(
        `/flag/1x1/${currencyDetails?.iconName || defaultCurrency?.iconName}.svg`
      );
      const svg = await flagRes.text();
      const flagDataUri = await svgToDataUri(svg);

      // Generate PDF
      const blob = await pdf(
        <MyPDFDocument
          companyDetails={companyDetails}
          invoiceDetails={invoiceDetails}
          invoiceTerms={invoiceTerms}
          paymentDetails={paymentDetails}
          yourDetails={yourDetails}
          countryImageUrl={flagDataUri}
        />
      ).toBlob();

      saveAs(blob, "invoice.pdf");
      setStatus("downloaded");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      setStatus("not-downloaded");
    }
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-semibold pb-6">Your invoice is ready</h1>
        <p className="text-neutral-500 text-xl pb-7">
          Please review the details carefully before downloading your invoice.
        </p>
        <Button
          onClick={handleDownload}
          disabled={status === "downloading"}
          className="w-full h-12 rounded-lg text-lg"
        >
          {status === "not-downloaded" && (
            <>
              <Download className="mr-2 h-6 w-6" /> Download Invoice
            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />
              Downloading...
            </>
          )}
          {status === "downloaded" && (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" /> Downloaded
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

