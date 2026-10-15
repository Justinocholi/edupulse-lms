"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CourseFilterProps {
  categories: Category[];
  initialSearch?: string;
  initialCategory?: string;
  initialDifficulty?: string;
  initialSort?: string;
}

export function CourseFilter({
  categories,
  initialSearch = "",
  initialCategory = "",
  initialDifficulty = "all",
  initialSort = "newest",
}: CourseFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleUpdate = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/courses?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/courses");
  };

  const hasActiveFilters =
    Boolean(initialSearch) ||
    Boolean(initialCategory) ||
    initialDifficulty !== "all" ||
    initialSort !== "newest";

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            defaultValue={initialSearch}
            placeholder="Search by course title, topic, or keyword..."
            className="pl-10 h-11 rounded-xl"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate("q", (e.target as HTMLInputElement).value);
              }
            }}
          />
        </div>

        {/* Category selector */}
        <select
          value={initialCategory}
          onChange={(e) => handleUpdate("category", e.target.value)}
          className="h-11 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.course_count || 0})
            </option>
          ))}
        </select>

        {/* Difficulty selector */}
        <select
          value={initialDifficulty}
          onChange={(e) => handleUpdate("difficulty", e.target.value)}
          className="h-11 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Sort selector */}
        <select
          value={initialSort}
          onChange={(e) => handleUpdate("sort", e.target.value)}
          className="h-11 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="newest">Newest Releases</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>

        {/* Reset button if active */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="h-11 rounded-xl text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3.5 w-3.5" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
