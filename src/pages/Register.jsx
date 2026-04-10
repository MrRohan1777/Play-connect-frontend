import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const HERO_IMAGES = {
  cricket:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGtBSEsrV8CoQhwup-soCTZ1Fwpu3U9LJAF2G1alPy2BxbRFZdUUTd82-EVBa0oTrMXt3xtjqPbZGjq_ZXb4QmSmhaExEzMwftRb_1B4Uh7YHhaIkt_4k330Ld81Dy84J2UhZNCqm5pcaMuVBAVEvR1tcracKsQZfE000NgCl0LMZNXwBEMyyq0C-FqZpdBJblrFRR-KFfTn90wWG_p1KH4UlQK7NvELSE0ypSlfoobkzK76b7xMq1gN-siSrngMWz4BjdANScwzuG",
  soccer:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDnL8wkN1MFiuYivR2QRFh7bZ1rAaM8UYDJPOYCY56gdW1JkhY2A6aJomyfJ7Qzh5KgLO8Kyaj2JU3VgxNVDn232AsjlQQTTFJYwrj4gzNtWXAsLg7iFVdTuWv78C69MoDAAz4LBurrLwsZl3DjVUDi9OeMziRWOZArAPRnqQgv1FlR7Zj6Tn8YtaVZLN0AK8Lt2EDISROxvLlI8Hywk--ZRq6F8f97Y8UH6CnrxckaglKd4sjngphWl_BDpur7OYBHhzYif6-18oe7",
  badminton:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDlz6qcKYCiWcXZqC5zxuK3ctKqiVIWYTyrpPviL2Lwp3jtyNmQh0DnaYycWx-NCpdtWeR08fX88FWHkwq-EOZasR4WA9gmwDaP0-0k1ajMGa_9gwYawqrpaZm43x2M-PlBI1CKOou6_skykqy9Ca3hHXWyl_4aC9uA8BSQzZJvXXSgKxGRzrixSJcWXhBYA8TiGk4GNvBNtMR--1bfi5fsy7I0-QuVUo0MF29RmeucU85clGX9argqFs2Trpm73HGv5v-mh245jWUP",
};

const SPORT_CHIPS = [
  { id: "CRICKET", label: "Cricket", icon: "sports_cricket" },
  { id: "FOOTBALL", label: "Football", icon: "sports_soccer" },
  { id: "BADMINTON", label: "Badminton", icon: "badminton" },
  { id: "TENNIS", label: "Tennis", icon: "sports_tennis" },
  { id: "BASKETBALL", label: "Basketball", icon: "sports_basketball" },
];

export default function Register() {
  const navigate = useNavigate();
  const registrationBg = "/images/registration-bg.png";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skillLevel: "BEGINNER",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favoriteSport, setFavoriteSport] = useState("CRICKET");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary selection:text-on-primary min-h-screen overflow-x-hidden">
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

      <header className="fixed top-0 w-full z-50 bg-[#0c1322] flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#75ff9e] text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            sports_score
          </span>
          <span className="font-headline font-black italic tracking-tighter text-[#75ff9e] text-2xl">
            PLAYCONNECT
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
          <Link
            className="text-[#75ff9e] hover:bg-[#232a3a] px-3 py-1 rounded transition-colors duration-200"
            to="/register"
          >
            JOIN
          </Link>
          <Link
            className="text-slate-400 hover:bg-[#232a3a] px-3 py-1 rounded transition-colors duration-200"
            to="/home"
          >
            ARENA
          </Link>
          <Link
            className="text-slate-400 hover:bg-[#232a3a] px-3 py-1 rounded transition-colors duration-200"
            to="/my-games"
          >
            LIVE
          </Link>
        </div>
      </header>

      <main className="min-h-screen pt-16 flex flex-col md:flex-row relative overflow-hidden">
        {/* Left: hero collage (UI Teamplates/Registration/code.html) */}
        <section className="hidden lg:block lg:w-1/2 relative h-full min-h-[calc(100vh-4rem)]">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2 p-4">
            <div className="relative overflow-hidden rounded-xl row-span-2">
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                src={HERO_IMAGES.cricket}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                src={HERO_IMAGES.soccer}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-transparent opacity-60" />
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                src={HERO_IMAGES.badminton}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface opacity-80" />
            </div>
          </div>
          <div className="absolute bottom-12 left-12 z-10">
            <h2 className="font-headline text-7xl font-extrabold tracking-tighter text-on-surface leading-none">
              ENGINEERED <br /> FOR{" "}
              <span className="text-primary italic">PERFORMANCE.</span>
            </h2>
            <div className="mt-6 flex gap-4">
              <div className="bg-primary/10 border-l-4 border-primary px-4 py-2">
                <p className="text-xs font-headline font-bold uppercase tracking-widest text-primary">
                  Live Stats
                </p>
                <p className="text-2xl font-headline font-black">12.4K+</p>
              </div>
              <div className="bg-primary/10 border-l-4 border-primary px-4 py-2">
                <p className="text-xs font-headline font-bold uppercase tracking-widest text-primary">
                  Active Arenas
                </p>
                <p className="text-2xl font-headline font-black">850</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right: form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-surface relative">
          <div className="lg:hidden absolute inset-0 z-0">
            <img
              alt=""
              className="w-full h-full object-cover opacity-20"
              src={registrationBg}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface" />
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="mb-10">
              <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface mb-2">
                CREATE ATHLETE PROFILE
              </h1>
              <p className="text-on-surface-variant font-medium">
                Join the next generation of kinetic performance tracking.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
                  Full Name
                </label>
                <div className="group relative">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0 peer"
                    placeholder="TYSON FURY"
                    type="text"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
                  Athlete Email
                </label>
                <div className="group relative">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0 peer"
                    placeholder="athlete@playconnect.com"
                    type="email"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
                  Select Favorite Sports
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPORT_CHIPS.map((s) => {
                    const active = favoriteSport === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFavoriteSport(s.id)}
                        className={`group flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                          active
                            ? "bg-primary text-on-primary-fixed"
                            : "bg-surface-container-highest hover:bg-surface-variant text-on-surface"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={
                            active
                              ? { fontVariationSettings: "'FILL' 1" }
                              : undefined
                          }
                        >
                          {s.icon}
                        </span>
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
                  Skill Level
                </label>
                <select
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface focus:ring-0"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
                    Security Key
                  </label>
                  <div className="group relative">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0 peer"
                      placeholder="••••••••"
                      type="password"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
                    Confirm Key
                  </label>
                  <div className="group relative">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0 peer"
                      placeholder="••••••••"
                      type="password"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 peer-focus:w-full" />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-error text-sm font-medium">{error}</p>
              )}

              <div className="pt-4">
                <button
                  className="w-full kinetic-gradient py-5 rounded-lg flex items-center justify-center gap-2 group transition-transform active:scale-95 shadow-2xl shadow-primary/20 disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  <span className="text-on-primary font-headline font-black text-lg tracking-tight">
                    {loading ? "Creating profile…" : "START YOUR JOURNEY ⚡"}
                  </span>
                </button>
              </div>

              <div className="text-center pt-4">
                <p className="text-on-surface-variant text-sm font-medium">
                  Already have an account?{" "}
                  <Link
                    className="text-primary hover:underline underline-offset-4 ml-1"
                    to="/login"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c1322] w-full py-8 border-t border-[#3b4a3d]/15">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 max-w-7xl mx-auto gap-4">
          <span className="font-body text-xs uppercase tracking-widest text-slate-500">
            © 2024 PLAYCONNECT KINETIC
          </span>
          <div className="flex gap-8">
            <a
              className="font-body text-xs uppercase tracking-widest text-slate-500 hover:text-[#75ff9e] transition-all opacity-80 hover:opacity-100"
              href="#"
            >
              Terms of Play
            </a>
            <a
              className="font-body text-xs uppercase tracking-widest text-slate-500 hover:text-[#75ff9e] transition-all opacity-80 hover:opacity-100"
              href="#"
            >
              Privacy Arena
            </a>
            <a
              className="font-body text-xs uppercase tracking-widest text-slate-500 hover:text-[#75ff9e] transition-all opacity-80 hover:opacity-100"
              href="#"
            >
              Pro Scout Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
