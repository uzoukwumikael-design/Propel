"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

// ── Inner component (needs Suspense because of useSearchParams) ──────────────
function AuthContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(
    params.get("mode") === "signup" ? "signup" : "login"
  );
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const supabase = createClient();

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) setError(error.message);
      else setSuccess("Check your email to confirm your account, then sign in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard/copy");
    }
    setLoading(false);
  };

  const inp =
    "w-full px-4 py-3 bg-[#0D0D0D] border border-[#1C1C1C] rounded-lg text-[#E8E8E8] text-sm outline-none focus:border-[#2A2A2A] transition-colors font-sans";

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-9 h-9 bg-[#B8FF2E] rounded-xl flex items-center justify-center font-display font-black text-base text-[#060606]">
            P
          </div>
          <span className="font-display font-bold text-base text-[#E8E8E8]">Propel</span>
        </Link>

        <div className="bg-[#0D0D0D] border border-[#1C1C1C] rounded-2xl p-8">
          {/* Mode toggle */}
          <div className="flex gap-1 bg-[#060606] border border-[#1C1C1C] rounded-lg p-1 mb-7">
            {(["login", "signup"] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); setSuccess(""); }}
                className="flex-1 py-2 rounded-md text-sm font-medium transition-all capitalize cursor-pointer border-0"
                style={{
                  background: mode === m ? "#B8FF2E" : "transparent",
                  color: mode === m ? "#060606" : "#505050",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {m === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <h1 className="font-display font-bold text-xl tracking-tight text-[#E8E8E8] mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-[#505050] mb-7">
            {mode === "login"
              ? "Sign in to your Propel workspace."
              : "Start launching smarter. Free forever — no card needed."}
          </p>

          <div className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs text-[#505050] font-semibold tracking-wide block mb-2">
                  FULL NAME
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={inp}
                />
              </div>
            )}
            <div>
              <label className="text-xs text-[#505050] font-semibold tracking-wide block mb-2">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@startup.com"
                className={inp}
              />
            </div>
            <div>
              <label className="text-xs text-[#505050] font-semibold tracking-wide block mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inp}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {error   && <p className="text-xs text-red-400 mt-4">{error}</p>}
          {success && <p className="text-xs text-[#B8FF2E] mt-4">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            className="w-full mt-6 py-3.5 rounded-xl font-bold text-sm border-0 transition-opacity cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: email && password ? "#B8FF2E" : "#141414",
              color: email && password ? "#060606" : "#444",
              opacity: loading ? 0.7 : 1,
              fontFamily: "var(--font-sans)",
            }}
          >
            {loading ? "…" : mode === "login" ? "Sign in →" : "Create free account →"}
          </button>

          {mode === "login" && (
            <p className="text-center text-xs text-[#505050]/50 mt-4">
              <a href="#" className="hover:text-[#505050] transition-colors">
                Forgot your password?
              </a>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-[#505050]/40 mt-5">
          By signing up you agree to our{" "}
          <a href="/terms" className="hover:text-[#505050] transition-colors underline">Terms</a>{" "}
          and{" "}
          <a href="/privacy" className="hover:text-[#505050] transition-colors underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

// ── Suspense wrapper required for useSearchParams in Next.js 14 App Router ───
export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060606] flex items-center justify-center">
          <div className="w-8 h-8 bg-[#B8FF2E] rounded-xl animate-pulse" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
