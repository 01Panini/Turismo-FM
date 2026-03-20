export default function AdminLoading() {
  return (
    <div className="flex flex-col space-y-4 w-full animate-pulse">
      <div className="h-40 bg-zinc-800/50 rounded-xl w-full border border-white/5" />
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-zinc-800/50 rounded-md w-48" />
        <div className="h-10 bg-zinc-800/50 rounded-md w-32" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
           <div key={i} className="h-16 bg-zinc-800/50 rounded-xl w-full border border-white/5" />
        ))}
      </div>
    </div>
  );
}
