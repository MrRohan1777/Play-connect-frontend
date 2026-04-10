import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import {
  cancelHostedGame,
  getUserHostedGames,
  getUserJoinedGames,
} from "../api/gamesApi";
import {
  getParticipationIdForGame,
  leaveGame,
  removeParticipationIdForGame,
} from "../api/participationApi";
import { getApiErrorMessage } from "../utils/apiError";

function extractGameEntries(res) {
  const d = res?.data?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.games)) return d.games;
  if (Array.isArray(res?.data?.games)) return res.data.games;
  return [];
}

/**
 * Backend returns either `{ game, status, ... }` or a flat game object.
 */
function entryToCardGame(entry) {
  if (!entry || typeof entry !== "object") return null;

  const inner = entry.game;
  if (inner && typeof inner === "object") {
    return normalizeGameForCard({
      ...inner,
      participationStatus: entry.status,
      participationId:
        entry.participationId ??
        entry.participation_id ??
        entry.gameParticipationId ??
        entry.game_participation_id,
      host: entry.host,
      playersCount: entry.playersCount,
      reason: entry.reason,
    });
  }

  return normalizeGameForCard(entry);
}

function normalizeGameForCard(game) {
  if (!game || typeof game !== "object") return null;
  return {
    ...game,
    distance:
      game.distance ??
      game.distanceKm ??
      game.distance_km ??
      "—",
    remainingSpots:
      game.remainingSpots ?? game.remaining_spots ?? game.spotsLeft ?? 0,
  };
}

function canShowLeaveForJoined(game) {
  const p = String(game.participationStatus ?? "").trim().toUpperCase();
  // Show leave only when participation is currently active/joined.
  // If backend returns LEFT/REMOVED/CANCELLED/etc, hide the button.
  const canLeaveStatuses = new Set([
    "ACTIVE",
  ]);
  if (!canLeaveStatuses.has(p)) return false;
  if (String(game.status ?? "").toUpperCase() === "CANCELLED") return false;
  return true;
}

function canShowCancelForHosted(game) {
  return String(game.status ?? "").toUpperCase() !== "CANCELLED";
}

function promptRequiredReason(title) {
  const reason = window.prompt(
    `${title}\n\nEnter a reason (required):`,
    ""
  );
  if (reason === null) return null;
  const trimmed = reason.trim();
  if (!trimmed) {
    alert("Please enter a reason.");
    return null;
  }
  return trimmed;
}

export default function MyGames() {
  const [hosted, setHosted] = useState([]);
  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  const refreshLists = useCallback(async () => {
    const uid = localStorage.getItem("userId");
    if (!uid) return;
    const [hostedRes, joinedRes] = await Promise.all([
      getUserHostedGames(uid),
      getUserJoinedGames(uid),
    ]);
    setHosted(
      extractGameEntries(hostedRes).map(entryToCardGame).filter(Boolean)
    );
    setJoined(
      extractGameEntries(joinedRes).map(entryToCardGame).filter(Boolean)
    );
  }, []);

  useEffect(() => {
    if (!userId) {
      setError("Missing user id. Please log in again.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setError("");
      try {
        await refreshLists();
        if (cancelled) return;
      } catch (e) {
        if (!cancelled) {
          setError(
            e?.response?.data?.message || "Could not load your games."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId, refreshLists]);

  const handleLeaveGame = async (game) => {
    const pid =
      game.participationId ?? getParticipationIdForGame(game.id);
    if (!pid) {
      alert(
        "Could not find participation id for this game. Try leaving from the game you joined in this browser, or ask the backend to include participationId in joined-games responses."
      );
      return;
    }
    const reason = promptRequiredReason("Leave this game");
    if (reason === null) return;
    if (!window.confirm("Leave this game?")) return;
    try {
      await leaveGame(pid, { reason });
      removeParticipationIdForGame(game.id);
      alert("You left the game.");
      await refreshLists();
    } catch (e) {
      console.error("leaveGame", pid, e?.response?.status, e?.response?.data);
      alert(getApiErrorMessage(e, "Could not leave the game."));
    }
  };

  const handleCancelHostedGame = async (game) => {
    const reason = promptRequiredReason("Cancel hosted game");
    if (reason === null) return;
    if (!window.confirm("Cancel this hosted game for all players?")) return;
    try {
      await cancelHostedGame(game.id, { reason });
      alert("Game cancelled.");
      await refreshLists();
    } catch (e) {
      console.error("cancelGame", game.id, e?.response?.status, e?.response?.data);
      alert(getApiErrorMessage(e, "Could not cancel the game."));
    }
  };

  return (
    <Layout showBottomNav={true}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-headline font-black italic tracking-tighter text-primary mb-2">
          My Games
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          Games you host and games you have joined.
        </p>

        {loading && (
          <p className="text-on-surface-variant">Loading your games…</p>
        )}

        {error && !loading && (
          <p className="text-red-500 text-sm mb-6">{error}</p>
        )}

        {!loading && !error && (
          <>
            <section className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Hosted
              </h2>
              {hosted.length === 0 ? (
                <p className="text-on-surface-variant text-sm">
                  You are not hosting any games yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {hosted.map((game) => (
                    <GameCard
                      key={`hosted-${game.id}`}
                      game={game}
                      listContext="hosted"
                      hideJoinButton
                      onJoin={() => {}}
                      secondaryAction={
                        canShowCancelForHosted(game)
                          ? {
                              label: "Cancel game",
                              onClick: () => handleCancelHostedGame(game),
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                Joined
              </h2>
              {joined.length === 0 ? (
                <p className="text-on-surface-variant text-sm">
                  You have not joined any games yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {joined.map((game) => (
                    <GameCard
                      key={`joined-${game.id}`}
                      game={game}
                      listContext="joined"
                      hideJoinButton
                      onJoin={() => {}}
                      secondaryAction={
                        canShowLeaveForJoined(game)
                          ? {
                              label: "Leave game",
                              onClick: () => handleLeaveGame(game),
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
