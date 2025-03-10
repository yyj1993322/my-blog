"use client";
import { useTheme } from "../../components/ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 bg-gray-300 dark:bg-gray-700 rounded">
      {theme === "dark" ? "🌙 " : "☀️"}
    </button>
  );
}