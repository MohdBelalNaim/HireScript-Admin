import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import RichTextEditor from "./Component/RichTextEditor";
import CityAutocomplete from "./Component/CityAutocomplete"; // Import the new component

const Add = () => {
  const fields = [
    "title",
    "company",
    "salary",
    "type",
    "skills",
    "experience",
    "applyLink",
    "contactEmail",
    "deadline",
    "companyLogo",
  ];



  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [companyDescription, setCompanyDescription] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [location, setLocation] = useState(""); // Add location state


  const handleAddJob = async (data) => {
    try {
      const newJob = {
        ...data,
        location, // Include location from state
        companyDescription,
        jobDescription,
        jobRequirements,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "jobs"), newJob);
      alert("Job added successfully!");
      reset();
      setCompanyDescription("");
      setJobDescription("");
      setJobRequirements("");
      setLocation(""); // Reset location
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + error.message);
    }
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    setValue("location", value); // Update react-hook-form value
  };

  const jobCategories = [
    "Marketing",
    "Engineering",
    "Design",
    "Finance",
    "Sales",
    "HR",
    "IT Support",
    "Operations",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Add a New Job
      </h2>

      <form onSubmit={handleSubmit(handleAddJob)} className="space-y-5">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block mb-1 text-sm text-gray-700 capitalize">
              {field}
            </label>
            <input
              id={field}
              type="text"
              placeholder={`Enter ${field}`}
              {...register(field, { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        {/* Replace the location input with the autocomplete component */}
        <div>
          <label className="block mb-1 text-sm text-gray-700">Location *</label>
          <CityAutocomplete
            value={location}
            onChange={handleLocationChange}
            placeholder="Search for Indian cities..."
            required={true}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700">Job Category *</label>
          <select
            {...register("category", { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>-- Select a category --</option>
            {jobCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Description *
          </label>
          <RichTextEditor
            value={jobDescription}
            onChange={(value) => {
              setJobDescription(value);
            }}
            placeholder="Write the job description here..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Use the toolbar above to format the job description with headings,
            lists, links, and more.
          </p>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Company Description *
          </label>
          <RichTextEditor
            value={companyDescription}
            onChange={(value) => {
              setCompanyDescription(value);
            }}
            placeholder="Write the Company description here..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Use the toolbar above to format the job description with headings, lists, links, and more.
          </p>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Requirements/Role *
          </label>
          <RichTextEditor
            value={jobRequirements}
            onChange={(value) => {
              setJobRequirements(value);
            }}
            placeholder="Write the job Requirement here..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Use the toolbar above to format the job description with headings, lists, links, and more.
          </p>
        </div>


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
