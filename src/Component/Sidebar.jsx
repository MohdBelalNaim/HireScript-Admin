import React from "react";
import { Home, Bookmark, User, LogOut, PlusCircleIcon, Book, BookA, FilePlus, File, ListFilter, ListCheck, ListEnd, BookCheck, Blocks, Newspaper, SunMoon, NetworkIcon, NewspaperIcon, ChartNetwork, EllipsisVertical, ReplyAllIcon, CreativeCommons } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const sidebarItems = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Add Jobs", path: "/add", icon: <PlusCircleIcon size={18} /> },
  { name: "People", path: "/people", icon: <User size={18} /> },
  {
    name: "Create Courses",
    path: "/create-course",
    icon: <FilePlus size={18} />,
  },
  { name: "All Courses", path: "/courses", icon: <BookCheck size={18} /> },
  { name: "Create Blog", path: "/create-blog", icon: <CreativeCommons size={18} /> },
  { name: "All Blogs", path: "/blogs", icon: <NewspaperIcon size={18} /> },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);      // Sign out from Firebase
      navigate("/login", { replace: true }); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

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
      <div
        onClick={handleLogout}
        className="flex gap-2 cursor-pointer items-center px-3 py-3 text-sm rounded hover:bg-red-100 text-red-600"
      >
        <LogOut size={18} />
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
