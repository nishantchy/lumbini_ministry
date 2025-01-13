"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 h-16 bg-white border-b flex items-center justify-end px-6">
      <Avatar>
        <AvatarImage src="/common/testiImage.jpg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
