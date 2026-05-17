"use client";

import { useEffect, useState } from "react";
import {
  ClockFormat,
  formatClockTime,
  formatLocalDateAttribute,
  formatTodayDate
} from "@/lib/clock";

export function ClockDisplay() {
  const [now, setNow] = useState(() => new Date());
  const [clockFormat, setClockFormat] = useState<ClockFormat>("12-hour");

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <section className="clock-panel" aria-label="Current clock">
      <time
        className="time-line"
        dateTime={now.toISOString()}
        suppressHydrationWarning
      >
        {formatClockTime(now, clockFormat)}
      </time>
      <time
        className="date-line"
        dateTime={formatLocalDateAttribute(now)}
        suppressHydrationWarning
      >
        {formatTodayDate(now)}
      </time>
      <div
        className="format-toggle"
        aria-label="Clock format"
        role="group"
      >
        <button
          type="button"
          className="format-option"
          aria-pressed={clockFormat === "12-hour"}
          onClick={() => setClockFormat("12-hour")}
        >
          12-hour
        </button>
        <button
          type="button"
          className="format-option"
          aria-pressed={clockFormat === "24-hour"}
          onClick={() => setClockFormat("24-hour")}
        >
          24-hour
        </button>
      </div>
    </section>
  );
}
