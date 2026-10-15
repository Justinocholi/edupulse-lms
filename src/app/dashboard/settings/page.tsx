"use client";

import * as React from "react";
import { User, Mail, Shield, Save, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function StudentSettingsPage() {
  const [loading, setLoading] = React.useState(false);
  const [fullName, setFullName] = React.useState("Alex Rivera");
  const [headline, setHeadline] = React.useState("Aspiring Cloud & Full-Stack Engineer");
  const [bio, setBio] = React.useState(
    "Focused on building distributed Next.js systems, resilient microservices, and secure cloud architectures."
  );
  const [avatarUrl, setAvatarUrl] = React.useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile preferences saved successfully!");
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
          <User className="h-4 w-4" />
          <span>Profile Configuration</span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Update your public profile, bio, and student credentials.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
        {/* Profile Avatar Header */}
        <div className="flex items-center gap-5 border-b border-border/60 pb-6">
          <Avatar src={avatarUrl} fallback={fullName} size="xl" />
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-foreground">{fullName}</h3>
            <p className="text-xs text-muted-foreground">student@edupulse.io</p>
            <span className="inline-block rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
              Verified Student
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Full Name</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Professional Headline
            </label>
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Senior Software Architect"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Avatar Image URL
            </label>
            <Input
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Biography</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="gradient" disabled={loading} className="rounded-xl px-6">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
