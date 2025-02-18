import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaQuestion,
  FaGraduationCap, FaChalkboardTeacher, FaHeadset, FaUserCog
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // Import theme context

interface User {
  name?: string;
  role?: "student" | "teacher" | "admin" | "visitor";
  profilePic?: string;
}

interface SidebarProps {
  user?: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest(".sidebar-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const menuItems = [
    { path: "/inventory", label: "Inventory Manager", icon: <FaHome /> },
    { path: "/record", label: "Record Item", icon: <FaQuestion /> },
    { path: "/contact", label: "Contact Us", icon: <FaHeadset /> },
  ];

  if (user?.role === "student") {
    menuItems.push({ path: "/courses", label: "Courses", icon: <FaGraduationCap /> });
  }

  if (user?.role === "teacher") {
    menuItems.push({ path: "/teachers", label: "Teachers", icon: <FaChalkboardTeacher /> });
  }

  if (user?.role === "admin") {
    menuItems.push({ path: "/admin", label: "Admin Panel", icon: <FaUserCog /> });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 text-gray-600 dark:text-white text-2xl z-50"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden z-30" onClick={() => setIsOpen(false)}></div>
      )}

      <div className={`sidebar-container fixed top-0 left-0 h-full shadow-lg w-64 p-4 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 z-40 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}>

        <div className="text-center my-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white bg-gray-700 flex items-center justify-center">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUserCog className="text-white text-4xl" />
            )}
          </div>
          <h3 className="text-lg font-semibold mt-3">{user?.name || "Guest"}</h3>
          <p className="text-sm text-gray-400">{user?.role || "Visitor"}</p>
          <Link
            to="/profile"
            className={`block px-16 py-2 rounded mt-2 transition ${darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-gray-500 hover:bg-gray-500"
              }`}
          >
            View Profile
          </Link>
        </div>

        <nav className="flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 rounded transition text-lg"
              aria-label={item.label}
            >
              {item.icon} <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
