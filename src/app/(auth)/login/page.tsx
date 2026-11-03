"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, Sparkles, Shield, User } from "lucide-react";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/dashboard";

  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          next: nextUrl,
        }),
      });

      const res = await response.json();

      if (res.success) {
        toast.success("Welcome back!");
        window.location.href = res.redirectTo || nextUrl;
      } else {
        toast.error(res.error || "Login failed. Please check your credentials.");
      }
    } catch {
      // Fallback to server action if direct API fails
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("next", nextUrl);
        const res = await loginAction(formData);
        if (res.success) {
          toast.success("Welcome back!");
          window.location.href = res.redirectTo || nextUrl;
          return;
        }
      } catch {}
      toast.error("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-400 text-white shadow-md shadow-brand-500/20">
              <Sparkles className="h-6 w-6 fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-xl font-extrabold tracking-tight text-foreground leading-none">
                Edu<span className="text-brand-600 dark:text-brand-400">Pulse</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
                LMS Platform
              </span>
            </div>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">Sign In to EduPulse</h1>
          <p className="text-xs text-muted-foreground">
            Access your enrolled masterclasses, live cohort batches, and verified certificates.
          </p>
        </div>

        {/* Quick Demo Credentials Info */}
        <div className="rounded-xl border border-brand-500/30 bg-brand-500/5 p-3 text-xs space-y-1 text-muted-foreground">
          <div className="flex items-center justify-between text-foreground font-semibold">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              <span>Admin Access:</span>
            </span>
            <code className="font-mono text-[11px] text-brand-600 dark:text-brand-400">admin@edupulse.io / Admin12345!</code>
          </div>
          <div className="flex items-center justify-between text-foreground font-semibold">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
              <span>Student Access:</span>
            </span>
            <code className="font-mono text-[11px] text-teal-600 dark:text-teal-400">student@edupulse.io / Student12345!</code>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/60 pt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
