import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { dataStore, isSupabaseConfigured, isTestMode } from "@/lib/db/data-store";
import { UserRole } from "@/types";

export interface AuthSession {
  user: {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string | null;
  } | null;
  role: UserRole | null;
}

export async function getCurrentSession(): Promise<AuthSession> {
  const cookieStore = cookies();

  // Primary: Live Supabase Auth Engine with Server-Verified Session
  if (isSupabaseConfigured() && !isTestMode()) {
    try {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        return { user: null, role: null };
      }

      let role: UserRole | null = null;
      try {
        const { data: roleRow } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();
        if (roleRow?.role) {
          role = roleRow.role as UserRole;
        }
      } catch {
        // Fallback to dataStore if direct query errors
      }

      if (!role) {
        role = await dataStore.getUserRole(user.id);
      }
      const profile = await dataStore.getProfile(user.id);

      return {
        user: {
          id: user.id,
          email: user.email || "",
          full_name: profile?.full_name || user.user_metadata?.full_name || "Learner",
          avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url,
        },
        role,
      };
    } catch {
      return { user: null, role: null };
    }
  }

  // Hermetic test harness for isolated automated test runs
  if (isTestMode()) {
    const authCookie = cookieStore.get("edupulse-test-session")?.value;
    if (authCookie) {
      try {
        const parsed = JSON.parse(authCookie);
        const role = await dataStore.getUserRole(parsed.id);
        return {
          user: {
            id: parsed.id,
            email: parsed.email,
            full_name: parsed.full_name || "Learner",
            avatar_url: parsed.avatar_url,
          },
          role: role || parsed.role || "student",
        };
      } catch {
        return { user: null, role: null };
      }
    }
  }

  // Unauthenticated visitor
  return { user: null, role: null };
}

export async function requireAuth(): Promise<AuthSession> {
  const session = await getCurrentSession();
  if (!session.user) {
    redirect("/login");
  }
  return session;
}

export async function requireAdmin(): Promise<AuthSession> {
  const session = await getCurrentSession();
  if (!session.user) {
    redirect("/login?next=/admin");
  }
  if (session.role !== "admin") {
    redirect("/dashboard?error=unauthorized_admin_access");
  }
  return session;
}
