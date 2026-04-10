import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await forgotPassword({ email });
      setStatus("If the email exists, a reset link has been sent.");
    } catch {
      // Keep same message to avoid user enumeration
      setStatus("If the email exists, a reset link has been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-surface-container-highest/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <h1 className="font-headline text-3xl font-black tracking-tighter mb-2">
          Reset Password
        </h1>
        <p className="text-on-surface-variant text-sm mb-6">
          Enter your email and we’ll send a link to set a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0"
              placeholder="athlete@playconnect.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full kinetic-gradient py-4 rounded-lg text-on-primary font-headline font-black tracking-tight disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>

        {status && (
          <p className="text-on-surface-variant text-sm mt-4">{status}</p>
        )}

        <div className="mt-8 text-sm text-on-surface-variant">
          Back to{" "}
          <Link className="text-primary font-bold underline underline-offset-4" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

