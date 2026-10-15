import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...vals] = trimmed.split("=");
      if (key && vals.length > 0) {
        process.env[key.trim()] = vals.join("=").trim();
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("\n=======================================================");
console.log("⚡ EduPulse Supabase Connection Tester");
console.log("=======================================================\n");

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("placeholder")) {
  console.log("❌ Supabase is not configured yet in .env.local.");
  console.log("\nPlease create a .env.local file with:");
  console.log("NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co");
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n");
  process.exit(1);
}

console.log(`Connecting to: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // 1. Test basic connectivity
    const { data: catData, error: catError } = await supabase.from("categories").select("count").limit(1);

    if (catError) {
      if (catError.code === "42P01" || catError.message?.includes("does not exist")) {
        console.log("⚠️  Connected to Supabase, but the LMS tables are not created yet!");
        console.log("👉 Go to your Supabase Dashboard -> SQL Editor");
        console.log("👉 Copy and run the SQL migration from: supabase/migrations/20261014000000_init_lms_schema.sql");
        console.log("👉 Then copy and run seed data from: supabase/seed.sql\n");
      } else {
        console.log("❌ Connection Error:", catError.message);
      }
      return;
    }

    console.log("✅ Successfully connected to Supabase PostgreSQL database!");

    // 2. Count courses
    const { count, error: courseError } = await supabase.from("courses").select("*", { count: "exact", head: true });
    if (!courseError) {
      console.log(`✅ Courses table found. Total courses in Supabase: ${count}`);
    }

    // 3. Test Auth service
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (!authError) {
      console.log("✅ Supabase Auth service reachable.");
    }

    console.log("\n🎉 All systems operational! EduPulse is connected with your live Supabase database.\n");
  } catch (err) {
    console.error("❌ Unexpected connection error:", err);
  }
}

testConnection();
