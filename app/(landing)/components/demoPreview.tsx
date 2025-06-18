import { PreviewDetails } from "@/app/component/form/previewDetails";

const DemoPreview = () => (
  <div className="mx-auto w-full flex justify-center items-center">
    <PreviewDetails
      companyDetails={defaultValue.companyDetails}
      invoiceDetails={defaultValue.invoiceDetails}
      invoiceTerms={defaultValue.invoiceTerms}
      paymentDetails={defaultValue.paymentDetails}
      yourDetails={defaultValue.yourDetails}
    />
  </div>
);

const defaultValue = {
  companyDetails: {
    companyName: "Apple Inc",
    companyAddress: "32 Avenue Park",
    companyCity: "Mountain View",
    companyState: "CA",
    companyCountry: "USA",
    companyLogo: "/receipt-logo.png",
    companyTaxId: "",
    companyZip: "94043",
    email: "support@apple.com",
  },
  yourDetails: {
    yourName: "Vineet Jassal",
    yourAddress: "27B, AG-1 Block, Vikas Puri,",
    yourCity: "Delhi",
    yourState: "New Delhi",
    yourCountry: "India",
    yourLogo: "/vineet.jpeg",
    yourEmail: "hi@vineetjassal.com",
    yourTaxId: "",
    yourZip: "110018",
  },
  paymentDetails: {
    bankName: "HDFC Bank",
    accountNumber: "98714818457",
    accountName: "Vineet Jassal",
    routingCode: "123456",
    swiftCode: "HDFCINBB1234",
    ifscCode: "UTIB0000000",
    currency: "INR",
  },
  invoiceTerms: {
    invoiceNumber: "Invoice #25",
    issueDate: "Fri Apr 19 2024 00:00:00 GMT+0530 (India Standard Time)",
    dueDate: "Mon Apr 22 2024 00:00:00 GMT+0530 (India Standard Time)",
  },
  invoiceDetails: {
    note: "Services Period  21/03/2024 to 20/04/2024",
    discount: "22000",
    taxRate: "18",
    items: [
      {
        itemDescription: "Software Development Services",
        amount: 225000,
        qty: 0,
      },
      {
        itemDescription: "Hosting Charge",
        amount: 22000,
        qty: 0,
      },
    ],
    currency: "INR",
  },
};
export default DemoPreview;