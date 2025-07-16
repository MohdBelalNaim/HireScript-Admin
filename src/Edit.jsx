import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          reset(docSnap.data());
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
  }, [id, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await updateDoc(doc(db, "jobs", id), data);
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
      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-sm text-gray-500">Loading job data...</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label className="block mb-1 text-sm text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type="text"
                  {...register(field)}
                  placeholder={`Enter ${field}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 rounded-md text-white text-sm transition ${
                isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Job"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditJob;
