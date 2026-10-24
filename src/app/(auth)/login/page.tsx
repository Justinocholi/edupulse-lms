"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, GraduationCap } from "lucide-react";
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
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#003366] text-white shadow-md p-1 border border-[#990033]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo.png" alt="Teacher Home Crest" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-xl font-bold tracking-tight text-[#003366] dark:text-white leading-none">
                Teacher Home
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#990033] dark:text-[#ff6685] mt-1">
                Secondary School
              </span>
            </div>
          </Link>
          <h1 className="font-heading text-2xl font-bold text-foreground">School Portal Sign In</h1>
          <p className="text-xs text-muted-foreground">
            Sign in to access your student examination results or staff administration console.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email or Student User ID</label>
              <Input
                type="email"
                placeholder="name@teacherhomeschool.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">Password / Security PIN</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#003366] dark:text-[#66b2ff] hover:underline"
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
              className="w-full rounded-xl bg-[#003366] text-white hover:bg-[#002a54] font-bold text-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In to Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/60 pt-4">
            Don&apos;t have an account or seeking admission?{" "}
            <Link href="/#admissions" className="font-semibold text-[#990033] dark:text-[#ff6685] hover:underline">
              Apply for Admission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
