import { createContext, useContext, useEffect, useState } from "react";

// Tema yang tersedia: "dark", "light", atau "system"
const initialState = {
  theme: "system", // Tema default
  setTheme: () => null, // Fungsi untuk mengubah tema
};

// Buat context untuk ThemeProvider
const ThemeProviderContext = createContext(initialState);

// Komponen ThemeProvider
export function ThemeProvider({
  children,
  defaultTheme = "system", // Tema default
  storageKey = "vite-ui-theme", // Key untuk localStorage
  ...props
}) {
  // State untuk menyimpan tema
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  // Efek untuk mengubah tema pada elemen root (html)
  useEffect(() => {
    const root = window.document.documentElement;

    // Hapus kelas tema sebelumnya
    root.classList.remove("light", "dark");

    // Jika tema adalah "system", gunakan preferensi sistem
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    // Tambahkan kelas tema yang dipilih
    root.classList.add(theme);
  }, [theme]);

  // Nilai yang akan diberikan ke context
  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme); // Simpan tema ke localStorage
      setTheme(theme); // Update state
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook untuk menggunakan tema
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  // Pastikan hook digunakan di dalam ThemeProvider
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};