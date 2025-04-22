import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full bg-purple-800 py-4 text-white flex justify-between items-center px-8">
      <span className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        FreakyTowns
      </span>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="font-semibold">Welcome, {user.username}!</span>
            <Link to="/form">
              <button className="bg-green-600 py-1 px-3 rounded">Add Town</button>
            </Link>
            <Link to="/dashboard">
              <button className="bg-blue-600 py-1 px-3 rounded">Dashboard</button>
            </Link>
            <button onClick={handleLogout} className="bg-red-600 py-1 px-3 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="bg-pink-700 py-1 px-3 rounded">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="bg-pink-700 py-1 px-3 rounded">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
