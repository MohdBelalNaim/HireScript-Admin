import React, { useState } from "react";
import Sidebar from "../Component/Sidebar"
import Header from "../Component/Header";
import All from "../All";
import Add from "../Add";

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col l">
      <Header />

      {/*Page body*/}

      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 mt-2 px-1">
        <aside className="hidden sm:block">
          <Sidebar />
        </aside>

        <main>
          <Add />
        </main>
      </div>
    </div>
  );
};

export default Home;