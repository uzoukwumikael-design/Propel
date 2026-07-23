"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#060606] flex flex-col items-center justify-center text-center px-6">
      <div className="w-14 h-14 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-2xl flex items-center justify-center text-2xl mb-7">
        ⚠
      </div>
      <h2 className="font-display font-black text-[28px] tracking-tight text-[#E8E8E8] mb-3">
        Something went wrong.
      </h2>
      <p className="text-[#505050] text-sm max-w-sm leading-relaxed mb-7">
        An unexpected error occurred. Our team has been notified — try again or head back home.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-[#B8FF2E] text-[#060606] font-bold px-5 py-2.5 rounded-xl text-sm border-0 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Try again
        </button>
        <a
          href="/"
          className="bg-transparent text-[#505050] px-5 py-2.5 border border-[#1C1C1C] rounded-xl text-sm hover:border-[#505050] transition-colors"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
