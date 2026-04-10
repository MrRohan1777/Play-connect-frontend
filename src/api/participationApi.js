import axiosClient from "./axiosClient";

export const joinGame = (gameId, payload) => {

  return axiosClient.post(
    `/join/${gameId}`,
    payload
  );

};

export const leaveGame = (participationId, body) => {
  return axiosClient.patch(`/games/leaveGame/${participationId}`, body);
};

const PARTICIPATION_BY_GAME_ID_KEY = "participationByGameId";

export function saveParticipationIdForGame(gameId, participationId) {
  if (!gameId || !participationId) return;
  try {
    const raw = localStorage.getItem(PARTICIPATION_BY_GAME_ID_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[String(gameId)] = participationId;
    localStorage.setItem(PARTICIPATION_BY_GAME_ID_KEY, JSON.stringify(map));
  } catch {
    // ignore storage errors (private mode / quota / invalid JSON)
  }
}

export function getParticipationIdForGame(gameId) {
  if (!gameId) return null;
  try {
    const raw = localStorage.getItem(PARTICIPATION_BY_GAME_ID_KEY);
    const map = raw ? JSON.parse(raw) : {};
    return map[String(gameId)] ?? null;
  } catch {
    return null;
  }
}

export function removeParticipationIdForGame(gameId) {
  if (!gameId) return;
  try {
    const raw = localStorage.getItem(PARTICIPATION_BY_GAME_ID_KEY);
    const map = raw ? JSON.parse(raw) : {};
    delete map[String(gameId)];
    localStorage.setItem(PARTICIPATION_BY_GAME_ID_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function extractParticipationId(joinResponse) {
  const d = joinResponse?.data;
  return (
    // New backend shape (common): { participationId: 123 }
    d?.data?.participationId ??
    d?.participationId ??
    d?.data?.participation?.id ??
    d?.data?.id ??
    null
  );
}