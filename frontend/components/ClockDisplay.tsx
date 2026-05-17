"use client";

import { useEffect, useState } from "react";
import {
  ClockFormat,
  formatClockTime,
  formatLocalDateAttribute,
  formatTimeZoneLabel,
  formatTodayDate
} from "@/lib/clock";

type ColorTheme = "light" | "dark";

export function ClockDisplay() {
  const [now, setNow] = useState(() => new Date());
  const [clockFormat, setClockFormat] = useState<ClockFormat>("12-hour");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("light");

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = colorTheme;

    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [colorTheme]);

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
      <p className="timezone-line" aria-label="Time zone">
        {formatTimeZoneLabel(now)}
      </p>
      <div className="control-stack" aria-label="Clock preferences">
        <div
          className="toggle-group"
          aria-label="Theme"
          role="group"
        >
          <button
            type="button"
            className="toggle-option"
            aria-pressed={colorTheme === "light"}
            onClick={() => setColorTheme("light")}
          >
            Light
          </button>
          <button
            type="button"
            className="toggle-option"
            aria-pressed={colorTheme === "dark"}
            onClick={() => setColorTheme("dark")}
          >
            Dark
          </button>
        </div>
        <div
          className="toggle-group"
          aria-label="Clock format"
          role="group"
        >
          <button
            type="button"
            className="toggle-option"
            aria-pressed={clockFormat === "12-hour"}
            onClick={() => setClockFormat("12-hour")}
          >
            12-hour
          </button>
          <button
            type="button"
            className="toggle-option"
            aria-pressed={clockFormat === "24-hour"}
            onClick={() => setClockFormat("24-hour")}
          >
            24-hour
          </button>
        </div>
      </div>
    </section>
  );
}
