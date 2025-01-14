"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="mb-4 text-gray-600">
          Oops! It looks like you've stumbled upon a page that doesn't exist.
        </p>
        <p className="mb-4 text-gray-600">Let's get you back on track:</p>
        <div className="space-x-6">
          <Link href="/" className="text-blue-500 hover:underline">
            Go to Home Page
          </Link>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
