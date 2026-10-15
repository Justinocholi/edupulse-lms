import { dataStore } from "@/lib/db/data-store";
import { requireAdmin } from "@/lib/auth/session";
import { AdminSettingsForm } from "./settings-form";

export const metadata = {
  title: "Platform Settings | EduPulse Admin",
  description: "Configure platform branding, certificate prefixes, and global operational settings.",
};

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await dataStore.getPlatformSettings();

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          Platform Configuration
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Configure video hosting providers, platform branding, certificate policies, and database connection.
        </p>
      </div>

      <AdminSettingsForm initialSettings={settings} />
    </div>
  );
}
