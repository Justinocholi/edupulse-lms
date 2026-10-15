"use client";

import * as React from "react";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message received. Our team will get back to you shortly.");
    }, 600);
  };

  return (
    <div className="container py-16 px-4 max-w-xl space-y-8">
      <div className="text-center space-y-3">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Contact Advisory
        </h1>
        <p className="text-sm text-muted-foreground">
          Have an inquiry regarding enterprise licensing, course enrollment, or instructor partnerships?
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h3 className="font-bold text-lg text-foreground">Message Dispatched</h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Thank you for reaching out. An EduPulse curriculum advisor will review your note and respond within 24 hours.
            </p>
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
              Send Another Note
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <Input required placeholder="Jane Doe" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email Address</label>
              <Input type="email" required placeholder="jane@company.com" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Subject</label>
              <Input required placeholder="Course enrollment inquiry" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Message</label>
              <Textarea required placeholder="How can we assist your learning goals?" rows={4} />
            </div>

            <Button type="submit" variant="gradient" disabled={loading} className="w-full">
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Sending..." : "Submit Message"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
