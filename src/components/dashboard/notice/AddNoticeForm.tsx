// AddNoticeForm.tsx
"use client";

import { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MAX_FILE_SIZE = 10000000; // 10MB
const ACCEPTED_PDF_TYPE = "application/pdf";

const noticeSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  pdf: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "One PDF document is required")
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      "File must be less than 10MB"
    )
    .refine(
      (files) =>
        Array.from(files).every((file) => file.type === ACCEPTED_PDF_TYPE),
      "Only PDF format is supported"
    ),
});

type NoticeFormValues = z.infer<typeof noticeSchema>;

export default function AddNoticeForm() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<NoticeFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type !== ACCEPTED_PDF_TYPE) {
      toast({
        title: "Error",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    // Create a new FileList-like object
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    form.setValue("pdf", dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = () => {
    setSelectedFile(null);
    // Create an empty FileList-like object
    const dataTransfer = new DataTransfer();
    form.setValue("pdf", dataTransfer.files);
  };

  async function onSubmit(values: NoticeFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      if (values.pdf.length > 0) {
        formData.append("pdf", values.pdf[0]);
      }

      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const token = userData?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        "https://lumibini-api.onrender.com/api/documents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add notice");
      }

      toast({
        title: "Success",
        description: "Notice has been added successfully",
      });
      mutate("/api/documents");
      form.reset();
      setSelectedFile(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add notice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter notice title"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pdf"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>PDF Document</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      isDragging
                        ? "border-primary bg-primary/10"
                        : "border-gray-300"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => {
                          handleFileChange(e.target.files);
                        }}
                        disabled={isLoading}
                        {...field}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-primary hover:text-primary/80"
                      >
                        Click to upload
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        or drag and drop PDF here
                      </p>
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="relative flex items-center justify-between p-4 border rounded-lg">
                      <span className="truncate">{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="ml-2 text-red-500 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setSelectedFile(null);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Notice...
              </>
            ) : (
              "Add Notice"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
