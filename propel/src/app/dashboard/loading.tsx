export default function DashboardLoading() {
  return (
    <div className="p-9 max-w-5xl animate-pulse">
      {/* Title skeleton */}
      <div className="mb-7">
        <div className="h-6 w-48 bg-[#1C1C1C] rounded-lg mb-2" />
        <div className="h-4 w-72 bg-[#1C1C1C] rounded-lg" />
      </div>

      {/* Two-column content skeleton */}
      <div className="grid grid-cols-2 gap-7">
        <div className="space-y-4">
          <div className="h-4 w-32 bg-[#1C1C1C] rounded" />
          <div className="h-28 bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl" />
          <div className="h-4 w-32 bg-[#1C1C1C] rounded" />
          <div className="h-11 bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-11 bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl" />
            <div className="h-11 bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl" />
          </div>
          <div className="h-12 bg-[#141414] rounded-xl" />
        </div>
        <div className="space-y-3">
          <div className="h-4 w-24 bg-[#1C1C1C] rounded" />
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-[#0D0D0D] border border-[#1C1C1C] rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
