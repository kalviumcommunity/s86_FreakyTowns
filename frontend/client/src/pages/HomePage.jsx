import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => setCurrentUser(res.data))
      .catch(() => setCurrentUser(null));
  }, []);

  return (
    <div className="min-h-screen bg-blue-400 text-white flex flex-col items-center">

      {/* Hero Section */}
      <header className="text-center p-8 mt-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Towns</h1>
        <p className="text-lg md:text-2xl mb-6">
          Discover unique places worldwide with FreakyTowns.
        </p>
        <Link to="/dashboard">
          <button className="bg-pink-800 text-white font-semibold py-3 px-6 rounded-3xl">
            Explore Towns
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="bg-pink-800 p-6 rounded-lg shadow-lg text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Discover Towns</h2>
          <p>Browse through unique and quirky towns from all over the world.</p>
        </div>
        <div className="bg-pink-800 p-6 rounded-lg shadow-lg text-center text-white">
          <h2 className="text-xl font-semibold mb-2">User Submissions</h2>
          <p>Add your favorite towns to our growing database.</p>
        </div>
        <div className="bg-pink-800 p-6 rounded-lg shadow-lg text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          <p>Share your experiences and explore reviews by others.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 bg-purple-800 text-center mt-6">
        <p className="text-sm">&copy; 2025 FreakyTowns. All rights reserved.</p>
      </footer>
    </div>
  );
}
