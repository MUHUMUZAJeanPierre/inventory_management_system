import { FaBars, FaSearch, FaUser, FaSun, FaMoon } from "react-icons/fa";

const TopNavigation = ({ toggleSidebar, toggleDarkMode }) => {
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
      <div className="flex space-x-4">
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-xl text-gray-600 dark:text-white">
          {document.documentElement.classList.contains("dark") ? <FaSun /> : <FaMoon />}
        </button>

        {/* User Profile Icon */}
        <button className="text-xl text-gray-600 dark:text-white">
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default TopNavigation;
