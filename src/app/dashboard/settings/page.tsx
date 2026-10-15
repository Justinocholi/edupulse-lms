import { User } from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Account Settings | EduPulse",
  description: "Configure your public profile, professional headline, and learner biography.",
};

export default async function StudentSettingsPage() {
  const session = await requireAuth();
  const userId = session.user!.id;
  const profile = (await dataStore.getProfile(userId)) || {
    id: userId,
    email: session.user!.email,
    full_name: session.user!.full_name,
    avatar_url: session.user!.avatar_url || null,
    headline: null,
    bio: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
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

      <SettingsForm
        initialProfile={profile}
        userEmail={session.user!.email}
        userRole={session.role || "student"}
      />
    </div>
  );
}
