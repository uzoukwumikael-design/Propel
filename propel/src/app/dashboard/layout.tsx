"use client";

// Tell Next.js to never statically pre-render any /dashboard route.
// These pages depend on auth state and must be rendered on each request.
export const dynamic = "force-dynamic";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

const NAV = [
  { href: "/dashboard/copy",      icon: "◈",  label: "AI Copy",          badge: null },
  { href: "/dashboard/checklist", icon: "✓",  label: "Launch Checklist", badge: null },
  { href: "/dashboard/seo",       icon: "↗",  label: "SEO Analyzer",     badge: "New" },
  { href: "/dashboard/icp",       icon: "⊙",  label: "ICP Builder",      badge: "New" },
  { href: "/dashboard/brand",     icon: "◈",  label: "Brand Voice",      badge: "New" },
  { href: "/dashboard/presskit",  icon: "◎",  label: "Press Kit",        badge: null },
  { href: "/dashboard/calendar",  icon: "⊞",  label: "Content Calendar", badge: null },
  { href: "/dashboard/analytics", icon: "⚡", label: "Analytics Hub",    badge: null },
];

const SOON = [
  { icon: "✉", label: "Email Drips" },
  { icon: "⊗", label: "Competitor Intel" },
];

// Inline logo mark — no next/image needed, works everywhere
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <div
      className="bg-[#B8FF2E] rounded-lg flex items-center justify-center font-display font-black text-[#060606] flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      P
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const handleSignOut = async () => {
    // Lazy init — only runs on the client when the user clicks, never during SSR
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#E8E8E8] flex flex-col">

      {/* ── TOPBAR ── */}
      <header className="h-14 bg-[#070707] border-b border-[#1C1C1C] flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" aria-label="Back to homepage">
            <LogoMark size={28} />
            <span className="font-display font-bold text-sm text-[#CCC]">Propel</span>
          </Link>
          <span className="w-px h-4 bg-[#1C1C1C]" />
          <span className="text-xs text-[#333]">My Workspace</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-[#B8FF2E]/10 border border-[#B8FF2E]/20 rounded-md px-3 py-1 text-[11px] text-[#B8FF2E] font-semibold">
            Starter Plan
          </span>
          <Link
            href="/#pricing"
            className="text-xs text-[#B8FF2E] hover:opacity-80 transition-opacity font-semibold"
          >
            Upgrade →
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs text-[#333] hover:text-[#505050] transition-colors cursor-pointer bg-transparent border-0"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ── */}
        <aside
          className="w-56 bg-[#070707] border-r border-[#1C1C1C] p-3 flex-shrink-0 overflow-y-auto"
          style={{ height: "calc(100vh - 3.5rem)", position: "sticky", top: "3.5rem" }}
          aria-label="Dashboard navigation"
        >
          <p className="text-[9.5px] text-[#222] uppercase tracking-[1.8px] font-semibold mb-3 pl-2.5">
            Marketing Tools
          </p>

          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 text-[13.5px] transition-all ${
                  active
                    ? "bg-[#B8FF2E]/10 text-[#B8FF2E] font-semibold"
                    : "text-[#404040] hover:text-[#666] hover:bg-[#0D0D0D]"
                }`}
              >
                <span className="text-xs flex-shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[8.5px] font-bold bg-[#B8FF2E]/15 text-[#B8FF2E] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="border-t border-[#1C1C1C] my-4" />

          <p className="text-[9.5px] text-[#222] uppercase tracking-[1.8px] font-semibold mb-3 pl-2.5">
            Coming Soon
          </p>
          {SOON.map(item => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-3 py-2.5 text-[#222] text-[13.5px] cursor-not-allowed"
            >
              <span className="text-xs">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <span className="text-[8.5px] font-bold text-[#1E1E1E]">SOON</span>
            </div>
          ))}

          {/* Upgrade card */}
          <div className="mt-4 bg-[#B8FF2E]/[0.06] border border-[#B8FF2E]/15 rounded-xl p-4">
            <p className="text-xs font-bold text-[#B8FF2E] mb-1.5">Upgrade to Builder</p>
            <p className="text-[11.5px] text-[#404040] leading-relaxed mb-3">
              Unlimited AI + all tools for $29/mo
            </p>
            <Link
              href="/#pricing"
              className="block w-full text-center py-2 bg-[#B8FF2E] text-[#060606] rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Upgrade →
            </Link>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-9 max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
