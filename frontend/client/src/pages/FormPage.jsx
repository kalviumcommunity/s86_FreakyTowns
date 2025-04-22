import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
    created_by: ""
  });
  const [errors, setErrors] = useState({});

  const townToEdit = location.state?.town;
  const API_URL = "http://localhost:3000/api/towns";

  // Fetch users for created_by dropdown
  useEffect(() => {
    axios.get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  useEffect(() => {
    if (townToEdit) {
      setFormData({
        name: townToEdit.name,
        description: townToEdit.description,
        country: townToEdit.country,
        created_by: townToEdit.created_by?._id || ""
      });
    }
  }, [townToEdit]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.length < 3) newErrors.name = "Minimum 3 characters.";

    if (!formData.description.trim()) newErrors.description = "Description is required.";
    else if (formData.description.length < 10) newErrors.description = "Minimum 10 characters.";

    if (!formData.country.trim()) newErrors.country = "Country is required.";
    else if (formData.country.length < 2) newErrors.country = "Minimum 2 characters.";

    if (!formData.created_by) newErrors.created_by = "Please select a creator.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (townToEdit) {
        await axios.put(`${API_URL}/${townToEdit._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Go back functionality
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        >
          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded mb-6"
          >
            🔙 Go Back
          </button>

          <h2 className="text-2xl font-bold mb-4">
            {townToEdit ? "Edit Town" : "Add New Town"}
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`border p-2 mb-1 block w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`border p-2 mb-1 block w-full ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <p className="text-red-500 text-sm mb-4">{errors.description}</p>}

          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className={`border p-2 mb-1 block w-full ${errors.country ? "border-red-500" : ""}`}
          />
          {errors.country && <p className="text-red-500 text-sm mb-4">{errors.country}</p>}

          <select
            value={formData.created_by}
            onChange={(e) => setFormData({ ...formData, created_by: e.target.value })}
            className={`border p-2 mb-4 block w-full ${errors.created_by ? "border-red-500" : ""}`}
          >
            <option value="">Select Creator</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
          {errors.created_by && <p className="text-red-500 text-sm mb-4">{errors.created_by}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded w-full"
          >
            {townToEdit ? "Update Town" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
