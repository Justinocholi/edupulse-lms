import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4 space-y-4">
            <Skeleton className="h-44 w-full rounded-lg" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
