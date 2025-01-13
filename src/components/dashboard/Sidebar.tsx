"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { adminLinks } from "@/config/admin-links";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    // Clear cookie
    document.cookie =
      "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/accounts/login";
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b">
          <span className="text-xl font-bold text-primary">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  `flex items-center px-4 py-2 text-sm rounded-lg transition-colors  ${
                    isActive ? "bg-primary text-white" : "text-black"
                  }`
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
