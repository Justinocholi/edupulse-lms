import Link from "next/link";
import {
  Video,
  PlusCircle,
  Calendar,
  Users,
  Clock,
  ExternalLink,
  Trash2,
  BookOpen,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminBatchManagerClient } from "./admin-batch-manager-client";

export const metadata = {
  title: "Batches & Cohort Management | Admin Console",
  description: "Schedule cohorts, configure Zoom live links, assign teachers, and track seat allocations.",
};

export default async function AdminBatchesPage() {
  await requireAdmin();

  const [batches, courses] = await Promise.all([
    dataStore.getBatches(),
    dataStore.getCourses({ includeDrafts: true }),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#990033]">
            <Video className="h-4 w-4" />
            <span>Frappe LMS Standard Batch Control</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            Academic Batches &amp; Live Classes
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Organize student cohorts, set live video conference links (Zoom / Google Meet), and publish timetables.
          </p>
        </div>
      </div>

      {/* Client manager for batch listing and creation */}
      <AdminBatchManagerClient batches={batches} courses={courses} />
    </div>
  );
}
