"use client";

import * as React from "react";
import { Printer, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CertificateActions({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Certificate verification link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="rounded-xl text-xs font-bold"
      >
        {copied ? <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="mr-1.5 h-3.5 w-3.5" />}
        <span>{copied ? "Link Copied" : "Share Credential"}</span>
      </Button>

      <Button
        variant="default"
        size="sm"
        onClick={handlePrint}
        className="rounded-xl bg-[#003366] text-white text-xs font-bold shadow-md hover:bg-[#002244]"
      >
        <Printer className="mr-1.5 h-3.5 w-3.5" />
        <span>Print Certificate</span>
      </Button>
    </div>
  );
}
