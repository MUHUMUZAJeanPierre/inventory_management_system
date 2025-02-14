import { useState, useEffect } from "react";
import { FaBars, FaSearch, FaUser } from "react-icons/fa";

const TopNavigation = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 bg-white dark:bg-gray-900 shadow-md px-4 py-3 flex justify-between items-center z-50 md:w-[83%] md:left-[17%] transition-all">
      {/* Sidebar Toggle for Mobile */}
      <button onClick={toggleSidebar} className="md:hidden text-xl text-gray-600 dark:text-white">
        <FaBars />
      </button>

      {/* Logo */}
      <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
        SkillHive
      </a>

      {/* Search Bar (Visible on Desktop) */}
      <div className="hidden md:flex items-center relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-gray-400"
        />
        <button className="absolute right-2 top-2 text-gray-600 dark:text-gray-400">
          <FaSearch />
        </button>
      </div>

      {/* Icons */}
      <div className="flex space-x-4 relative">
        {/* User Profile Icon with Dropdown */}
        <div className="relative user-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-xl text-gray-600 dark:text-white"
          >
            <FaUser />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
              <a
                href="/profile"
                className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                Profile
              </a>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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
