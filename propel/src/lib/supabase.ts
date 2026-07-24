import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Explicit type for the setAll cookie entries — required to satisfy TS strict mode
// "options?: object" covers the ResponseCookie shape without importing internal Next.js types
type CookieEntry = { name: string; value: string; options?: object };

// ── NOTE: cookies() is async in Next.js 15+, so these helpers are async ─────

export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieEntry[]) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as any)
            );
          } catch {
            // Called from Server Components — read-only context, safe to ignore
          }
        },
      },
    }
  );
}

export async function createServerSupabaseAdmin() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieEntry[]) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as any)
            );
          } catch {}
        },
      },
    }
  );
}
