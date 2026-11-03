"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", data.email);

      const res = await forgotPasswordAction(formData);
      if (res.success) {
        setSent(true);
        toast.success("Password recovery instructions sent to your email.");
      } else {
        toast.error(res.error || "Failed to process request.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6">
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
                If an account exists with that email address, you will receive password reset instructions shortly.
              </p>
              <Link href="/login" className="inline-block pt-2">
                <Button variant="outline" size="sm" className="rounded-xl">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Account Email</label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
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
                    Sending Recovery Link...
                  </>
                ) : (
                  <>
                    Send Recovery Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border/60 pt-4">
            Remember your credentials?{" "}
            <Link href="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
