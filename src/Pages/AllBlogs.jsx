import React, { useEffect, useState } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog.");
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
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              All Blogs
            </h2>
            {loading ? (
              <div className="p-4 text-gray-600 text-center text-sm">
                Loading blogs...
              </div>
            ) : blogs.length === 0 ? (
              <div className="p-4 text-gray-500 text-center text-sm">
                No blogs found.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-sm text-left text-gray-800">
                  <thead className="bg-blue-50 text-blue-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Author</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {blogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{blog.title}</td>
                        <td className="px-4 py-2">{blog.author}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <Link to={`/edit-blog/${blog.id}`}>
                              <button className="px-3 py-1.5 border text-sm text-blue-600 border-blue-600 rounded hover:bg-blue-100 transition">
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="px-3 py-1.5 border text-sm text-red-600 border-red-500 rounded hover:bg-red-50 transition"
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
        </main>
      </div>
    </div>
  );
};

export default AllBlogsPage;
