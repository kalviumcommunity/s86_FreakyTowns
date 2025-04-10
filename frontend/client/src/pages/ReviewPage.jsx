import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { town } = location.state || {}; // Get the town data passed via state
  const [review, setReview] = useState("");

  const API_URL = `http://localhost:3000/api/towns/${town._id}/reviews`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { review }); // Send the review to the backend
      navigate("/dashboard"); // Redirect to the Dashboard after submitting
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Review for {town.name}</h2>
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border p-2 mb-4 block w-full"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
