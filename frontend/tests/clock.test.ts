import { describe, expect, it } from "vitest";
import {
  formatClockTime,
  formatLocalDateAttribute,
  formatTodayDate
} from "@/lib/clock";

describe("clock formatting", () => {
  const sample = new Date("2026-05-17T13:05:09");

  it("formats the current time in 12-hour format by default", () => {
    expect(formatClockTime(sample)).toBe("1:05:09 PM");
  });

  it("formats the current time in 24-hour format", () => {
    expect(formatClockTime(sample, "24-hour")).toBe("13:05:09");
  });

  it("formats today's date with weekday, month, day, and year", () => {
    expect(formatTodayDate(sample)).toBe("Sunday, May 17, 2026");
  });

  it("formats the semantic date from the local calendar day", () => {
    const localMidnightBoundary = new Date(2026, 4, 17, 0, 30, 0);

    expect(formatLocalDateAttribute(localMidnightBoundary)).toBe("2026-05-17");
  });
});
