import React, { useState } from "react";
import All from "./All";
import Add from "./Add";
import Campus from "./Campus";

const Home = () => {
  const tabs = [
    { name: "Home", component: <All /> },
    { name: "Add job", component: <Add /> },
    { name: "My campus", component: <Campus /> },
  ];

  const [active, setActive] = useState("Home");

  return (
    <div className="min-h-screen bg-white text-gray-800 font-inter">
      {/* Header */}
      <div className="text-center py-5 text-xl font-semibold text-blue-600">
        Let'sWork Admin
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActive(tab.name)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200
              ${
                active === tab.name
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6 w-[70%] mx-auto px-4">
        {tabs.find((tab) => tab.name === active)?.component}
      </div>
    </div>
  );
};

export default Home;
