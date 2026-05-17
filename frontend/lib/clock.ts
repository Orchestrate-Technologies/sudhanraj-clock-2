export type ClockFormat = "12-hour" | "24-hour";

const twelveHourFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});

const twentyFourHourFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});

const todayDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

export function formatClockTime(date: Date, format: ClockFormat = "12-hour") {
  const formatter =
    format === "24-hour" ? twentyFourHourFormatter : twelveHourFormatter;

  return formatter.format(date);
}

export function formatTodayDate(date: Date) {
  return todayDateFormatter.format(date);
}

export function formatLocalDateAttribute(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
