import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "सामाजिक विकास मन्‍‍त्रालय",
  description: "Developed By Nishant Chaudhary",
};

export default async function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;
  return (
    <html lang="en">
      <body>
        <Header lang={lang} />
        <Navbar lang={lang} />
        {children}
        <Toaster />
        <Footer lang={lang} />
      </body>
    </html>
  );
}
