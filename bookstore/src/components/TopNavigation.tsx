import React, { useState, useEffect } from "react";
import { FaBars, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

interface TopNavigationProps {
  toggleSidebar: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useTheme(); // Get dark mode state

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as HTMLElement).closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isDropdownOpen]);

  return (
    <header className={`w-full fixed top-0 left-0 shadow-md px-4 py-4 flex justify-between items-center z-50 md:w-[80%] md:left-[20%] transition-all duration-300 ease-in-out ${
      darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
    }`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-xl text-gray-600 dark:text-white"
        title="Toggle Sidebar"
      >
        <FaBars />
      </button>

      {/* Brand Name */}
      <a href="/" className="text-2xl font-bold transition-colors duration-300 ease-in-out">
        INVENTORY
      </a>

      {/* Right Side Icons */}
      <div className="flex space-x-4 relative items-center">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-xl transition-transform transform hover:scale-110 duration-200"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600 dark:text-gray-600" />}
        </button>

        {/* User Profile Dropdown */}
        <div className="relative user-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-xl transition-transform transform hover:scale-110 duration-200"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            title="User Menu"
          >
            <FaUser />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 shadow-lg rounded-lg p-2 opacity-0 animate-fade-in transition-all duration-300 ease-in-out 
              bg-white dark:bg-gray-800"
              role="menu"
            >
              <a
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-200"
                role="menuitem"
              >
                Profile
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-200"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
