import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminHeader from "@/components/dashboard/Header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard for content management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <AdminHeader />
            <main className="p-6">{children}</main>
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}
