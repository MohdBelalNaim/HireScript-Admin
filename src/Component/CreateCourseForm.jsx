import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const CreateCourseForm = ({ onSaveCourse }) => {
  const [toast, setToast] = useState(null);
  const fields = [
    { name: "courseName", label: "Course Name", type: "text" },
    { name: "instructor", label: "Instructor", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "duration", label: "Duration (e.g. 10 weeks)", type: "text" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "price", label: "Price", type: "number" },
    { name: "category", label: "Category", type: "text" },
    { name: "seatsLeft", label: "Seats Left", type: "number" },
    { name: "technologies", label: "Technologies to be Taught", type: "text" },
  ];

  const { register, handleSubmit, reset } = useForm();

  const handleAddCourse = async (data) => {
    try {
      await onSaveCourse(data);
      setToast({ type: "success", message: "Course added successfully!" });
      reset();
    } catch (error) {
      setToast({ type: "error", message: "Error adding course: " + error.message });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4 ">
      {toast && (
        <div className={`mb-4 px-4 py-2 rounded text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Add a New Course
      </h2>
      <form onSubmit={handleSubmit(handleAddCourse)} className="space-y-5">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block mb-1 text-sm text-gray-700 capitalize" htmlFor={field.name}>
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                placeholder={`Enter ${field.label}`}
                {...register(field.name, { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                placeholder={`Enter ${field.label}`}
                {...register(field.name, { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
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