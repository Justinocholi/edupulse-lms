"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CertificateLookupForm() {
  const router = useRouter();
  const [code, setCode] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode) {
      router.push(`/certificates/${encodeURIComponent(cleanCode)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder="Enter Certificate Code (e.g., EDU-2026-XXXX)"
          className="w-full rounded-2xl border border-white/30 bg-white/10 px-11 py-3 text-sm text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#66b2ff] backdrop-blur-md font-mono"
        />
      </div>
      <Button
        type="submit"
        className="rounded-2xl bg-gradient-to-r from-[#990033] to-[#7a0029] hover:opacity-95 text-white px-6 py-3 text-xs font-bold shadow-lg transition-all"
      >
        <Search className="mr-1.5 h-4 w-4" />
        <span>Verify Record</span>
      </Button>
    </form>
  );
}
