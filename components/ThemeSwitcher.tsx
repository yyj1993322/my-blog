"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙 "}</button>
  );
}
