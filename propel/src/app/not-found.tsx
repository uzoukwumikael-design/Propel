import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060606] flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 bg-[#B8FF2E] rounded-2xl flex items-center justify-center font-display font-black text-2xl text-[#060606] mb-8">
        P
      </div>
      <p className="text-[#505050] text-xs uppercase tracking-widest font-semibold mb-4">404</p>
      <h1 className="font-display font-black text-[40px] tracking-tight text-[#E8E8E8] mb-4">
        Page not found.
      </h1>
      <p className="text-[#505050] text-[15px] max-w-sm leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link href="/"
          className="bg-[#B8FF2E] text-[#060606] font-bold px-6 py-3 rounded-xl text-sm border-0 hover:opacity-90 transition-opacity">
          ← Back to home
        </Link>
        <Link href="/dashboard/copy"
          className="bg-transparent text-[#505050] px-6 py-3 border border-[#1C1C1C] rounded-xl text-sm hover:border-[#505050] transition-colors">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
