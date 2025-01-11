"use client";
import { Plus } from "lucide-react";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddMemberForm from "@/components/dashboard/member/AddMemberForm";
import { DataTable } from "@/components/common/DataTable";

import { AnimatedLoader } from "@/components/common/Loader";
import { useGallery } from "@/services/queries";
import { galleryColumns } from "@/config/columns/galleryColumns";
import AddGalleryForm from "@/components/dashboard/gallery/AddGalleryForm";

export default function MembersPage() {
  const { data: galleries, error, isLoading } = useGallery();

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
        <h2 className="text-2xl font-bold">Members</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Gallery
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Gallery</DialogTitle>
              <DialogDescription>
                Fill in the details to add new Gallery.
              </DialogDescription>
            </DialogHeader>
            <AddGalleryForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={galleryColumns}
          data={galleries || []}
          searchKey="title"
          searchPlaceholder="Search members..."
        />
      </div>
    </div>
  );
}
