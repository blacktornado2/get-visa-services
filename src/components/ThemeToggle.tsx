"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="theme-toggle" aria-label="Toggle theme">
      <input
        type="checkbox"
        className="theme-toggle-checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <div className="theme-toggle-slot">
        <div className="theme-toggle-sun-wrapper">
          <Sun className="theme-toggle-sun" />
        </div>
        <div className="theme-toggle-button" />
        <div className="theme-toggle-moon-wrapper">
          <Moon className="theme-toggle-moon" />
        </div>
      </div>
    </label>
  );
}
