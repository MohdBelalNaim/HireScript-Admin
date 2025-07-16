import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

const All = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobsData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-600">All Jobs</h2>

      {loading ? (
        <div className="p-4 text-sm text-gray-600">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="p-4 text-sm text-gray-500">No jobs found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-blue-50 text-blue-600">
              <tr>
                <th className="px-4 py-2 font-medium">Job ID</th>
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">Title</th>
                <th className="px-4 py-2 font-medium">Location</th>
                <th className="px-4 py-2 font-medium">Pay</th>
                <th className="px-4 py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{job.id}</td>
                  <td className="px-4 py-2">{job.company}</td>
                  <td className="px-4 py-2">{job.title || "-"}</td>
                  <td className="px-4 py-2">{job.location || "-"}</td>
                  <td className="px-4 py-2">{job.salary || "-"} LPA</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/edit/${job.id}`}>
                        <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                          Edit
                        </button>
                      </Link>
                      <a
                        href={`https://www.hirescript.tech/details/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1 text-red-600 border border-red-500 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default All;
