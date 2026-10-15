import Link from "next/link";
import { Compass, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-6">
        <Compass className="h-10 w-10 animate-spin-slow" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-base text-muted-foreground max-w-md">
        The course, lesson, or resource you are searching for might have been moved, unpublished, or does not exist.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="default">
            <MoveLeft className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </Link>
        <Link href="/courses">
          <Button variant="outline">Browse Courses</Button>
        </Link>
      </div>
    </div>
  );
}
