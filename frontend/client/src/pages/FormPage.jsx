import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
  });

  const townToEdit = location.state?.town; // Get town data from navigation state
  const API_URL = "http://localhost:3000/api/towns";

  useEffect(() => {
    if (townToEdit) {
      setFormData({
        name: townToEdit.name,
        description: townToEdit.description,
        country: townToEdit.country,
      });
    }
  }, [townToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (townToEdit) {
        // Update existing town
        await axios.put(`${API_URL}/${townToEdit._id}`, formData);
      } else {
        // Add new town
        await axios.post(API_URL, formData);
      }
      navigate("/dashboard"); // Redirect to dashboard after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          {townToEdit ? "Edit Town" : "Add New Town"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 mb-4 block w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 mb-4 block w-full"
        />
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          className="border p-2 mb-4 block w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded w-full"
        >
          {townToEdit ? "Update Town" : "Submit"}
        </button>
      </form>
    </div>
  );
}
