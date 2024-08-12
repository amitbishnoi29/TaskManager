

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6 text-yellow-500 transition-transform duration-300 transform hover:scale-110" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-900 transition-transform duration-300 transform hover:scale-110" />
      )}
    </button>
  );
}
