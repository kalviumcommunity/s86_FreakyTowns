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
  const [errors, setErrors] = useState({}); // Track validation errors

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

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    } else if (formData.country.length < 2) {
      newErrors.country = "Country must be at least 2 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return; // Stop submission if validation fails
    }

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
          className={`border p-2 mb-1 block w-full ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-4">{errors.name}</p>
        )}
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className={`border p-2 mb-1 block w-full ${
            errors.description ? "border-red-500" : ""
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mb-4">{errors.description}</p>
        )}
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          className={`border p-2 mb-1 block w-full ${
            errors.country ? "border-red-500" : ""
          }`}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mb-4">{errors.country}</p>
        )}
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
