import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import RichTextEditor from "./Component/RichTextEditor";
import CityAutocomplete from "./Component/CityAutocomplete";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState({});
  const [location, setLocation] = useState("");

  const fields = [
    { name: "title", placeholder: "Enter Job Title" },
    { name: "company", placeholder: "Enter Company Name" },
    { name: "companyLogo", placeholder: "Enter Company Logo URL", type: "url" },
    { name: "description", placeholder: "Edit Job Description", isRTE: true },
    { name: "experience", placeholder: "Enter Required Experience" },
    { name: "salary", placeholder: "Enter Salary Amount", type: "number" },
    { name: "jobRequirements", placeholder: "Edit Job Requirements", isRTE: true },
    { name: "companyDescription", placeholder: "Edit Company Description", isRTE: true },
    { name: "applyLink", placeholder: "Enter Application Link", type: "url" },
    { name: "postedBy", placeholder: "Edit Posted By (optional)" },
    { name: "skills", placeholder: "Edit Required Skills" }, 
    { name: "website", placeholder: "Edit Company Website (optional)", type: "url" }
  ];

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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setJobData(data);
          setLocation(data.location || "");
        } else {
          alert("Job not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error loading job:", error);
        alert("Failed to load job.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRTEChange = (name, value) => {
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "jobs", id), {
        ...jobData,
        location,
      });
      alert("Job updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center py-5 text-xl font-semibold text-blue-600 border-b">
        Edit Job — Let'sWork Admin
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-sm text-gray-500">Loading job data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field, index) =>
              field.isRTE ? (
                <div key={index}>
                  <label className="block mb-1 text-sm text-gray-700">
                    {field.placeholder}
                  </label>
                  <RichTextEditor
                    value={jobData[field.name] || ""}
                    onChange={(val) => handleRTEChange(field.name, val)}
                    placeholder={field.placeholder}
                  />
                </div>
              ) : (
                <div key={index}>
                  <label className="block mb-1 text-sm text-gray-700">
                    {field.placeholder}
                  </label>
                  <input
                    name={field.name}
                    type={field?.type || "text"}
                    value={jobData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )
            )}

            {/* Job Type */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">Job Type</label>
              <select
                name="type"
                value={jobData.type || "None"}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="None">Select type</option>
                <option value="In office">In office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">Location *</label>
              <CityAutocomplete
                value={location}
                onChange={(val) => setLocation(val)}
                placeholder="Search for Indian cities..."
                required={true}
              />
            </div>

            {/* Job Category */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">Job Category</label>
              <select
                name="category"
                value={jobData.category || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select category</option>
                {jobCategories.map((cat) => (
                  <option value={cat} key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md text-white text-sm transition bg-blue-600 hover:bg-blue-700"
            >
              Update Job
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditJob;