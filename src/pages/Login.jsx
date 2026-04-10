import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ email, password });
      const token = res.data.data.token;
      const userId = res.data.data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      navigate("/home");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary overflow-x-hidden">
      <style>
        {`
          .athletic-mesh {
            background-image: radial-gradient(#191f2f 1px, transparent 1px);
            background-size: 20px 20px;
          }
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}
      </style>

      {/* Dynamic Sports Background Collage */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0">
        <div className="absolute inset-0 flex h-full w-full">
          {/* Football - Left */}
          <div className="relative flex-1 h-full overflow-hidden">
            <img
              alt="Professional football player in action"
              className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB82Wqgcv9yp_S9qT0dK7B-We_XXi5OBAlQVTT038SUXCRgqPMj2MsVI1MJbpTvWVruP8ht3wwKOdQi_c2ijxQ4hm4osMSqd_iy-PqVQP7cU9Ck_zCtZrgkbjevdiDQ2m6PJ9I_RP8J8DzUtTcErT4oSGxOiC6leYhHhdSzUBuWTmwXXcMRMWOVhlPT1a9ecA8V8djRElxfUwy8_t4AvTfChiyg__uhpI9WRbVDEegOAQvhOc5fvt8jVCEwNByZdJX9g7FKZUrnyifY"
            />
            <div className="absolute inset-0 bg-surface/40" />
          </div>

          {/* Cricket - Center */}
          <div className="relative flex-1 h-full overflow-hidden -ml-20 skew-x-[-12deg] border-x border-primary/20 bg-surface shadow-2xl">
            <div className="h-full w-full skew-x-[12deg] scale-125">
              <img
                alt="Professional cricket batsman timing a shot"
                className="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM2zJ65sJGVPlauapvWm-Z0djhh8ErSEeOeBu5iCCWfSsPKb9HzvjTh-jOOBtPwC6usF7dj20L7uOtR3ifvABiPl0FIu7pA_wGOKuPryJ4Yw8zjK-cDntGLAhnb6JaaxVTNdJ7roNaJG1HXNtLfQPxiWb092DCmHgdwWfpeIU4IZFaSyJ0I7gm4PaP9N4dhu_0OO0XQUEvrRaVbs95LLKN4dN0cFl12K1Yjef16CWR9BXCYRRa1d2Q4vxbEjfuLmqjf-HqEosjTMPM"
              />
              <div className="absolute inset-0 bg-surface/30" />
            </div>
          </div>

          {/* Badminton - Right */}
          <div className="relative flex-1 h-full overflow-hidden -ml-20">
            <img
              alt="Professional badminton player performing a smash"
              className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu7oXeY0t1lxQjsFh41tJ8wBI2l6NZyToQ9aILGwDzF3tnaUixQ5zzBDqZvbi_RB-rbjk-BlxYsUjCcR9lnC0I3l0le_ifTon2NRmIqHHgFQ9PBu6YlY77EATSKcwpWf81mINLHUTKkzslWSndC_x8r7-bicrNxVCyV8p44XZhynSzEmkE09XoE9kbWngGAdmqRZy7PXGndieX0J1BwGcgbwWIpkTuM_rFhS-SGJ02PGfF1hr-9KZ8lguaGtLyBw_2Y_mBmW5K7Dod"
            />
            <div className="absolute inset-0 bg-surface/40" />
          </div>
        </div>
      </div>

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface z-[5]" />
      <div className="absolute inset-0 athletic-mesh opacity-30 z-[6]" />

      <div className="relative min-h-screen flex flex-col items-center z-10">
        <header className="fixed top-0 w-full bg-[#0c1322]/90 backdrop-blur-md flex items-center justify-between px-6 h-16 z-50 border-b border-white/5">
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
        </header>

        <main className="relative z-20 w-full max-w-md px-8 py-12 mt-24 mb-12">
          <div className="mb-10 text-left">
            <h2 className="text-5xl font-extrabold font-headline tracking-tighter leading-tight italic uppercase text-on-surface">
              Level <br />
              <span className="text-primary">Up Your</span> <br />
              Game.
            </h2>
            <p className="text-on-surface-variant mt-4 font-medium max-w-[280px]">
              Access your performance dashboard and connect with the elite roster.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                className="block text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] ml-1"
                htmlFor="email"
              >
                Athlete Email
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg py-4 px-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary transition-all duration-200"
                  id="email"
                  name="email"
                  placeholder="champion@playconnect.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label
                  className="block text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] ml-1"
                  htmlFor="password"
                >
                  Security Key
                </label>
                <button
                  type="button"
                  className="text-[0.7rem] font-bold text-primary uppercase tracking-wider hover:opacity-80 transition-opacity"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot?
                </button>
              </div>

              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest/80 backdrop-blur-md border-2 border-white/5 rounded-lg py-4 px-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary transition-all duration-200"
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              className="group relative w-full bg-primary text-on-primary font-black py-5 rounded-lg text-lg uppercase tracking-tighter flex items-center justify-center gap-3 active:scale-95 transition-all duration-150 overflow-hidden shadow-[0_0_20px_rgba(117,255,158,0.3)]"
              type="submit"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Join the Game</span>
              <span className="material-symbols-outlined relative z-10 text-2xl">
                bolt
              </span>
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-on-surface-variant text-sm font-medium">
              New to PlayConnect?{" "}
              <button
                type="button"
                className="text-on-surface font-bold underline decoration-primary underline-offset-4 ml-1 hover:text-primary transition-colors"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </p>
          </div>
        </main>

        <footer className="w-full py-8 bg-[#0c1322]/95 border-t border-white/5 mt-auto z-30">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4">
            <div className="text-[#75ff9e] text-xs font-bold uppercase tracking-widest">
              © 2024 PLAYCONNECT PERFORMANCE
            </div>
            <div className="flex gap-6">
              <a
                className="text-slate-500 hover:text-[#75ff9e] transition-all text-xs font-bold uppercase tracking-widest"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-slate-500 hover:text-[#75ff9e] transition-all text-xs font-bold uppercase tracking-widest"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}