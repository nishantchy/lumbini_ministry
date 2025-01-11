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
import { useNews } from "@/services/queries";
import { newsColumns } from "@/config/columns/newsColumn";
import AddNewsForm from "@/components/dashboard/news/AddNewsTable";

export default function NewsPage() {
  const { data: news, error, isLoading } = useNews();

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">Error loading news data.</p>
      </div>
    );
  }

  if (isLoading) {
    return <AnimatedLoader size={30} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">News</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add News</DialogTitle>
              <DialogDescription>
                Fill in the details to add news.
              </DialogDescription>
            </DialogHeader>
            <AddNewsForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <DataTable
          columns={newsColumns}
          data={news || []}
          searchKey="title"
          searchPlaceholder="Search news..."
        />
      </div>
    </div>
  );
}
