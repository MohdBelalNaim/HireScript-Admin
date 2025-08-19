import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreateCourseForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [overView, setOverView] = useState("");
  const [courseContent, setCourseContent] = useState("");

  const handleAddOverview = (value) => {
    setOverView(value);
    setValue("overview", value);
  };
  const handleAddCourseContent = (value) => {
    setCourseContent(value);
    setValue("courseContent", value);
  };

  const courseFields = [
    {
      type: "text",
      placeholder: "Course Title",
      name: "title",
    },
    {
      type: "textarea",
      placeholder: "Course Description",
      name: "description",
    },
    {
      type: "number",
      placeholder: "Course Price",
      name: "price",
    },
    {
      type: "text",
      placeholder: "Course Language",
      name: "language",
    },
    {
      type: "text",
      placeholder: "Course Duration",
      name: "duration",
    },
    {
      type: "text",
      placeholder: "Banner image",
      name: "image",
    },
  ];

  async function handleAddCourse(data) {
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        ...data,
        overview: overView,
        courseContent: courseContent,
        registeredStudents: [],
        reviews: [],
        createdAt: serverTimestamp(),
      });

      alert("Course added with ID: " + docRef.id);

      reset();
      setOverView("");
      setCourseContent("");
    } catch (err) {
      console.error("Error adding course: ", err);
      alert("Error adding course: " + err.message);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Add a New Course
      </h2>

      <form onSubmit={handleSubmit(handleAddCourse)}>
        {courseFields.map((item, idx) => {
          if (item.type === "textarea") {
            return (
              <textarea
                key={idx}
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
                placeholder={item.placeholder}
                {...register(item.name)}
              />
            );
          }
          return (
            <input
              key={idx}
              className="w-full border border-gray-300 p-2 rounded-md mb-4"
              type={item.type}
              placeholder={item.placeholder}
              {...register(item.name)}
            />
          );
        })}
        <div>
          <label htmlFor="" className="text-sm my-2 block">
            Overview
          </label>
          <RichTextEditor
            value={overView}
            onChange={(value) => handleAddOverview(value)}
          />
        </div>
        <div>
          <label htmlFor="" className="text-sm my-2 block ">
            Course content
          </label>
          <RichTextEditor
            value={courseContent}
            onChange={(value) => handleAddCourseContent(value)}
          />
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
