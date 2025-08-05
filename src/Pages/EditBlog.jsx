import React, { useState, useEffect } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import RichTextEditor from "../Component/RichTextEditor"; // Import the existing RichTextEditor component

const EditBlogPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [content, setContent] = useState(""); // Use content state for the RichTextEditor
  const [loading, setLoading] = useState(true);

  // Fetch the blog data when the component loads
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          const blogData = blogSnap.data();
          setValue("title", blogData.title);
          setValue("author", blogData.author);
          setValue("excerpt", blogData.excerpt);
          setValue("category", blogData.category);
          setValue("publishDate", blogData.publishDate.split("T")[0]); // Format date
          setValue("readTime", blogData.readTime);
          setValue("featuredImage", blogData.featuredImage);
          setValue("tags", blogData.tags.join(", "));
          setContent(blogData.content); // Set the content for the RichTextEditor
        } else {
          alert("Blog not found!");
          navigate("/blogs");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate, setValue]);

  const handleUpdateBlog = async (data) => {
    try {
      const updatedBlog = {
        ...data,
        content, // Use the updated content from the RichTextEditor
        publishDate: new Date(data.publishDate).toISOString(),
        tags: data.tags.split(",").map((tag) => tag.trim()),
        updatedAt: serverTimestamp(),
      };

      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, updatedBlog);

      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Error updating blog: " + error.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading blog data...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6 mt-2 px-1">
        <aside className="sm:block">
          <Sidebar />
        </aside>
        <main>
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              Edit Blog
            </h2>
            <form
              onSubmit={handleSubmit(handleUpdateBlog)}
              className="space-y-5"
            >
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Enter blog title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  {...register("author", { required: true })}
                  placeholder="Enter author name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Excerpt
                </label>
                <textarea
                  {...register("excerpt", { required: true })}
                  placeholder="Enter blog excerpt"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  {...register("category", { required: true })}
                  placeholder="Enter blog category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Publish Date
                </label>
                <input
                  type="date"
                  {...register("publishDate", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Read Time
                </label>
                <input
                  type="text"
                  {...register("readTime", { required: true })}
                  placeholder="Enter read time (e.g., '5 min read')"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Featured Image
                </label>
                <input
                  type="text"
                  {...register("featuredImage", { required: true })}
                  placeholder="Enter URL of the featured image"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Content
                </label>
                <RichTextEditor
                  value={content}
                  onChange={(value) => setContent(value)} // Update state with editor value
                  className="border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">Tags</label>
                <input
                  type="text"
                  {...register("tags", { required: true })}
                  placeholder="Enter tags separated by commas (e.g., 'Career, AI, Skills')"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
              >
                Update Blog
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditBlogPage;
