import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [towns, setTowns] = useState([]);
  const [editingTown, setEditingTown] = useState(null); // State to track the town being edited
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api/towns";

  // Fetch towns from the server
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

  // Delete a town
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTowns(towns.filter((town) => town._id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting town:", error);
    }
  };

  // Edit a town
  const handleEdit = (town) => {
    setEditingTown(town);
    navigate("/form", { state: { town } }); // Redirect to the form page with town data
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full bg-purple-800 py-4 text-white flex justify-between items-center px-8">
        <span className="text-xl font-bold">Towns Dashboard</span>
        <button
          onClick={() => navigate("/form")}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Add New Town
        </button>
      </nav>
      <div className="p-8">
        <h4 className="text-2xl font-bold text-center mb-6">Towns List</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {towns.map((town) => (
            <div key={town._id} className="bg-blue-300 p-4 rounded shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{town.name}</h3>
                <div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
