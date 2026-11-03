"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  X,
  Send,
} from "lucide-react";
import { Batch, Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createBatchAdminAction, deleteBatchAdminAction } from "./actions";
import { toast } from "sonner";

interface AdminBatchManagerClientProps {
  batches: Batch[];
  courses: Course[];
}

export function AdminBatchManagerClient({
  batches,
  courses,
}: AdminBatchManagerClientProps) {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleCreateBatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await createBatchAdminAction(formData);
      if (res.success) {
        toast.success("Academic batch created successfully!");
        setShowCreateForm(false);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to create batch");
      }
    } catch {
      toast.error("Failed to create batch");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm("Are you sure you want to delete this cohort batch?")) return;
    try {
      await deleteBatchAdminAction(batchId);
      toast.success("Batch removed");
      router.refresh();
    } catch {
      toast.error("Failed to delete batch");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground font-medium">
          Total active batches: <strong className="text-foreground">{batches.length}</strong>
        </span>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold"
        >
          <PlusCircle className="mr-1.5 h-4 w-4" />
          <span>{showCreateForm ? "Close Form" : "Create New Cohort"}</span>
        </Button>
      </div>

      {/* Creation Modal / Form */}
      {showCreateForm && (
        <div className="rounded-2xl border-2 border-[#003366]/30 bg-card p-6 shadow-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
              <Video className="h-4 w-4 text-[#990033]" />
              <span>Schedule New Academic Batch</span>
            </h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleCreateBatch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Cohort / Batch Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. SS 1 Science &amp; Tech - Term 1 Batch"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Associated Course / Subject</label>
                <select
                  name="course_id"
                  required
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Live Class Timetable Description</label>
                <input
                  type="text"
                  name="live_schedule_description"
                  required
                  placeholder="e.g. Tuesdays &amp; Thursdays, 4:00 PM WAT"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Live Class Video URL (Zoom / Meet)</label>
                <input
                  type="url"
                  name="live_class_url"
                  required
                  placeholder="https://zoom.us/j/teacher-home-cohort"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Maximum Student Capacity</label>
                <input
                  type="number"
                  name="max_seats"
                  defaultValue={40}
                  min={5}
                  max={200}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Cohort Status</label>
                <select
                  name="status"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
                >
                  <option value="ongoing">Ongoing (Active Live Classes)</option>
                  <option value="upcoming">Upcoming (Enrollment Open)</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCreateForm(false)}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="rounded-xl bg-[#003366] text-white text-xs font-bold"
              >
                <Send className="mr-1.5 h-3.5 w-3.5" />
                <span>{submitting ? "Scheduling..." : "Publish Batch"}</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Batches Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/50 text-muted-foreground uppercase font-mono text-[10px]">
              <tr>
                <th className="px-5 py-3 font-semibold">Cohort Title &amp; Subject</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Live Timetable</th>
                <th className="px-5 py-3 font-semibold">Seats</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground text-sm">{batch.title}</span>
                      <span className="text-muted-foreground text-[11px] flex items-center gap-1 mt-0.5">
                        <BookOpen className="h-3 w-3" />
                        {batch.course?.title || "Course Linked"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant={batch.status === "ongoing" ? "success" : "brand"}
                      className="capitalize font-mono text-[10px]"
                    >
                      {batch.status}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {batch.live_schedule_description}
                      </span>
                      {batch.live_class_url && (
                        <a
                          href={batch.live_class_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#003366] dark:text-[#66b2ff] hover:underline flex items-center gap-1 text-[11px] mt-0.5"
                        >
                          <Video className="h-3 w-3" />
                          <span>Test Live Zoom Link</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 font-mono font-semibold text-foreground">
                    {batch.enrolled_count} / {batch.max_seats || 40}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/batches/${batch.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                          Hub
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDeleteBatch(batch.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                        title="Delete Batch"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
