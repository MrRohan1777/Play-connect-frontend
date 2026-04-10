export const GAME_STATUS_LABEL = {
  ACTIVE: "ACTIVE",
  YOU_JOINED: "YOU JOINED",
  REMOVED: "REMOVED",
  CANCELLED: "CANCELLED",
};

export const GAME_STATUS_STYLES = {
  ACTIVE:
    "border-emerald-500/50 bg-emerald-500/15 text-emerald-400 shadow-sm shadow-emerald-900/20",
  YOU_JOINED:
    "border-blue-500/50 bg-blue-500/15 text-blue-400 shadow-sm shadow-blue-900/20",
  REMOVED:
    "border-red-500/50 bg-red-500/15 text-red-400 shadow-sm shadow-red-900/20",
  CANCELLED:
    "border-slate-500/40 bg-slate-600/20 text-slate-400 shadow-sm shadow-black/20",
};

function normalizeStatusRaw(raw) {
  const s = String(raw ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");
  if (!s) return null;
  if (s === "ACTIVE" || s === "OPEN" || s === "LIVE") return "ACTIVE";
  if (s === "COMPLETED" || s === "FINISHED" || s === "DONE") return "ACTIVE";
  if (
    s === "YOU_JOINED" ||
    s === "JOINED" ||
    s === "PARTICIPATING" ||
    s === "ACCEPTED"
  ) {
    return "YOU_JOINED";
  }
  if (s === "REMOVED" || s === "LEFT" || s === "KICKED") return "REMOVED";
  if (
    s === "CANCELLED" ||
    s === "CANCELED" ||
    s.startsWith("CANCELLED_") ||
    s.startsWith("CANCELED_")
  ) {
    return "CANCELLED";
  }
  return null;
}

function firstNormalized(game, keys) {
  for (const k of keys) {
    const n = normalizeStatusRaw(game[k]);
    if (n) return n;
  }
  return null;
}

/**
 * @param {object} game
 * @param {"hosted" | "joined" | undefined} listContext
 */
export function resolveGameStatusKey(game, listContext) {
  const participation = firstNormalized(game, [
    "participationStatus",
    "participation_status",
    "userParticipationStatus",
    "user_participation_status",
    "joinStatus",
    "join_status",
    "participantStatus",
    "participant_status",
  ]);

  const gameLevel = firstNormalized(game, [
    "status",
    "gameStatus",
    "game_status",
  ]);

  if (listContext === "joined") {
    if (gameLevel === "CANCELLED") return "CANCELLED";
    if (participation === "REMOVED") return "REMOVED";
    if (participation === "YOU_JOINED" || participation === "ACTIVE") {
      return "YOU_JOINED";
    }
    if (gameLevel === "ACTIVE" || !gameLevel) return "YOU_JOINED";
    return gameLevel;
  }

  if (listContext === "hosted") {
    if (gameLevel === "CANCELLED") return "CANCELLED";
    if (gameLevel === "REMOVED") return "REMOVED";
    if (gameLevel === "ACTIVE" || !gameLevel) return "ACTIVE";
    return gameLevel === "YOU_JOINED" ? "ACTIVE" : gameLevel;
  }

  if (gameLevel === "CANCELLED") return "CANCELLED";
  if (gameLevel === "ACTIVE") return "ACTIVE";
  return null;
}
