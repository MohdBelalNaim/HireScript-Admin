import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import All from "../All";

const AdminPage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col l">
      <Header />

      {/*Page body*/}

      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 mt-2 px-1">
        <aside className="sm:block">
          <Sidebar />
        </aside>

        <main>
          <All />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;