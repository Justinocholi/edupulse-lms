"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({
  src,
  alt = "",
  fallback = "U",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl",
  }[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-brand-700 font-semibold uppercase dark:bg-brand-900/40 dark:text-brand-300 ring-2 ring-background",
        sizeClasses,
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{fallback.slice(0, 2)}</span>
      )}
    </div>
  );
}
