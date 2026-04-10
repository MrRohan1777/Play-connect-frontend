import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ children, showBottomNav = false }) {

  return (
    <div className="min-h-screen bg-background font-body text-on-surface selection:bg-primary selection:text-on-primary overflow-x-hidden">
      <style>
        {`
          .kinetic-gradient {
            background: linear-gradient(135deg, #75ff9e 0%, #00e676 100%);
          }
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}
      </style>

      <Navbar />

      <div className="pt-16">
        <div className={`p-6 ${showBottomNav ? "pb-28" : ""}`}>
          {children}
        </div>
      </div>

      {showBottomNav && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-6 bg-[#0c1322]/80 backdrop-blur-xl rounded-t-lg shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
          <Link
            className="flex flex-col items-center justify-center text-[#75ff9e] bg-[#191f2f] rounded-lg px-3 py-1 active:scale-90 transition-transform duration-200"
            to="/home"
          >
            <span className="material-symbols-outlined" data-icon="home">
              home
            </span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-widest">
              Home
            </span>
          </Link>

          <Link
            className="flex flex-col items-center justify-center text-slate-500 hover:text-[#75ff9e] transition-colors"
            to="/host"
          >
            <span className="material-symbols-outlined" data-icon="search">
              search
            </span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-widest">
              Explore
            </span>
          </Link>

          <Link className="flex flex-col items-center justify-center -mt-8" to="/host">
            <div className="w-14 h-14 kinetic-gradient rounded-full flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90 transition-transform duration-200 bg-gradient-to-r from-primary to-primary-container">
              <span className="material-symbols-outlined text-on-primary text-3xl">
                add_circle
              </span>
            </div>
            <span className="font-headline font-bold text-[10px] uppercase tracking-widest text-primary mt-1">
              Host
            </span>
          </Link>

          <Link
            className="flex flex-col items-center justify-center text-slate-500 hover:text-[#75ff9e] transition-colors"
            to="/my-games"
          >
            <span className="material-symbols-outlined" data-icon="sports_kabaddi">
              sports_kabaddi
            </span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-widest">
              My Games
            </span>
          </Link>

          <Link
            className="flex flex-col items-center justify-center text-slate-500 hover:text-[#75ff9e] transition-colors"
            to="/my-games"
          >
            <span className="material-symbols-outlined" data-icon="person">
              person
            </span>
            <span className="font-headline font-bold text-[10px] uppercase tracking-widest">
              Profile
            </span>
          </Link>
        </nav>
      )}

    </div>
  );
}