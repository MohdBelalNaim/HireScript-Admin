import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const AllUsers = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const UserData = querySnapshot.docs.map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
            }));
            setUser(UserData);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (uid) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteDoc(doc(db, "users", uid));
            setUser((prev) => prev.filter((user) => user.uid !== uid));
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);
    const totalUsers = user.length;
    const collegeUsers = user.filter((u) => u.college && u.college.collegeEmail).length;

    // console.log(user[1].college.collegeEmail)

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">All user</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm text-gray-500">Total Users</h3>
                    <p className="text-2xl font-semibold text-blue-600">{totalUsers}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm text-gray-500">College Email Users</h3>
                    <p className="text-2xl font-semibold text-green-600">{collegeUsers}</p>
                </div>
            </div>

            {loading ? (
                <div className="p-4 text-gray-600 text-center text-sm">Loading user...</div>
            ) : user.length === 0 ? (
                <div className="p-4 text-gray-500 text-center text-sm">No user found.</div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full text-sm text-left text-gray-800">
                        <thead className="bg-blue-50 text-blue-700">
                            <tr>
                                <th className="px-4 py-3 font-medium">user ID</th>
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">College Email</th>
                                <th className="px-4 py-3 font-medium">Phone Number</th>
                                {/* <th className="px-4 py-3 font-medium">Skills</th> */}
                                <th className="px-4 py-3 font-medium">Designation</th>
                                <th className="px-4 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {user.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap">{user.uid}</td>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.college?.collegeEmail || "-"}</td>
                                    <td className="px-4 py-3">{user.phoneNumber || "-"}</td>
                                    <td className="px-4 py-3">{user.designation || "-"}</td>

                                    {/* <td className="px-4 py-3">{user.college.collegeName || "-"}</td> */}
                                    {/* <td className="px-4 py-3">{user.skills}</td> */}
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {/* <a
                                                href={`https://www.hirescript.tech/account/${user.uid}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 border text-sm text-green-600 border-green-600 rounded hover:bg-green-50 transition-all duration-150"
                                            >
                                                View
                                            </a> */}
                                            <button
                                                onClick={() => handleDelete(user.uid)}
                                                className="px-3 py-1.5 border text-sm text-red-600 border-red-500 rounded hover:bg-red-50 transition-all duration-150"
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

export default AllUsers;
