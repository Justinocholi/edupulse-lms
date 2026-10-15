"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  Plus,
  PlayCircle,
  FileText,
  HelpCircle,
  Trash2,
  ExternalLink,
  MoveLeft,
  Loader2,
  Pencil,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Course, Module, Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  createModuleAction,
  updateModuleAction,
  deleteModuleAction,
  reorderModulesAction,
  createLessonAction,
  updateLessonAction,
  deleteLessonAction,
  reorderLessonsAction,
} from "@/app/admin/courses/actions";
import { toast } from "sonner";

interface CurriculumBuilderProps {
  course: Course;
}

export function CurriculumBuilder({ course }: CurriculumBuilderProps) {
  const router = useRouter();

  // Add Module Modal State
  const [moduleModalOpen, setModuleModalOpen] = React.useState(false);
  const [moduleTitle, setModuleTitle] = React.useState("");
  const [moduleDesc, setModuleDesc] = React.useState("");
  const [savingModule, setSavingModule] = React.useState(false);

  // Edit Module Modal State
  const [editModuleModalOpen, setEditModuleModalOpen] = React.useState(false);
  const [editingModuleId, setEditingModuleId] = React.useState<string | null>(null);
  const [editModuleTitle, setEditModuleTitle] = React.useState("");
  const [editModuleDesc, setEditModuleDesc] = React.useState("");
  const [savingEditModule, setSavingEditModule] = React.useState(false);

  // Add Lesson Modal State
  const [lessonModalOpen, setLessonModalOpen] = React.useState(false);
  const [targetModuleId, setTargetModuleId] = React.useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = React.useState("");
  const [contentType, setContentType] = React.useState<"video" | "text" | "quiz">("video");
  const [bodyMarkdown, setBodyMarkdown] = React.useState("");
  const [videoId, setVideoId] = React.useState("dQw4w9WgXcQ");
  const [videoDuration, setVideoDuration] = React.useState(300);
  const [isPreview, setIsPreview] = React.useState(false);
  const [savingLesson, setSavingLesson] = React.useState(false);

  // Edit Lesson Modal State
  const [editLessonModalOpen, setEditLessonModalOpen] = React.useState(false);
  const [editingLessonId, setEditingLessonId] = React.useState<string | null>(null);
  const [editLessonTitle, setEditLessonTitle] = React.useState("");
  const [editContentType, setEditContentType] = React.useState<"video" | "text" | "quiz">("video");
  const [editBodyMarkdown, setEditBodyMarkdown] = React.useState("");
  const [editVideoId, setEditVideoId] = React.useState("");
  const [editVideoDuration, setEditVideoDuration] = React.useState(300);
  const [editIsPreview, setEditIsPreview] = React.useState(false);
  const [savingEditLesson, setSavingEditLesson] = React.useState(false);

  // Reordering loading states
  const [isReordering, setIsReordering] = React.useState(false);

  const modules = course.modules || [];

  // ================= MODULE ACTIONS =================
  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;
    try {
      setSavingModule(true);
      const res = await createModuleAction(course.id, moduleTitle, moduleDesc);
      if (res.success) {
        toast.success("Module created successfully!");
        setModuleModalOpen(false);
        setModuleTitle("");
        setModuleDesc("");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to create module");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setSavingModule(false);
    }
  };

  const openEditModuleModal = (mod: Module) => {
    setEditingModuleId(mod.id);
    setEditModuleTitle(mod.title);
    setEditModuleDesc(mod.description || "");
    setEditModuleModalOpen(true);
  };

  const handleUpdateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModuleId || !editModuleTitle.trim()) return;
    try {
      setSavingEditModule(true);
      const res = await updateModuleAction(course.id, editingModuleId, editModuleTitle, editModuleDesc);
      if (res.success) {
        toast.success("Module updated successfully!");
        setEditModuleModalOpen(false);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update module");
      }
    } catch {
      toast.error("Failed to update module");
    } finally {
      setSavingEditModule(false);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Are you sure you want to delete this module and all its lessons?")) return;
    try {
      const res = await deleteModuleAction(course.id, moduleId);
      if (res.success) {
        toast.success("Module deleted.");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete module");
    }
  };

  const handleMoveModule = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= modules.length) return;

    const reordered = [...modules];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    try {
      setIsReordering(true);
      const res = await reorderModulesAction(course.id, reordered.map((m) => m.id));
      if (res.success) {
        toast.success("Module order updated");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to reorder modules");
      }
    } catch {
      toast.error("Failed to reorder modules");
    } finally {
      setIsReordering(false);
    }
  };

  // ================= LESSON ACTIONS =================
  const openAddLessonModal = (moduleId: string) => {
    setTargetModuleId(moduleId);
    setLessonTitle("");
    setContentType("video");
    setBodyMarkdown("");
    setVideoId("dQw4w9WgXcQ");
    setVideoDuration(300);
    setIsPreview(false);
    setLessonModalOpen(true);
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetModuleId || !lessonTitle.trim()) return;
    try {
      setSavingLesson(true);
      const res = await createLessonAction(course.id, targetModuleId, {
        title: lessonTitle,
        content_type: contentType,
        body_markdown: bodyMarkdown,
        video_provider: contentType === "video" ? "youtube" : "none",
        video_id: contentType === "video" ? videoId : null,
        video_duration_seconds: videoDuration,
        is_preview: isPreview,
      });

      if (res.success) {
        toast.success("Lesson added successfully!");
        setLessonModalOpen(false);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to add lesson");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setSavingLesson(false);
    }
  };

  const openEditLessonModal = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setEditLessonTitle(lesson.title);
    setEditContentType((lesson.content_type as any) || "video");
    setEditBodyMarkdown(lesson.body_markdown || "");
    setEditVideoId(lesson.video_id || "");
    setEditVideoDuration(lesson.video_duration_seconds || 300);
    setEditIsPreview(Boolean(lesson.is_preview));
    setEditLessonModalOpen(true);
  };

  const handleUpdateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLessonId || !editLessonTitle.trim()) return;
    try {
      setSavingEditLesson(true);
      const res = await updateLessonAction(course.id, editingLessonId, {
        title: editLessonTitle,
        content_type: editContentType,
        body_markdown: editBodyMarkdown,
        video_provider: editContentType === "video" ? "youtube" : "none",
        video_id: editContentType === "video" ? editVideoId : null,
        video_duration_seconds: editVideoDuration,
        is_preview: editIsPreview,
      });

      if (res.success) {
        toast.success("Lesson updated successfully!");
        setEditLessonModalOpen(false);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update lesson");
      }
    } catch {
      toast.error("An error occurred updating lesson");
    } finally {
      setSavingEditLesson(false);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const res = await deleteLessonAction(course.id, lessonId);
      if (res.success) {
        toast.success("Lesson removed.");
        router.refresh();
      }
    } catch {
      toast.error("Failed to delete lesson");
    }
  };

  const handleMoveLesson = async (module: Module, lessonIndex: number, direction: "up" | "down") => {
    const lessons = module.lessons || [];
    const targetIndex = direction === "up" ? lessonIndex - 1 : lessonIndex + 1;
    if (targetIndex < 0 || targetIndex >= lessons.length) return;

    const reordered = [...lessons];
    const [moved] = reordered.splice(lessonIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    try {
      setIsReordering(true);
      const res = await reorderLessonsAction(course.id, module.id, reordered.map((l) => l.id));
      if (res.success) {
        toast.success("Lesson order updated");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to reorder lessons");
      }
    } catch {
      toast.error("Failed to reorder lessons");
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/courses">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
              <MoveLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
              Curriculum Builder
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {course.title} • {modules.length} Modules Configured
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href={`/learn/${course.slug}`} target="_blank">
            <Button variant="outline" size="sm" className="rounded-xl">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Preview as Student
            </Button>
          </Link>

          <Button
            variant="default"
            size="sm"
            onClick={() => setModuleModalOpen(true)}
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Add New Module
          </Button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {modules.length > 0 ? (
          modules.map((module, mIdx) => (
            <div
              key={module.id}
              className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
            >
              {/* Module Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-muted/40 p-4 border-b border-border/80 gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary text-xs">
                    {mIdx + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-foreground">
                      {module.title}
                    </h3>
                    {module.description && (
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  {/* Module Reordering Controls */}
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={mIdx === 0 || isReordering}
                    onClick={() => handleMoveModule(mIdx, "up")}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                    title="Move Module Up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={mIdx === modules.length - 1 || isReordering}
                    onClick={() => handleMoveModule(mIdx, "down")}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                    title="Move Module Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>

                  {/* Edit Module */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModuleModal(module)}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                    title="Edit Module Title/Description"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>

                  {/* Add Lesson */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddLessonModal(module.id)}
                    className="h-8 rounded-lg text-xs ml-1"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" />
                    Add Lesson
                  </Button>

                  {/* Delete Module */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteModule(module.id)}
                    className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Delete Module"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Module Lessons */}
              <div className="divide-y divide-border/60">
                {module.lessons && module.lessons.length > 0 ? (
                  module.lessons.map((lesson, lIdx) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3.5 text-xs hover:bg-muted/20 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground font-mono text-[11px] w-4">
                          {lIdx + 1}
                        </span>
                        {lesson.content_type === "video" ? (
                          <PlayCircle className="h-4 w-4 text-primary" />
                        ) : lesson.content_type === "quiz" ? (
                          <HelpCircle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        )}
                        <span className="font-semibold text-foreground">{lesson.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {lesson.is_preview && (
                          <Badge variant="outline" className="text-[10px] text-teal-600 border-teal-500/30">
                            Free Preview
                          </Badge>
                        )}
                        <span className="capitalize text-muted-foreground font-mono text-[11px] hidden sm:inline">
                          {lesson.content_type}
                        </span>

                        {/* Lesson Reordering Controls */}
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={lIdx === 0 || isReordering}
                          onClick={() => handleMoveLesson(module, lIdx, "up")}
                          className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
                          title="Move Lesson Up"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={lIdx === (module.lessons?.length ?? 0) - 1 || isReordering}
                          onClick={() => handleMoveLesson(module, lIdx, "down")}
                          className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
                          title="Move Lesson Down"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>

                        {/* Edit Lesson */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditLessonModal(lesson)}
                          className="h-7 w-7 rounded-md text-muted-foreground hover:text-foreground"
                          title="Edit Lesson Content"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>

                        {/* Delete Lesson */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          title="Delete Lesson"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No lessons in this module yet. Click &ldquo;Add Lesson&rdquo; to create your first lecture.
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-4">
            <Layers className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="font-bold text-base text-foreground">No Curriculum Modules Yet</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Construct sequential learning chapters by adding modules, then populating them with video and text lectures.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => setModuleModalOpen(true)}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add First Module
            </Button>
          </div>
        )}
      </div>

      {/* CREATE MODULE DIALOG */}
      <Dialog open={moduleModalOpen} onOpenChange={setModuleModalOpen}>
        <form onSubmit={handleCreateModule} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Curriculum Module</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Module Title</label>
              <Input
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                placeholder="e.g. Module 1: Foundations of Next.js 14 App Router"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Description (Optional)</label>
              <Input
                value={moduleDesc}
                onChange={(e) => setModuleDesc(e.target.value)}
                placeholder="Brief pedagogical summary of this chapter..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setModuleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={savingModule}>
              {savingModule ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Module"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* EDIT MODULE DIALOG */}
      <Dialog open={editModuleModalOpen} onOpenChange={setEditModuleModalOpen}>
        <form onSubmit={handleUpdateModule} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Curriculum Module</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Module Title</label>
              <Input
                value={editModuleTitle}
                onChange={(e) => setEditModuleTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Description (Optional)</label>
              <Input
                value={editModuleDesc}
                onChange={(e) => setEditModuleDesc(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditModuleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={savingEditModule}>
              {savingEditModule ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* CREATE LESSON DIALOG */}
      <Dialog open={lessonModalOpen} onOpenChange={setLessonModalOpen}>
        <form onSubmit={handleCreateLesson} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Lesson to Module</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Lesson Title</label>
              <Input
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="e.g. Server Components vs Client Components Deep Dive"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Content Type</label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value as any)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="video">HD Video Lecture</option>
                  <option value="text">Interactive Text & Code</option>
                  <option value="quiz">Knowledge Assessment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Duration (Seconds)</label>
                <Input
                  type="number"
                  value={videoDuration}
                  onChange={(e) => setVideoDuration(Number(e.target.value))}
                />
              </div>
            </div>

            {contentType === "video" && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">YouTube/Mux Video ID</label>
                <Input
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="dQw4w9WgXcQ"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Lecture Notes (Markdown)</label>
              <Textarea
                value={bodyMarkdown}
                onChange={(e) => setBodyMarkdown(e.target.value)}
                placeholder="### Topic Overview..."
                rows={4}
              />
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isPreview}
                onChange={(e) => setIsPreview(e.target.checked)}
                className="rounded"
              />
              Allow Free Preview for Unregistered/Unenrolled visitors
            </label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setLessonModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={savingLesson}>
              {savingLesson ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* EDIT LESSON DIALOG */}
      <Dialog open={editLessonModalOpen} onOpenChange={setEditLessonModalOpen}>
        <form onSubmit={handleUpdateLesson} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Lesson Title</label>
              <Input
                value={editLessonTitle}
                onChange={(e) => setEditLessonTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Content Type</label>
                <select
                  value={editContentType}
                  onChange={(e) => setEditContentType(e.target.value as any)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="video">HD Video Lecture</option>
                  <option value="text">Interactive Text & Code</option>
                  <option value="quiz">Knowledge Assessment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Duration (Seconds)</label>
                <Input
                  type="number"
                  value={editVideoDuration}
                  onChange={(e) => setEditVideoDuration(Number(e.target.value))}
                />
              </div>
            </div>

            {editContentType === "video" && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">YouTube/Mux Video ID</label>
                <Input
                  value={editVideoId}
                  onChange={(e) => setEditVideoId(e.target.value)}
                  placeholder="dQw4w9WgXcQ"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Lecture Notes (Markdown)</label>
              <Textarea
                value={editBodyMarkdown}
                onChange={(e) => setEditBodyMarkdown(e.target.value)}
                rows={4}
              />
            </div>

            <label className="flex items-center gap-2 pt-1 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={editIsPreview}
                onChange={(e) => setEditIsPreview(e.target.checked)}
                className="rounded"
              />
              Allow Free Preview for Unregistered/Unenrolled visitors
            </label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditLessonModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={savingEditLesson}>
              {savingEditLesson ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
