import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ClockDisplay } from "@/components/ClockDisplay";

describe("ClockDisplay", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows the current time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T13:05:09"));

    render(<ClockDisplay />);

    expect(screen.getByText("1:05:09 PM")).toBeInTheDocument();
    expect(screen.getByText("Sunday, May 17, 2026")).toHaveAttribute(
      "dateTime",
      "2026-05-17"
    );
    expect(
      screen.getByRole("button", { name: "12-hour" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("updates the displayed time every second", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T13:05:09"));

    render(<ClockDisplay />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("1:05:10 PM")).toBeInTheDocument();
  });

  it("toggles between 12-hour and 24-hour time formats", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T13:05:09"));

    render(<ClockDisplay />);

    const twelveHourButton = screen.getByRole("button", { name: "12-hour" });
    const twentyFourHourButton = screen.getByRole("button", {
      name: "24-hour"
    });

    act(() => {
      twentyFourHourButton.click();
    });

    expect(screen.getByText("13:05:09")).toBeInTheDocument();
    expect(twelveHourButton).toHaveAttribute("aria-pressed", "false");
    expect(twentyFourHourButton).toHaveAttribute("aria-pressed", "true");

    act(() => {
      twelveHourButton.click();
    });

    expect(screen.getByText("1:05:09 PM")).toBeInTheDocument();
    expect(twelveHourButton).toHaveAttribute("aria-pressed", "true");
    expect(twentyFourHourButton).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles between light and dark themes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-17T13:05:09"));

    render(<ClockDisplay />);

    const lightButton = screen.getByRole("button", { name: "Light" });
    const darkButton = screen.getByRole("button", { name: "Dark" });

    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    act(() => {
      darkButton.click();
    });

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(lightButton).toHaveAttribute("aria-pressed", "false");
    expect(darkButton).toHaveAttribute("aria-pressed", "true");

    act(() => {
      lightButton.click();
    });

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(lightButton).toHaveAttribute("aria-pressed", "true");
    expect(darkButton).toHaveAttribute("aria-pressed", "false");
  });
});
