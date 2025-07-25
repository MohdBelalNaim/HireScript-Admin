import React from "react";
import { Home, Bookmark, User, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Add Jobs", path: "/add", icon: <Bookmark size={18} /> },
  { name: "People", path: "/people", icon: <User size={18} /> },
  { name: "Create Courses", path: "/create-course", icon: <Bookmark size={18} /> },
  { name: "All Courses", path: "/courses", icon: <Bookmark size={18} /> },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="hidden lg:flex flex-col justify-between h-[calc(100vh-122px)] sticky top-5 p-4 border border-gray-300 bg-white rounded-lg w-full sm:w-64">
      <div>
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={`flex gap-2 items-center px-3 py-3 text-sm rounded cursor-pointer hover:bg-gray-100 mb-2 ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-500"
                : "text-black"
            }`}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
