"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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

const newsSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(2, "Content must be at least 2 characters"),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export default function AddNewsForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: NewsFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const token = userData?.token;

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(
        "https://lumibini-api.onrender.com/api/news",
        {
          method: "POST",
          headers: headers,
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to add news");
      }

      toast({
        title: "Success",
        description: "News has been added successfully",
      });
      mutate("/api/news");
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add news. Please try again.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="News Title"
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input
                  placeholder="News Content"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading} className="bg-primary">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add News"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
