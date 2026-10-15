import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { dataStore, isSupabaseConfigured } from "@/lib/db/data-store";
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

  // If live Supabase is configured, read real Supabase auth session
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return { user: null, role: null };
      }

      const role = await dataStore.getUserRole(user.id);
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
      // fallback to cookie session
    }
  }

  // Fallback cookie-based session for zero-config demonstration & testing
  const authCookie = cookieStore.get("edupulse-session")?.value;

  if (!authCookie) {
    // Default to student demo session for immediate interactive preview
    return {
      user: {
        id: "10000001-0000-0000-0000-000000000004",
        email: "student@edupulse.io",
        full_name: "Alex Rivera",
        avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      },
      role: "student",
    };
  }

  try {
    const parsed = JSON.parse(authCookie);
    const role = (await dataStore.getUserRole(parsed.id)) || parsed.role || "student";
    return {
      user: {
        id: parsed.id,
        email: parsed.email,
        full_name: parsed.full_name || "Learner",
        avatar_url: parsed.avatar_url,
      },
      role,
    };
  } catch {
    return { user: null, role: null };
  }
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
