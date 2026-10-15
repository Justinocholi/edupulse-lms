"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured, dataStore } from "@/lib/db/data-store";

export interface AuthActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export async function loginAction(formData: FormData): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message || "Invalid credentials",
    };
  }

  const { email, password } = parsed.data;

  // Supabase Auth if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { success: false, error: error.message };
      }
      const role = await dataStore.getUserRole(data.user.id);
      return {
        success: true,
        redirectTo: role === "admin" ? "/admin" : "/dashboard",
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Authentication failed" };
    }
  }

  // Fallback demo logins
  const cookieStore = cookies();
  if (email.toLowerCase().includes("admin")) {
    const adminUser = {
      id: "10000001-0000-0000-0000-000000000003",
      email: "admin@edupulse.io",
      full_name: "Platform Administrator",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      role: "admin",
    };
    cookieStore.set("edupulse-session", JSON.stringify(adminUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return { success: true, redirectTo: "/admin" };
  } else {
    const studentUser = {
      id: "10000001-0000-0000-0000-000000000004",
      email: email,
      full_name: email.split("@")[0],
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      role: "student",
    };
    cookieStore.set("edupulse-session", JSON.stringify(studentUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return { success: true, redirectTo: "/dashboard" };
  }
}

export async function registerAction(formData: FormData): Promise<AuthActionResult> {
  const rawData = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message || "Validation failed",
    };
  }

  const { full_name, email, password } = parsed.data;

  // Supabase Auth if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name },
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, redirectTo: "/dashboard" };
    } catch (err: any) {
      return { success: false, error: err.message || "Registration failed" };
    }
  }

  // Fallback demo registration - ALWAYS assigns 'student' role!
  const newUserId = `u-${Date.now()}`;
  const newUser = {
    id: newUserId,
    email,
    full_name,
    avatar_url: null,
    role: "student", // Strict student default role
  };

  const cookieStore = cookies();
  cookieStore.set("edupulse-session", JSON.stringify(newUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true, redirectTo: "/dashboard" };
}

export async function logoutAction() {
  const cookieStore = cookies();
  cookieStore.delete("edupulse-session");

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
  }

  redirect("/login");
}

export async function switchDemoRole(role: "student" | "admin") {
  const cookieStore = cookies();
  if (role === "admin") {
    const adminUser = {
      id: "10000001-0000-0000-0000-000000000003",
      email: "admin@edupulse.io",
      full_name: "Platform Administrator",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      role: "admin",
    };
    cookieStore.set("edupulse-session", JSON.stringify(adminUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect("/admin");
  } else {
    const studentUser = {
      id: "10000001-0000-0000-0000-000000000004",
      email: "student@edupulse.io",
      full_name: "Alex Rivera",
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      role: "student",
    };
    cookieStore.set("edupulse-session", JSON.stringify(studentUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect("/dashboard");
  }
}
