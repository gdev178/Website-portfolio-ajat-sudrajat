import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = "theme";

/** Pilihan tersimpan, kalau belum ada ikuti setelan sistem */
function initialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  // "light" adalah nama lama sebelum diganti "spiderman" — tetap dihormati
  // supaya pengunjung yang sudah pernah memilih tidak tiba-tiba balik ke gelap
  if (saved === "light" || saved === "spiderman") return "spiderman";
  if (saved === "dark") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "spiderman" : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Ikuti perubahan setelan sistem selama pengguna belum memilih sendiri
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => setTheme(e.matches ? "spiderman" : "dark");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "spiderman" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme harus dipakai di dalam <ThemeProvider>");
  return ctx;
}
