import React from "react";
import { useForm } from "react-hook-form";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Add = () => {
  const fields = [
    "title",
    "company",
    "location",
    "description",
    "salary",
    "type",
    "skills",
    "experience",
    "applyLink",
    "contactEmail",
    "deadline",
    "companyLogo",
  ];

  const { register, handleSubmit, reset } = useForm();

  const handleAddJob = async (data) => {
    try {
      const newJob = {
        ...data,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "jobs"), newJob);
      alert("Job added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Add a New Job</h2>

      <form onSubmit={handleSubmit(handleAddJob)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block mb-1 text-sm text-gray-700 capitalize">
              {field}
            </label>
            <input
              type="text"
              placeholder={`Enter ${field}`}
              {...register(field, { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default Add;
