import React from "react";
import { Mail, Phone, PrinterCheck } from "lucide-react";
// import { FaFax } from "react-icons/fa";

const content = {
  ne: {
    address: "३३६, कपुरधारा मार्ग, काठमाडौं, नेपाल",
    poBox: "पो.ब.नं. २९२",
    officeHours: "कार्यालय समय: सोमबार-शुक्रबार, ०९:००-१७:३० बजे",
  },
  en: {
    address: "Rapti Valley (Deukhuri), Nepal",
    poBox: "P.O. Box No 292",
    officeHours: "Office hours: Sunday-Friday, 0900-1730 hrs",
  },
};

// Contact information that doesn't need translation
const contactInfo = {
  phone: " 082590461, 082590462",
  fax: "+977-01-4420129",
  email: "mosdfive@gmail.com",
};

interface ContentProps {
  lang: "en" | "ne";
}

export const Content = ({ lang }: ContentProps) => {
  return (
    <div className="flex flex-col gap-6 px-4 md:px-10 xl:px-20">
      <div className="space-y-6">
        {/* Address and Contact Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3">
            {/* Address */}
            <p className="text-gray-700">{content[lang].address}</p>
            <p className="text-gray-700">{content[lang].poBox}</p>

            {/* Contact Information */}
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-600" />
              <span>
                Tel: <span className="text-gray-600">{contactInfo.phone}</span>{" "}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <PrinterCheck size={16} className="text-gray-600" />
              <span>
                Fax: <span className="text-gray-600"> {contactInfo.fax}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-600" />
              <span>
                Email:{" "}
                <span className="text-gray-600">{contactInfo.email}</span>
              </span>
            </div>

            {/* Office Hours */}
            <p className="mt-2 text-sm text-gray-600">
              {content[lang].officeHours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
