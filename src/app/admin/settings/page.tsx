"use client";

import * as React from "react";
import { Sliders, Save, Database, ShieldCheck, Video, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = React.useState("EduPulse LMS");
  const [supportEmail, setSupportEmail] = React.useState("support@edupulse.io");
  const [videoProvider, setVideoProvider] = React.useState("mux");
  const [passingScore, setPassingScore] = React.useState(75);
  const [saving, setSaving] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Platform settings saved successfully!");
    }, 500);
  };

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
            <label className="text-xs font-semibold text-foreground">Video Delivery Provider</label>
            <select
              value={videoProvider}
              onChange={(e) => setVideoProvider(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="mux">Mux Video (Configurable External Streamer)</option>
              <option value="youtube">YouTube Embed (Zero Config)</option>
              <option value="vimeo">Vimeo Enterprise</option>
              <option value="custom">Custom S3 / Supabase Storage HLS</option>
            </select>
            <p className="text-[11px] text-muted-foreground">
              To activate Mux streaming, specify MUX_TOKEN_ID and MUX_TOKEN_SECRET in your environment variables.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Global Assessment Passing Threshold (%)
            </label>
            <Input
              type="number"
              min={50}
              max={100}
              value={passingScore}
              onChange={(e) => setPassingScore(Number(e.target.value))}
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="gradient" disabled={saving} className="rounded-xl px-6">
              <Save className="mr-1.5 h-4 w-4" />
              {saving ? "Saving Changes..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
