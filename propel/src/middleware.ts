import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Explicit type satisfies TS strict mode without importing internal Next.js cookie types
type CookieEntry = { name: string; value: string; options?: object };

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieEntry[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as any)
          );
        },
      },
    }
  );

  // Refresh the session — keeps the Supabase session alive on the client
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect unauthenticated users away from /dashboard
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  // Redirect already-authenticated users away from /auth
  if (user && request.nextUrl.pathname === "/auth") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/copy";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
};
