"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      const res = await registerAction(formData);
      if (res.success) {
        toast.success("Account created successfully! Welcome to EduPulse.");
        router.push(res.redirectTo || "/dashboard");
        router.refresh();
      } else {
        toast.error(res.error || "Registration failed");
      }
    } catch {
      toast.error("An unexpected error occurred during registration.");
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
          <h1 className="font-heading text-2xl font-bold text-foreground">
            Create Your Account
          </h1>
          <p className="text-xs text-muted-foreground">
            Start your learning journey with institutional masterclasses.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <Input
                placeholder="Jane Smith"
                {...register("full_name")}
              />
              {errors.full_name && (
                <p className="text-xs text-destructive">{errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="jane@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <Input
                type="password"
                placeholder="Min. 8 chars, 1 uppercase, 1 number"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Confirm Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="rounded-lg bg-muted/40 p-3 text-[11px] text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                New registrations are granted student permissions by default. Administrative roles are managed via secure server-side delegation.
              </span>
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
                  Creating Account...
                </>
              ) : (
                <>
                  Complete Registration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/60 pt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
