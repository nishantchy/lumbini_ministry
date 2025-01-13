"use client";
import { Notice } from "@/config/columns/noticeColumns";
import "@cyntler/react-doc-viewer/dist/index.css";
import { Calendar, Download, Eye } from "lucide-react";
import { PdfIcon } from "@/components/icons/pdfIcon";
import { useState } from "react";

interface DocumentCardProps {
  notice: Notice;
  onClick: () => void;
}

export function DocumentCard({ notice, onClick }: DocumentCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setIsDownloading(true);

    try {
      const response = await fetch(notice.pdfUrl);
      const blob = await response.blob();

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      // Set filename from title or fallback to a default
      const filename = `${notice.title || "document"}.pdf`;
      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the document. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="p-4 flex flex-col items-center space-y-3">
        <PdfIcon />
        <h3 className="text-sm line-clamp-3 font-medium text-center min-h-[4rem]">
          {notice.title}
        </h3>
        <p className="text-sm text-gray-500 flex justify-between items-center gap-x-2">
          <Calendar className="h-4 w-4 text-primary" />
          {new Date(notice.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="border-t px-4 py-3 flex justify-between gap-2">
        <button
          onClick={onClick}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
        >
          <Eye className="h-6 w-6 text-primary" />
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex items-center gap-2 text-sm ${
            isDownloading
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-primary"
          } transition-colors`}
        >
          <Download className="h-6 w-6  text-primary" />
          {/* {isDownloading ? "Downloading..." : "Download"} */}
        </button>
      </div>
    </div>
  );
}
