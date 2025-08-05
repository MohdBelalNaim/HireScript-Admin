import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import RichTextEditor from "../Component/RichTextEditor"; // Import the new component
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateBlogPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleAddBlog = async (data) => {
    try {
      // Validate that content is not empty
      if (!content.trim() || content === "<br>" || content === "") {
        alert("Please add some content to your blog post.");
        return;
      }

      const newBlog = {
        ...data,
        content: content, // Use the rich text editor content
        publishDate: new Date(data.publishDate).toISOString(),
        tags: data.tags.split(",").map((tag) => tag.trim()),
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "blogs"), newBlog);
      alert("Blog added successfully!");
      reset();
      setContent(""); // Reset content
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Error adding blog: " + error.message);
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
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl my-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              Create a New Blog
            </h2>
            <form onSubmit={handleSubmit(handleAddBlog)} className="space-y-5">
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Content *
                </label>
                <RichTextEditor
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Write your blog content here..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use the toolbar above to format your content with headings,
                  lists, links and more.
                </p>
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
                Add Blog
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateBlogPage;
