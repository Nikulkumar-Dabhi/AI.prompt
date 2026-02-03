export default function BrowseLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-8 w-48 bg-ink-200 rounded mb-2" />
      <div className="h-4 w-96 bg-ink-100 rounded mb-8" />
      <div className="flex gap-8">
        <div className="w-56 space-y-4">
          <div className="h-4 w-20 bg-ink-100 rounded" />
          <div className="h-8 bg-ink-100 rounded" />
          <div className="h-8 bg-ink-100 rounded" />
        </div>
        <div className="flex-1 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-ink-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
