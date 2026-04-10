/**
 * Pull a readable message from axios error responses (Spring, etc.).
 */
export function getApiErrorMessage(error, fallback) {
  const d = error?.response?.data;
  if (typeof d === "string" && d.trim()) return d.trim();
  if (d?.message) return String(d.message);
  if (typeof d?.error === "string") return d.error;
  if (d?.error?.message) return String(d.error.message);
  if (d?.detail) return String(d.detail);

  const status = error?.response?.status;
  if (status === 404) {
    return "Not found (404). Check the URL path matches your backend (e.g. /games/leaveGame/... and /games/cancelGame/...).";
  }
  if (status === 405) {
    return "Server rejected the request method (405). Check that the HTTP method matches your API (e.g. PATCH vs POST).";
  }
  if (status === 401 || status === 403) {
    return "Not authorized. Log in again or check your token.";
  }
  if (status) {
    return `${fallback} (HTTP ${status}).`;
  }
  if (error?.message) return error.message;
  return fallback;
}
