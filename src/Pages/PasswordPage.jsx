import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PASSWORD_KEY = "hirescript_admin_pw";
const PASSWORD_HASH = "b109f3bbbc244eb82441917ed06d618b9008dd09c7f1d16c6eee7d45b6c2e11f"; // Example: hash for 'admin123' (SHA-256)

function sha256(str) {
  // Simple browser SHA-256 hash function
  const buffer = new TextEncoder().encode(str);
  return window.crypto.subtle.digest("SHA-256", buffer).then((hash) => {
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = await sha256(password);
    console.log("Entered password:", password, "Hash:", hash); // Add this line
    if (hash === PASSWORD_HASH) {
      localStorage.setItem(PASSWORD_KEY, PASSWORD_HASH);
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Enter Admin Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Password"
          required
        />
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default PasswordPage; 