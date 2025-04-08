import React, { useState, useEffect } from "react";
import axios from "axios";
import TownCard from "../components/TownCard";

export default function Dashboard() {
  const [towns, setTowns] = useState([]);
  const [newTown, setNewTown] = useState({ name: "", description: "", country: "" });
  const [editTown, setEditTown] = useState(null); // Holds the town being edited
  const [updatedTown, setUpdatedTown] = useState({ name: "", description: "", country: "" });

  const API_URL = "http://localhost:3000/api/towns"; // Replace with your backend URL if different

  // Fetch towns on component mount
  useEffect(() => {
    const fetchTowns = async () => {
      try {
        const response = await axios.get(API_URL);
        setTowns(response.data);
      } catch (error) {
        console.error("Error fetching towns:", error);
      }
    };

    fetchTowns();
  }, []);

  // Add a new town
  const handleAddTown = async () => {
    try {
      const response = await axios.post(API_URL, newTown);
      setTowns([...towns, response.data]);
      setNewTown({ name: "", description: "", country: "" }); // Reset form
    } catch (error) {
      console.error("Error adding town:", error);
    }
  };

  // Delete a town
  const handleDeleteTown = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTowns(towns.filter((town) => town._id !== id));
    } catch (error) {
      console.error("Error deleting town:", error);
    }
  };

  // Start editing a town
  const handleEditTown = (town) => {
    setEditTown(town._id);
    setUpdatedTown({ name: town.name, description: town.description, country: town.country });
  };

  // Update a town
  const handleUpdateTown = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedTown);
      setTowns(
        towns.map((town) => (town._id === id ? response.data : town))
      );
      setEditTown(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating town:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full bg-purple-800 py-4 text-white flex justify-between items-center px-8">
        <span className="text-xl font-bold">FreakyTowns Dashboard</span>
        <div className="space-x-4">
          <button className="bg-pink-800 text-white font-semibold py-1 px-3 rounded-lg">
            Sign Up
          </button>
          <button className="bg-pink-800 text-white font-semibold py-1 px-3 rounded-lg">
            Login
          </button>
        </div>
      </nav>
      <div className="p-8">
        <h4 className="text-2xl font-bold text-center mb-6">
          "Where in the world? Discover places that are as unique as their names!"
        </h4>
        {/* Form to Add a New Town */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={newTown.name}
            onChange={(e) => setNewTown({ ...newTown, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTown.description}
            onChange={(e) => setNewTown({ ...newTown, description: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Country"
            value={newTown.country}
            onChange={(e) => setNewTown({ ...newTown, country: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddTown} className="bg-green-600 text-white p-2 rounded">
            Add Town
          </button>
        </div>
        {/* Display Town Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {towns.map((town) => (
            <div key={town._id} className="relative">
              {editTown === town._id ? (
                // Edit Mode
                <div className="border p-4 bg-white shadow rounded">
                  <input
                    type="text"
                    placeholder="Name"
                    value={updatedTown.name}
                    onChange={(e) => setUpdatedTown({ ...updatedTown, name: e.target.value })}
                    className="border p-2 mb-2 block w-full"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={updatedTown.description}
                    onChange={(e) => setUpdatedTown({ ...updatedTown, description: e.target.value })}
                    className="border p-2 mb-2 block w-full"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={updatedTown.country}
                    onChange={(e) => setUpdatedTown({ ...updatedTown, country: e.target.value })}
                    className="border p-2 mb-2 block w-full"
                  />
                  <button
                    onClick={() => handleUpdateTown(town._id)}
                    className="bg-blue-600 text-white p-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditTown(null)}
                    className="bg-gray-400 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Display Mode
                <>
                  <TownCard
                    name={town.name}
                    description={town.description}
                    location={town.country}
                  />
                  <button
                    onClick={() => handleEditTown(town)}
                    className="absolute top-2 right-2 bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTown(town._id)}
                    className="absolute top-2 right-14 bg-red-600 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
