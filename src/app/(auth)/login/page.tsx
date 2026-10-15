"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/dashboard";

  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const fillAdminCredentials = () => {
    setValue("email", "admin@edupulse.io");
    setValue("password", "Admin12345!");
  };

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("next", nextUrl);

      const res = await loginAction(formData);
      if (res.success) {
        toast.success("Welcome back!");
        window.location.href = res.redirectTo || nextUrl;
      } else {
        toast.error(res.error || "Login failed");
      }
    } catch {
      toast.error("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md">
              <Sparkles className="h-5 w-5 fill-current" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Edu<span className="text-teal-500">Pulse</span>
            </span>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access your masterclasses, quiz history, and certificates.
          </p>
        </div>

        {/* 1-Click Instant Admin Access Banner */}
        <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              Instant Administrator Access
            </span>
            <span className="text-[10px] font-mono rounded bg-brand-500/20 px-2 py-0.5 text-brand-700 dark:text-brand-300 font-semibold">
              1-Click
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Bypass typing credentials and enter the admin dashboard directly with full platform privileges:
          </p>
          <a
            href={`/api/auth/admin-login?next=${encodeURIComponent(nextUrl.startsWith("/admin") ? nextUrl : "/admin")}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 text-xs font-bold shadow-md transition-all active:scale-[0.99]"
          >
            <span>⚡ Enter Admin Dashboard (1-Click)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="name@company.com"
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
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span>Testing Admin?</span>
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Auto-fill admin@edupulse.io
              </button>
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
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
