"use client";

import * as React from "react";
import { Sliders, Save, Database, ShieldCheck, Video, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updatePlatformSettingsAction } from "./actions";
import { PlatformSettings } from "@/types";

interface AdminSettingsFormProps {
  initialSettings: PlatformSettings;
}

export function AdminSettingsForm({ initialSettings }: AdminSettingsFormProps) {
  const [platformName, setPlatformName] = React.useState(initialSettings.platform_name || "EduPulse");
  const [supportEmail, setSupportEmail] = React.useState(initialSettings.support_email || "support@edupulse.io");
  const [allowPublicRegistration, setAllowPublicRegistration] = React.useState(
    initialSettings.allow_public_registration ?? true
  );
  const [certificatePrefix, setCertificatePrefix] = React.useState(initialSettings.certificate_prefix || "EDU");
  const [defaultCurrency, setDefaultCurrency] = React.useState(initialSettings.default_currency || "USD");
  const [saving, setSaving] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updatePlatformSettingsAction({
        platform_name: platformName,
        support_email: supportEmail,
        allow_public_registration: allowPublicRegistration,
        certificate_prefix: certificatePrefix,
        default_currency: defaultCurrency,
      });

      if (res.success) {
        toast.success("Platform settings successfully updated and logged!");
      } else {
        toast.error(res.error || "Failed to update platform settings");
      }
    } catch {
      toast.error("An unexpected error occurred while saving platform settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
      <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          <div>
            <p className="font-semibold text-xs text-foreground">Database Architecture</p>
            <p className="text-[11px] text-muted-foreground">
              PostgreSQL with active Row Level Security (RLS) enforcement
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" /> Operational
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Platform Brand Name</label>
          <Input
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Support & Advisory Email</label>
          <Input
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Certificate Serial Code Prefix</label>
          <Input
            value={certificatePrefix}
            onChange={(e) => setCertificatePrefix(e.target.value.toUpperCase())}
            required
            maxLength={6}
            placeholder="EDU"
          />
          <p className="text-[11px] text-muted-foreground">
            Prefix for generated cryptographic verification codes (e.g. {certificatePrefix}-2026-XXXX).
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Default Platform Currency</label>
          <Input
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value.toUpperCase())}
            required
            maxLength={3}
            placeholder="USD"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-foreground">Allow Public Registration</span>
            <p className="text-[11px] text-muted-foreground">
              Allow new learners to register self-service student accounts.
            </p>
          </div>
          <input
            type="checkbox"
            checked={allowPublicRegistration}
            onChange={(e) => setAllowPublicRegistration(e.target.checked)}
            className="h-4 w-4 rounded border-input text-brand-600 focus:ring-brand-500"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="gradient"
            disabled={saving}
            className="rounded-xl px-6"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Configuration...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Platform Configuration
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
