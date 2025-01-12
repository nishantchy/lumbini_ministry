"use client";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

interface DocumentRendererProps {
  pdfUrl: string;
  title: string;
  isFullScreen?: boolean;
}

export function DocumentRenderer({
  pdfUrl,

  isFullScreen = false,
}: DocumentRendererProps) {
  const docs = [
    {
      uri: pdfUrl,
      fileType: "pdf",
    },
  ];

  const viewerHeight = isFullScreen ? "h-[80vh]" : "h-[200px]";

  return (
    <div className="w-full">
      {/* <h3 className="text-xl font-semibold mb-4">{title}</h3> */}
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        className={viewerHeight}
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
        config={{
          header: {
            disableHeader: !isFullScreen,
            disableFileName: !isFullScreen,
            retainURLParams: false,
          },
        }}
      />
    </div>
  );
}
