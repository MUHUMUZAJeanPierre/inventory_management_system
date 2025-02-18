import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import TopNavigation from "./TopNavigation";
import imge from '../assets/MuhumuzaImage.png'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className={"bg-gray-100 text-white"  }>
      <TopNavigation 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar user={{ name: "MUHUMUZA", role: "admin", profilePic: imge }} />
        <div className="flex-1 p-5 pt-10 md:ml-64">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
