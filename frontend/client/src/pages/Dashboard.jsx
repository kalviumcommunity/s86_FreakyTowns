import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [towns, setTowns] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("All");
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api/towns";

  // Fetch all users for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Fetch towns based on selected user filter
  useEffect(() => {
    const fetchTowns = async () => {
      try {
        const url =
          selectedUser === "All" || !selectedUser
            ? API_URL
            : `${API_URL}?created_by=${selectedUser}`;

        const response = await axios.get(url);
        setTowns(response.data);
      } catch (error) {
        console.error("Error fetching towns:", error);
      }
    };
    fetchTowns();
  }, [selectedUser]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTowns(towns.filter((town) => town._id !== id));
    } catch (error) {
      console.error("Error deleting town:", error);
    }
  };

  const handleEdit = (town) => {
    navigate("/form", { state: { town } });
  };

  const handleReview = (town) => {
    navigate("/review", { state: { town } });
  };

  // Add Go Back functionality
  const handleGoBack = () => {
    navigate('/'); // Navigate back to the previous page
  };

  // Add Town button click handler
  const handleAddTown = () => {
    navigate("/form"); // Navigate to form page for adding a new town
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        {/* Buttons Section */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            🔙 Go Back
          </button>
          <button
            onClick={handleAddTown}
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            + Add New Town
          </button>
        </div>

        {/* User Filter Dropdown */}
        <div className="flex justify-center mb-6">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 rounded shadow bg-white"
          >
            <option value="All">All Users</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <h4 className="text-2xl font-bold text-center mb-6">Towns List</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {towns.map((town) => (
            <div key={town._id} className="bg-blue-300 p-4 rounded shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{town.name}</h3>
                <div>
                  <button
                    onClick={() => handleReview(town)}
                    className="bg-purple-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleEdit(town)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(town._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{town.description}</p>
              <p className="text-gray-500 mt-2">📍 {town.country}</p>
              <p className="text-gray-700 mt-1 font-semibold">
                👤 Created by: {town.created_by?.username || "Unknown"}
              </p>
              {town.reviews && town.reviews.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold">Reviews:</h4>
                  <ul className="list-disc pl-4">
                    {town.reviews.map((review, index) => (
                      <li key={index} className="text-gray-700">
                        {review}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
