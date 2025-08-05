import React, { useState, useEffect } from "react";
import Home from "./Home";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Edit from "./Edit";
import AdminPage from "./Pages/AdminPage";
import AddJobPage from "./Pages/AddJobPage";
import PeoplePage from "./Pages/PeoplePage";
import CreateCoursePage from "./Pages/CreateCoursePage";
import AllCoursesPage from "./Pages/AllCoursesPage";
import PasswordPage from "./Pages/PasswordPage";
import AllBlogsPage from "./Pages/AllBlogs";
import CreateBlogPage from "./Pages/CreateBlog";
import EditBlogPage from "./Pages/EditBlog";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddJobPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/blogs" element={<AllBlogsPage />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
