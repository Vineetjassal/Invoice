"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Document, Page, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { currencyList } from "@/lib/currency";
import { PdfDetails } from "../pdfDetails";

const MyPDFDocument = (props: any) => (
  <Document>
    <Page size="A4" style={pdfContainers.page}>
      <PdfDetails {...props} />
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
      setTimeout(() => setStatus("not-downloaded"), 1000);
    }
  }, [status]);

  const handleDownload = async () => {
    try {
      setStatus("downloading");

      const currencyDetails = currencyList.find(
        (c) =>
          c.value.toLowerCase() === invoiceDetails.currency.toLowerCase()
      )?.details;

      const defaultCurrency = currencyList.find(
        (c) => c.value.toLowerCase() === "inr"
      )?.details;

      const response = await fetch(
        `/flag/1x1/${currencyDetails?.iconName || defaultCurrency?.iconName}.svg`
      );

      const svgFlag = await response.text();
      const countryImageUrl = await svgToDataUri(svgFlag);

      const blob = await pdf(
        <MyPDFDocument
          companyDetails={companyDetails}
          invoiceDetails={invoiceDetails}
          invoiceTerms={invoiceTerms}
          paymentDetails={paymentDetails}
          yourDetails={yourDetails}
          countryImageUrl={countryImageUrl}
        />
      ).toBlob();

      saveAs(blob, "invoice.pdf");
      setStatus("downloaded");
    } catch (error) {
      console.error("Download error:", error);
      setStatus("not-downloaded");
    }
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div>
        <h1 className="text-5xl font-semibold pb-6">Your invoice is ready</h1>
        <p className="text-neutral-500 text-xl pb-7">
          Please review the details carefully before downloading your invoice.
        </p>
        <Button
          disabled={status === "downloading"}
          onClick={handleDownload}
          type="button"
          className="w-full h-12 rounded-lg text-lg"
        >
          {status === "not-downloaded" && (
            <>
              <Download className="mr-2 h-6 w-6" /> Download Invoice
            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" /> Downloading...
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
