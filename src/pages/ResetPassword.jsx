import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token") || "", [params]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!token) {
      setError("Missing reset token.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, newPassword });
      setStatus("Password reset successful. You can now login.");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Reset link is invalid or expired.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-surface-container-highest/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
        <h1 className="font-headline text-3xl font-black tracking-tighter mb-2">
          Set New Password
        </h1>
        <p className="text-on-surface-variant text-sm mb-6">
          Choose a strong password (min 8 characters).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              required
              className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-outline ml-1">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
              className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-surface-variant focus:ring-0"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full kinetic-gradient py-4 rounded-lg text-on-primary font-headline font-black tracking-tight disabled:opacity-50"
          >
            {loading ? "Saving…" : "Reset password"}
          </button>
        </form>

        {error && <p className="text-error text-sm mt-4">{error}</p>}
        {status && <p className="text-on-surface-variant text-sm mt-4">{status}</p>}

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

