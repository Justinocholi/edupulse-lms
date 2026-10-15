"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Loader2, ArrowRight, MoveLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Password reset instructions dispatched to your email.");
    }, 600);
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md">
              <Sparkles className="h-5 w-5 fill-current" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Edu<span className="text-teal-500">Pulse</span>
            </span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Password Recovery
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your account email to receive a secure password reset link.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          {sent ? (
            <div className="text-center py-4 space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
              <h3 className="font-bold text-base text-foreground">Instructions Sent</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If an account matches that email address, you will receive password reset instructions within moments.
              </p>
              <Link href="/login" className="inline-block pt-2">
                <Button variant="outline" size="sm">
                  <MoveLeft className="mr-1.5 h-4 w-4" />
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Email Address</label>
                <Input type="email" required placeholder="name@company.com" />
              </div>

              <Button
                type="submit"
                variant="gradient"
                disabled={loading}
                className="w-full rounded-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    Send Recovery Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2">
                <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">
                  Remember password? Sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
