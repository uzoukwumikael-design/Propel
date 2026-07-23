export default function Loading() {
  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#B8FF2E] rounded-lg animate-pulse" />
        <span className="font-display font-bold text-sm text-[#E8E8E8] animate-pulse">Loading…</span>
      </div>
    </div>
  );
}
