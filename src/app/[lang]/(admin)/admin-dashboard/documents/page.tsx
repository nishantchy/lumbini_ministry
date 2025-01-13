"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/common/DataTable";

import { AnimatedLoader } from "@/components/common/Loader";
import { useDocuments } from "@/services/queries";
import { noticeColumns } from "@/config/columns/noticeColumns";
import AddNoticeForm from "@/components/dashboard/notice/AddNoticeForm";

export default function Documents() {
  const { data: documents, error, isLoading } = useDocuments();

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">Error loading members data.</p>
      </div>
    );
  }

  if (isLoading) {
    return <AnimatedLoader size={30} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notices</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Notice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Notice</DialogTitle>
              <DialogDescription>
                Fill in the details to add new Notice.
              </DialogDescription>
            </DialogHeader>
            <AddNoticeForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={noticeColumns}
          data={documents || []}
          searchKey="title"
          searchPlaceholder="Search Documents..."
        />
      </div>
    </div>
  );
}
