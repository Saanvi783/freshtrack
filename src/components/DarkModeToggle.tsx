import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("freshtrack_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("freshtrack_theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("freshtrack_theme");
    if (saved === "dark") {
      setDark(true);
    }
  }, []);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default DarkModeToggle;
