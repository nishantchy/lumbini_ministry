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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const gallerySchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters"),
  images: z
    .custom<FileList>()
    .refine((files) => files?.length >= 1, "At least one image is required")
    .refine(
      (files) =>
        Array.from(files || []).every((file) => file.size <= MAX_FILE_SIZE),
      "Each file must be less than 5MB"
    )
    .refine(
      (files) =>
        Array.from(files || []).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

interface ImagePreview {
  id: string;
  url: string;
  file: File;
}

export default function AddGalleryForm() {
  const { toast } = useToast();
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<GalleryFormValues>({
    defaultValues: {
      title: "",
    },
  });

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;

    const newPreviews: ImagePreview[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview: ImagePreview = {
          id: Math.random().toString(36).substring(7),
          url: reader.result as string,
          file: file,
        };
        newPreviews.push(preview);
        if (newPreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newPreviews]);
          updateFormFiles([...imagePreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const updateFormFiles = (previews: ImagePreview[]) => {
    const dataTransfer = new DataTransfer();
    previews.forEach((preview) => dataTransfer.items.add(preview.file));
    form.setValue("images", dataTransfer.files);
  };

  const removeImage = (idToRemove: string) => {
    setImagePreviews((prev) => {
      const updated = prev.filter((preview) => preview.id !== idToRemove);
      updateFormFiles(updated);
      return updated;
    });
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
    handleImageChange(e.dataTransfer.files);
  };

  async function onSubmit(values: GalleryFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      Array.from(values.images).forEach((file) => {
        formData.append("images", file);
      });

      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const token = userData?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        "https://lumibini-api.onrender.com/api/gallery",
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
        throw new Error(responseData.message || "Failed to add gallery");
      }

      toast({
        title: "Success",
        description: "Gallery has been added successfully",
      });
      mutate("/api/gallery");
      form.reset();
      setImagePreviews([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to add gallery. Please try again.",
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
                  placeholder="Enter gallery title"
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
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
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="file-upload"
                        onChange={(e) => {
                          handleImageChange(e.target.files);
                          field.onChange(e.target.files);
                        }}
                        disabled={isLoading}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-primary hover:text-primary/80"
                      >
                        Click to upload
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        or drag and drop images here
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagePreviews.map((preview) => (
                      <div
                        key={preview.id}
                        className="relative group aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={preview.url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => removeImage(preview.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            disabled={isLoading}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
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
              setImagePreviews([]);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Gallery...
              </>
            ) : (
              "Add Gallery"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
