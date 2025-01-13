import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Trash2,
  CircleArrowOutUpRight,
  FileText,
  X,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useState } from "react";
import { DocumentRenderer } from "@/components/common/documents/DocumentRenderer";

export type Notice = {
  _id: string;
  title: string;
  pdfUrl: string;
  createdAt: string;
};

export const noticeColumns: ColumnDef<Notice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "pdfUrl",
    header: "Document",
    cell: ({ row }) => {
      const pdfUrl = row.getValue("pdfUrl");
      return (
        <a
          href={pdfUrl as string}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <FileText className="mr-2 h-4 w-4" />
          View PDF
        </a>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => {
      const notice = row.original;
      const { toast } = useToast();

      const handleDelete = async () => {
        try {
          const userDataString = localStorage.getItem("userData");
          const userData = userDataString ? JSON.parse(userDataString) : null;
          const token = userData?.token;

          if (!token) {
            throw new Error("Authentication token not found");
          }

          const response = await fetch(
            `https://lumibini-api.onrender.com/api/documents/${notice._id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete notice");
          }

          toast({
            title: "Success",
            description: "Notice deleted successfully",
          });

          mutate("/api/documents");
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to delete notice",
            variant: "destructive",
          });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the notice.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuItem>
              <CircleArrowOutUpRight className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function NoticeTable() {
  const [selectedDocument, setSelectedDocument] = useState<Notice | null>(null);

  return (
    <div>
      {/* Your table rendering logic here, for example using @tanstack/react-table */}
      {/* ... */}

      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {selectedDocument.title}
              </h2>
              <button
                onClick={() => setSelectedDocument(null)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <DocumentRenderer
              pdfUrl={selectedDocument.pdfUrl}
              title={selectedDocument.title}
              isFullScreen={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
