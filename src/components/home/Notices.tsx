"use client";

import { NoticeTitle } from "@/lib/titles";
import { useDocuments } from "@/services/queries";
import Link from "next/link";
import { AnimatedLoader } from "../common/Loader";
import { Notice } from "@/config/columns/noticeColumns";
import { useState } from "react";

import { X } from "lucide-react";
import { DocumentCard } from "../common/documents/DocumentCard";
import { DocumentRenderer } from "../common/documents/DocumentRenderer";

export default function Notices({ lang }: { lang: string }) {
  const { data: notices, isLoading, error } = useDocuments();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  console.log(notices);

  if (isLoading) return <AnimatedLoader size={30} />;
  if (error) return <div className="text-center">Error Loading Notices</div>;

  return (
    <section className="max-w-screen-xl mx-auto space-y-6 md:space-y-12 px-4 md:px-0">
      {NoticeTitle.map((title) => (
        <div key={title.id} className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">
            {title.title[lang as keyof typeof title.title]}
          </h1>
          <Link
            href={title.href}
            className="text-primary hover:text-primary-400 font-semibold"
          >
            {title.option[lang as keyof typeof title.option]}
          </Link>
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {notices?.map((notice: Notice, index) => (
          <DocumentCard
            key={index}
            notice={notice}
            onClick={() => setSelectedNotice(notice)}
          />
        ))}
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{selectedNotice.title}</h2>
              <button
                onClick={() => setSelectedNotice(null)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <DocumentRenderer
              pdfUrl={selectedNotice.pdfUrl}
              title={selectedNotice.title}
              isFullScreen={true}
            />
          </div>
        </div>
      )}
    </section>
  );
}
