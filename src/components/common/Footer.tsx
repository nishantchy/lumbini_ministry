"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const footerData = {
  education: [
    {
      name: "शिक्षा तथा सामाजिक विकास निर्देशनालय राप्ती उपत्यका (देउखुरी),दाङ",
      link: "#", // Provide the actual link
    },
    {
      name: "शिक्षा, विज्ञान तथा प्रविधि मन्त्रालय, सिंहदरबार, काठमाडौँ, नेपाल",
      link: "#", // Provide the actual link
    },
    {
      name: "युवा तथा खेलकुद मन्त्रालय सिंहदरबार काठमाडौँ",
      link: "#", // Provide the actual link
    },
    {
      name: "नेपाल सरकारको आधिकारिक पोर्टल",
      link: "#", // Provide the actual link
    },
    {
      name: "मुख्य न्यायाधिवक्ताको कार्यालय,लु.प्र.",
      link: "#", // Provide the actual link
    },
  ],
  contact: {
    email: "mosdfive@gmail.com",
    phone: ["082590461", "082590462"],
  },
  copyright: "© सर्वाधिकार सुरक्षित २०७८",
};

const Footer: React.FC = () => {
  return (
    <footer className="max-w-screen-2xl mx-auto bg-primary text-white py-8 spcae-y-6 md:space-y-6">
      <div className="max-w-screen-xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Image
            src="/common/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Education Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">उपयोगी लिङ्कहरू</h2>
          <ul className="space-y-4">
            {footerData.education.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className="text-white text-sm">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">सम्पर्क ठेगाना</h2>
          <p className="text-white">ईमेल : {footerData.contact.email}</p>
          <p className="text-white">
            फोन : {footerData.contact.phone.join(", ")}
          </p>
        </div>
      </div>
      <div className="border-t-2 border-white pt-5 flex justify-between items-center w-full max-w-screen-xl mx-auto ">
        <p className="text-center md:text-left">{footerData.copyright}</p>
        <p className="text-center md:text-left">
          Developed By Nishant Chaudhary
        </p>
      </div>
    </footer>
  );
};

export default Footer;
