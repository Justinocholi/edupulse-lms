"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error:", error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        An unexpected error occurred while processing this request. Our telemetry service has logged this occurrence.
      </p>
      <div className="mt-6">
        <Button onClick={() => reset()} variant="default">
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
