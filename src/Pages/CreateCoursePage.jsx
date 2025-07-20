import React from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import CreateCourseForm from "../Component/CreateCourseForm";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const saveCourseToFirebase = async (data) => {
  const newCourse = {
    ...data,
    createdAt: serverTimestamp(),
  };
  return addDoc(collection(db, "courses"), newCourse);
};

const CreateCoursePage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 mt-2 px-1">
        <aside className="sm:block">
          <Sidebar />
        </aside>
        <main>
          <CreateCourseForm onSaveCourse={saveCourseToFirebase} />
        </main>
      </div>
    </div>
  );
};

export default CreateCoursePage; 