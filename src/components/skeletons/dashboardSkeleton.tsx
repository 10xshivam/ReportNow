

export default function DashboardSkeleton() {
  return (
    <div className="flex items-center w-full min-h-screen flex-col py-24 animate-pulse">
  <div className="flex w-full justify-between px-20">
    <div className="flex gap-x-5">
      <div className="h-10 bg-white/20 rounded w-60">
      </div>
      <div className="h-10 bg-white/20 rounded w-60">
      </div>
    </div>
    <div className="flex justify-center items-center gap-4">
      <p className="h-6 bg-white/20 rounded w-20">
      </p>
      <div className="h-10 bg-white/20 rounded w-32">
      </div>
    </div>
  </div>
  <div className="flex w-full px-20 py-10 gap-4">
    <div className="flex flex-col w-full border-2 border-white/10 p-6 rounded-xl space-y-5 bg-white/5">
      <div className="flex justify-between items-center">
        <div className="flex  items-center gap-4">
          <span className="h-6 bg-white/20 rounded w-32">
          </span>
          <span className="h-6 bg-white/20 rounded w-32">
          </span>
        </div>
        <div className="h-10 bg-white/20 rounded w-60">
        </div>
      </div>
      <p className="h-6 bg-white/20 rounded w-full">
      </p>
      <div className="flex gap-5 text-white/30 tracking-tight text-base">
        <span className="h-6 bg-white/20 rounded w-32"></span>
        <span className="h-6 bg-white/20 rounded w-32"></span>
        <span className="h-6 bg-white/20 rounded w-32"></span>
      </div>
      <span className="h-40 bg-white/20 rounded w-full"></span>
    </div>
  </div>
</div>
  )
}
