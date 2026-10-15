"use client";

import * as React from "react";
import { User, Mail, Shield, Save, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";
import { updateProfileSelfAction } from "@/lib/auth/actions";
import { Profile } from "@/types";

interface SettingsFormProps {
  initialProfile: Profile;
  userEmail: string;
  userRole: string;
}

export function SettingsForm({ initialProfile, userEmail, userRole }: SettingsFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [fullName, setFullName] = React.useState(initialProfile.full_name || "");
  const [headline, setHeadline] = React.useState(initialProfile.headline || "");
  const [bio, setBio] = React.useState(initialProfile.bio || "");
  const [avatarUrl, setAvatarUrl] = React.useState(initialProfile.avatar_url || "");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("headline", headline);
      formData.append("bio", bio);
      formData.append("avatarUrl", avatarUrl);

      const res = await updateProfileSelfAction(formData);
      if (res.success) {
        toast.success("Profile preferences saved successfully!");
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    } catch {
      toast.error("An unexpected error occurred while saving profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
      {/* Profile Avatar Header */}
      <div className="flex items-center gap-5 border-b border-border/60 pb-6">
        <Avatar src={avatarUrl} fallback={fullName || "User"} size="xl" />
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-foreground">{fullName || "Student"}</h3>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
          <span className="inline-block rounded-full bg-secondary/15 px-2.5 py-0.5 text-[11px] font-semibold text-secondary capitalize">
            {userRole} Account
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
            placeholder="Your full name"
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
            placeholder="https://images.unsplash.com/..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Biography</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell us about your learning journey and technical goals..."
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="gradient"
            disabled={loading}
            className="rounded-xl px-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
