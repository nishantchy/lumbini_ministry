"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

// Define interface for translations
interface Translations {
  name: { en: string; ne: string };
  email: { en: string; ne: string };
  message: { en: string; ne: string };
  button: { en: string; ne: string };
  title: { en: string; ne: string };
}

// Combine translations into a single object
const translations: Translations = {
  name: { en: "Name", ne: "नाम" },
  email: { en: "Email", ne: "इमेल" },
  message: { en: "Message", ne: "संदेश" },
  button: { en: "Send Message", ne: "सन्देश पठाउनुहोस्" },
  title: { en: "Send Us a Message", ne: "हामीलाई सन्देश पठाउनुहोस्" },
};

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm({ lang }: { lang: "en" | "ne" }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://lumibini-api.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send message");
      }

      toast({
        title: "Success",
        description: "Message sent successfully",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send Message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="p-8">
      <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6">{translations.title[lang]}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.name[lang]}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={translations.name[lang]}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.email[lang]}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={translations.email[lang]}
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.message[lang]}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={translations.message[lang]}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {translations.button[lang]}...
                </>
              ) : (
                translations.button[lang]
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
