import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Layout from "../components/Layout";
import { getGameScheduleDisplay } from "../utils/gameDateTime";
import JoinGameModal from "../components/JoinGameModal";
import { SPORT_META } from "../constants/sportMeta";
import {
  extractParticipationId,
  joinGame,
  saveParticipationIdForGame,
} from "../api/participationApi";

function intensityLabel(spots) {
  if (spots >= 8) return "Pro";
  if (spots >= 4) return "Medium";
  return "High";
}

function normalizeSportKey(input) {
  const raw = String(input ?? "")
    .trim()
    .toUpperCase()
    // keep letters/numbers/space/underscore so we can match common variants
    .replace(/[^\p{L}\p{N}_\s-]+/gu, "")
    .replace(/\s+/g, " ");

  if (!raw) return "";

  // Handle common backend/user typos and variants
  if (raw === "CRICET" || raw.includes("CRICKET")) return "CRICKET";

  // Convert spaces/hyphens to underscores for meta keys like "TABLE TENNIS" -> "TABLE_TENNIS"
  return raw.replace(/[\s-]+/g, "_");
}

export default function GameDetail() {
  const { gameId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialGame = location.state?.game;
  const [game] = useState(initialGame);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const valid =
    game &&
    String(game.id) === String(gameId);

  const sportKey = valid ? normalizeSportKey(game.sport) : "";
  const meta =
    valid && SPORT_META[sportKey]
      ? SPORT_META[sportKey]
      : valid
        ? { label: sportKey || "Sport", icon: "bolt", img: "" }
        : { label: "Game", icon: "bolt", img: "" };

  const spots = valid ? Number(game.remainingSpots ?? 0) : 0;
  const width = Math.min(100, Math.max(10, Math.round((spots / 10) * 100)));
  const intensity = intensityLabel(spots);
  const schedule = valid ? getGameScheduleDisplay(game) : null;

  const handleConfirmJoin = async (id, payload) => {
    try {
      const res = await joinGame(id, payload);
      console.log("[joinGame] raw response data:", res?.data);
      const participationId = extractParticipationId(res);
      if (participationId) {
        saveParticipationIdForGame(id, participationId);
      }
      console.log("[joinGame] participationId:", participationId);
      alert("You joined the game!");
      setModalOpen(false);
      navigate("/home");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something went wrong";
      setErrorMessage(message);
    }
  };

  return (
    <Layout showBottomNav={true}>
      <div className="max-w-lg mx-auto">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary text-sm font-bold uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Back
          </button>
          <Link
            to={`/participants/${gameId}`}
            className="text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80"
          >
            Participants
          </Link>
        </div>

        {!valid && (
          <div className="rounded-xl bg-surface-container p-8 text-center">
            <p className="text-on-surface-variant mb-4">
              Open this match from Nearby Games, or the link may be outdated.
            </p>
            <Link
              to="/home"
              className="text-primary font-headline font-black underline underline-offset-4"
            >
              Go to Nearby Games
            </Link>
          </div>
        )}

        {valid && (
          <div className="group relative bg-surface-container rounded-lg overflow-hidden flex flex-col border-b-2 border-primary/40">
            <div className="h-56 relative md:h-64">
              {meta.img ? (
                <img
                  alt={meta.label}
                  className="w-full h-full object-cover"
                  src={meta.img}
                />
              ) : (
                <div className="absolute inset-0 bg-surface-container-highest/40" />
              )}
              <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-sm">
                  location_on
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">
                  {game.distance} km away
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="font-headline text-3xl font-bold mb-1">
                    {meta.label}
                  </h1>
                  <p className="text-on-surface-variant text-sm font-medium">
                    Match • {schedule?.fullLine}
                  </p>
                </div>
                <div className="bg-surface-container-highest px-3 py-2 rounded text-right shrink-0 max-w-[42%]">
                  <p className="text-primary font-headline font-black text-lg leading-tight break-words">
                    {schedule?.timeLine}
                  </p>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-0.5 line-clamp-2">
                    {schedule?.dateLine}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">
                  <span>Intensity: {intensity}</span>
                  <span className="text-primary">{spots} spots left</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setModalOpen(true);
                }}
                className="w-full kinetic-gradient text-on-primary font-headline font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 duration-100"
              >
                JOIN MATCH
                <span className="material-symbols-outlined">{meta.icon}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {modalOpen && valid && (
        <JoinGameModal
          gameId={game.id}
          error={errorMessage}
          onClose={() => {
            setModalOpen(false);
            setErrorMessage("");
          }}
          onConfirm={handleConfirmJoin}
        />
      )}
    </Layout>
  );
}
