import React, { createContext, useContext, useEffect, useState } from "react";

// Define the type for the context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Detect the initial theme from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
             (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  };

  const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);

  // Apply theme on mount and when darkMode state changes
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
