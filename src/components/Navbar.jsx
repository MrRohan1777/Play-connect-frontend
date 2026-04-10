import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0c1322]/90 backdrop-blur-md flex items-center justify-between px-6 h-16 border-b border-white/5">
      <div className="flex items-center gap-2">
        <span
          className="material-symbols-outlined text-[#75ff9e] text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          sports_score
        </span>
        <h1 className="text-2xl font-black tracking-tighter text-[#75ff9e] uppercase font-headline">
          PLAYCONNECT
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
        <Link
          to="/home"
          className="text-[#75ff9e] hover:bg-[#232a3a] px-3 py-1 rounded transition-colors duration-200"
        >
          JOIN
        </Link>
        <Link
          to="/host"
          className="text-slate-400 hover:bg-[#232a3a] px-3 py-1 rounded transition-colors duration-200"
        >
          ARENA
        </Link>
        <Link
          to="/my-games"
          className="text-slate-400 hover:bg-[#232a3a] px-3 py-1 rounded transition-colors duration-200"
        >
          LIVE
        </Link>
      </nav>
    </header>
  );
}