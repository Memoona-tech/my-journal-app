"use client";
import React, { useState } from "react";

const themes = ["cupcake", "forest", "synthwave", "aqua", "luxury"];

export const ThemePicker = () => {
  const [open, setOpen] = useState(false);

  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2 rounded-full bg-white shadow hover:bg-gray-100">
        🎨
      </button>
      {open && (
        <div className="absolute right-0 mt-2 p-2 bg-white shadow rounded flex gap-2 z-50">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => applyTheme(theme)}
              className={`w-6 h-6 rounded-full ring-2 ring-gray-200`}
              style={{ backgroundColor: getColorFromTheme(theme) }}
              title={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Simple helper: match a few themes to preview colors
const getColorFromTheme = (theme: string) => {
  switch (theme) {
    case "cupcake": return "#fbcfe8";
    case "forest": return "#16a34a";
    case "synthwave": return "#f472b6";
    case "aqua": return "#06b6d4";
    case "luxury": return "#111827";
    default: return "#ccc";
  }
};
