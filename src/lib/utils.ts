import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return "0 mins";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes}m`;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatSeconds(seconds: number): string {
  if (!seconds || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function generateCertificateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segment = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `EDU-${segment(4)}-${segment(4)}-${segment(4)}`;
}

export function calculateGrade(score: number, total: number): { percentage: number; isPassed: boolean } {
  if (total === 0) return { percentage: 0, isPassed: false };
  const percentage = Math.round((score / total) * 100);
  return {
    percentage,
    isPassed: percentage >= 75,
  };
}

export function truncate(text: string, length: number = 100): string {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}
