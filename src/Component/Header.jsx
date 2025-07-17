import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/Logo.png";

const Header = () => {
  const [sidebar, setSideBar] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setSideBar(false);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebar && (
        <div className="fixed inset-0 bg-white flex flex-col place-items-center justify-center gap-y-4 z-50">
          <svg
            onClick={() => setSideBar(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 absolute top-4 right-4 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <div
            onClick={() => handleNavigation("/")}
            className="animate__animated animate__fadeInUp"
          >
            Home
          </div>

          <div
            onClick={() => handleNavigation("/add")}
            className="animate__animated animate__fadeInUp"
          >
            Add Jobs
          </div>

          <div
            onClick={() => handleNavigation("/people")}
            className="animate__animated animate__fadeInUp"
          >
            People
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white flex items-center justify-between p-2 max-sm:flex-col max-sm:items-start border-b border-gray-300">
        <div className="text-blue-500 flex items-center justify-between w-full py-2 cursor-none">
          <Link to="/">
            <img src={logo} className="w-[13%] max-sm:w-[30%]" alt="Logo" />
          </Link>

          
          <section>
            <svg
              onClick={() => setSideBar(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="block lg:hidden size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </section>
        </div>
      </div>
    </>
  );
};

export default Header;
