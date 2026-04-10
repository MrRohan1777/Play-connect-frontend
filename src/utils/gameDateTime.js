import dayjs from "dayjs";

/**
 * Normalizes common backend shapes into display strings for cards.
 * @param {Record<string, unknown>} game
 * @returns {{ dateLine: string, timeLine: string, fullLine: string, isValid: boolean }}
 */
export function getGameScheduleDisplay(game) {
  if (!game || typeof game !== "object") {
    return {
      dateLine: "Date TBD",
      timeLine: "—",
      fullLine: "Date TBD",
      isValid: false,
    };
  }

  const iso =
    game.startDateTime ??
    game.start_date_time ??
    game.scheduledAt ??
    game.scheduled_at;

  if (iso) {
    const d = dayjs(iso);
    if (d.isValid()) {
      return {
        dateLine: d.format("ddd, DD MMM YYYY"),
        timeLine: d.format("h:mm A"),
        fullLine: d.format("ddd, DD MMM YYYY • h:mm A"),
        isValid: true,
      };
    }
  }

  const dateRaw =
    game.date ?? game.gameDate ?? game.matchDate ?? game.game_date ?? "";
  const timeRaw =
    game.time ?? game.startTime ?? game.matchTime ?? game.start_time ?? "";

  const dateStr = String(dateRaw).trim();
  const timeStr = String(timeRaw).trim();

  const combined = dayjs(
    dateStr && timeStr
      ? `${dateStr}T${timeStr}`
      : `${dateStr} ${timeStr}`.trim()
  );
  if (combined.isValid()) {
    return {
      dateLine: combined.format("ddd, DD MMM YYYY"),
      timeLine: combined.format("h:mm A"),
      fullLine: combined.format("ddd, DD MMM YYYY • h:mm A"),
      isValid: true,
    };
  }

  const dateOnly = dayjs(dateStr);
  if (dateOnly.isValid()) {
    const timePretty =
      timeStr && dayjs(`${dateStr}T${timeStr}`).isValid()
        ? dayjs(`${dateStr}T${timeStr}`).format("h:mm A")
        : timeStr || "—";
    return {
      dateLine: dateOnly.format("ddd, DD MMM YYYY"),
      timeLine: timePretty,
      fullLine:
        timeStr && dayjs(`${dateStr}T${timeStr}`).isValid()
          ? dayjs(`${dateStr}T${timeStr}`).format("ddd, DD MMM YYYY • h:mm A")
          : timeStr
            ? `${dateOnly.format("ddd, DD MMM YYYY")} • ${timeStr}`
            : dateOnly.format("ddd, DD MMM YYYY"),
      isValid: true,
    };
  }

  if (timeStr) {
    return {
      dateLine: "Date TBD",
      timeLine: timeStr,
      fullLine: `Date TBD • ${timeStr}`,
      isValid: false,
    };
  }

  return {
    dateLine: "Date TBD",
    timeLine: "—",
    fullLine: "Date TBD",
    isValid: false,
  };
}
