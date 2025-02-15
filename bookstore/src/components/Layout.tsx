import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";

const Layout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white"}>
      <TopNavigation 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 p-5 pt-10 md:ml-64">
        {children}
      </div>
      </div>
    </div>
  );
};

export default Layout;
