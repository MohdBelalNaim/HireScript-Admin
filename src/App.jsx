import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./Edit";
import AdminPage from "./Pages/AdminPage"
import AddJobPage from "./Pages/AddJobPage";
import PeoplePage from "./Pages/PeoplePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/add" element={<AddJobPage/>}/>
        <Route path="/people" element={<PeoplePage/>}/>
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
