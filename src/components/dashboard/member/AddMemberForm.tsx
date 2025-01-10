"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  post: z.string().min(2, "Post must be at least 2 characters"),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length >= 1, "Image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

type MemberFormValues = z.infer<typeof memberSchema>;

export default function AddMemberForm() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      post: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", undefined as any);
    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
  };

  async function onSubmit(values: MemberFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("post", values.post);
      formData.append("image", values.image[0]);

      // Get and parse userData from localStorage
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const token = userData?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Log the request details
      console.log("Request Details:", {
        url: "https://lumibini-api.onrender.com/api/members",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        formData: Object.fromEntries(formData.entries()),
      });

      const headers = {
        [token ? "Authorization" : "authorization"]: `Bearer ${token}`,
      };

      const response = await fetch(
        "https://lumibini-api.onrender.com/api/members",
        {
          method: "POST",
          headers: headers,
          body: formData,
        }
      );

      // Get the response text first
      const responseText = await response.text();

      // Try to parse it as JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.log("Raw response:", responseText);
        throw new Error("Invalid JSON response");
      }

      // Log detailed response information
      console.log("Response Details:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
      });

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add member");
      }

      toast({
        title: "Success",
        description: "Member has been added successfully",
      });
      mutate("/api/members");
      form.reset();
      setImagePreview(null);
    } catch (error: any) {
      console.error("Full error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: राम बुढाथोकी"
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
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: प्रदेश सचिव"
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
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files);
                    }}
                    disabled={isLoading}
                    {...field}
                  />
                  {imagePreview && (
                    <div className="relative w-32 h-32">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
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
              setImagePreview(null);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-primary">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Member"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
