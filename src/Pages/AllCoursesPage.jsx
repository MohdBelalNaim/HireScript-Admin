import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);
  const RegisteredEmails = courses.map(course => course.registeredEmails).flat();
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses((prev) => prev.filter((course) => course.id !== id)); // Fixed here
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 mt-2 px-1">
        <aside className="sm:block">
          <Sidebar />
        </aside>
        <main>
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">All Courses</h2>
            {loading ? (
              <div className="p-4 text-gray-600 text-center text-sm">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="p-4 text-gray-500 text-center text-sm">No courses found.</div>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-sm text-left text-gray-800">
                  <thead className="bg-blue-50 text-blue-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Course Name</th>
                      <th className="px-4 py-3 font-medium">Instructor</th>
                      <th className="px-4 py-3 font-medium">Duration</th>
                      <th className="px-4 py-3 font-medium">Start Date</th>
                      <th className="px-4 py-3 font-medium">End Date</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Registered Emails</th>
                      <th className="px-4 py-3 font-medium">Seats Left</th>
                      <th className="px-4 py-3 font-medium">Technologies</th>
                      <th className="px-4 py-3 font-medium">Actions</th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{course.courseName}</td>
                        <td className="px-4 py-2">{course.instructor}</td>
                        <td className="px-4 py-2">{course.duration}</td>
                        <td className="px-4 py-2">{course.startDate}</td>
                        <td className="px-4 py-2">{course.endDate}</td>
                        <td className="px-4 py-2">{course.price}</td>
                        <td className="px-4 py-2">{course.registeredEmails && (
                          <ul className="text-sm text-gray-700 mt-2">
                            {Object.keys(course.registeredEmails).map((emailKey) => (
                              <li key={emailKey}>{emailKey.replace(/_/g, ".")}</li> // restoring dot if replaced earlier
                            ))}
                          </ul>
                        )}</td>
                        <td className="px-4 py-2">{course.seatsLeft}</td>
                        <td className="px-4 py-2">{course.technologies}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="px-3 py-1.5 border text-sm text-red-600 border-red-500 rounded hover:bg-red-50 transition-all duration-150"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCoursesPage; 