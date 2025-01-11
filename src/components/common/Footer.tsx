"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { contactData, copyrightData, educationData } from "@/lib/footer";

export default function Footer({ lang }: { lang: string }) {
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
        <div>
          {educationData.map((data, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-semibold">
                {data.title[lang as keyof typeof data.title]}
              </h2>
              <ul className="space-y-2">
                {data.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-white text-sm hover:text-primary-400"
                    >
                      {link.name[lang as keyof typeof link.name]}
                    </Link>
                  </li>
                ))}
                <Link
                  href="/accounts/login"
                  className="text-white font-semibold  block"
                >
                  Login
                </Link>
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        {contactData.map((data, index) => (
          <div key={index} className="space-y-2">
            <h2 className="text-xl font-semibold">
              {" "}
              {data.title[lang as keyof typeof data.title]}
            </h2>
            <p className="text-white text-sm">ईमेल : {data.contact.email}</p>
            <p className="text-white text-sm">
              फोन : {data.contact.phone.join(", ")}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-white pt-5 flex justify-between items-center w-full max-w-screen-xl mx-auto ">
        {copyrightData.map((data, index) => (
          <p key={index} className="text-center md:text-left">
            {data.title[lang as keyof typeof data.title]}
          </p>
        ))}
        <p className="text-center md:text-left">
          Developed By Nishant Chaudhary
        </p>
      </div>
    </footer>
  );
}
