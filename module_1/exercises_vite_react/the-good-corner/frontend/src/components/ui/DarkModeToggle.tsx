import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../hooks/useDackMode";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="toggle-dark-mode"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default DarkModeToggle;
