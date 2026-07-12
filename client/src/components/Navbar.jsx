export default function Navbar() {
  const time = new Date().toLocaleTimeString();

  return (
    <div className="flex items-center justify-between mb-10">

      <div>
        <h1 className="text-5xl font-black text-white">
          API Guardian AI
        </h1>

        <p className="text-slate-400 mt-2">
          AI-powered API Monitoring
        </p>
      </div>

      <div className="text-right">

        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-4 py-2 rounded-full font-semibold">

          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>

          LIVE

        </div>

        <p className="text-slate-400 mt-3 text-sm">
          Last Updated
        </p>

        <p className="text-white font-semibold">
          {time}
        </p>

      </div>

    </div>
  );
}