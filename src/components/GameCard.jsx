import { useNavigate } from "react-router-dom";
import { SPORT_META } from "../constants/sportMeta";
import { getGameScheduleDisplay } from "../utils/gameDateTime";
import {
  GAME_STATUS_LABEL,
  GAME_STATUS_STYLES,
  resolveGameStatusKey,
} from "../constants/gameStatus";

function intensityLabel(spots) {
  if (spots >= 8) return "Pro";
  if (spots >= 4) return "Medium";
  return "High";
}

function normalizeSportKey(input) {
  const raw = String(input ?? "")
    .trim()
    .toUpperCase()
    .replace(/[^\p{L}\p{N}_\s-]+/gu, "")
    .replace(/\s+/g, " ");

  if (!raw) return "";
  if (raw === "CRICET" || raw.includes("CRICKET")) return "CRICKET";
  return raw.replace(/[\s-]+/g, "_");
}

export default function GameCard({
  game,
  onJoin,
  hideJoinButton = false,
  listContext,
  secondaryAction,
}) {
  const navigate = useNavigate();
  const { id, sport, distance, remainingSpots: spotsLeft } = game;

  const statusKey = resolveGameStatusKey(game, listContext);
  const rawParticipationStatus =
    listContext === "joined"
      ? String(game.participationStatus ?? "").trim().toUpperCase()
      : "";
  const badgeText =
    rawParticipationStatus || (statusKey ? GAME_STATUS_LABEL[statusKey] : "");
  const badgeStyleKey = (() => {
    if (rawParticipationStatus) {
      // joined participation statuses (backend examples):
      // ACTIVE, COMPLETED, CANCELLED_BY_PLAYER, CANCELLED_BY_HOST, REMOVED, LEFT, JOINED
      if (rawParticipationStatus === "ACTIVE") return "YOU_JOINED";
      if (rawParticipationStatus === "COMPLETED") return "ACTIVE";
      if (
        rawParticipationStatus === "LEFT" ||
        rawParticipationStatus === "REMOVED"
      ) {
        return "REMOVED";
      }
      if (
        rawParticipationStatus === "CANCELLED" ||
        rawParticipationStatus === "CANCELED" ||
        rawParticipationStatus.startsWith("CANCELLED_") ||
        rawParticipationStatus.startsWith("CANCELED_")
      ) {
        return "CANCELLED";
      }
      if (rawParticipationStatus === "JOINED") return "YOU_JOINED";
      return "YOU_JOINED";
    }
    return statusKey;
  })();

  const schedule = getGameScheduleDisplay(game);

  const sportKey = normalizeSportKey(sport);
  const meta =
    SPORT_META[sportKey] || { label: sportKey || "Sport", icon: "bolt", img: "" };

  const spots = Number(spotsLeft ?? 0);
  const width = Math.min(100, Math.max(10, Math.round((spots / 10) * 100)));
  const intensity = intensityLabel(spots);

  const goToGame = () => {
    navigate(`/game/${id}`, { state: { game } });
  };

  return (
    <div
      className="group relative bg-surface-container rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:bg-surface-container-high border-b-2 border-transparent hover:border-primary cursor-pointer"
      onClick={goToGame}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToGame();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`Open ${meta.label} match details`}
    >
      <div className="h-48 relative">
        {meta.img ? (
          <img
            alt={meta.label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={meta.img}
          />
        ) : (
          <div className="absolute inset-0 bg-surface-container-highest/30" />
        )}

        <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-sm">
            location_on
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">
            {distance} km away
          </span>
        </div>

        {badgeText && badgeStyleKey && (
          <div
            className={`absolute top-4 right-4 backdrop-blur-md px-2.5 py-1 rounded-md border text-[10px] font-black uppercase tracking-widest ${GAME_STATUS_STYLES[badgeStyleKey]}`}
          >
            {badgeText}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-headline text-2xl font-bold mb-1">
              {meta.label}
            </h2>
            <p className="text-on-surface-variant text-sm font-medium">
              Match • {schedule.fullLine}
            </p>
          </div>

          <div className="bg-surface-container-highest px-3 py-2 rounded text-right shrink-0">
            <p className="text-primary font-headline font-black text-xl leading-none">
              {schedule.timeLine}
            </p>
            <p className="text-[10px] font-bold uppercase text-slate-400 mt-1">
              Starts
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

        {secondaryAction && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              secondaryAction.onClick();
            }}
            className="w-full mb-3 border-2 border-red-500/45 bg-red-500/10 text-red-300 font-headline font-bold py-3.5 rounded-lg uppercase tracking-wide text-sm hover:bg-red-500/15 transition-colors active:scale-[0.99] duration-100"
          >
            {secondaryAction.label}
          </button>
        )}

        {!hideJoinButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onJoin(id);
            }}
            className="w-full kinetic-gradient text-on-primary font-headline font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95 duration-100"
          >
            JOIN MATCH
            <span className="material-symbols-outlined">{meta.icon}</span>
          </button>
        )}
      </div>
    </div>
  );
}