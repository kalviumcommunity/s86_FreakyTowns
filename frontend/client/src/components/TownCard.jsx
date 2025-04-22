import React from "react";

export default function TownCard({ name, description, image, location, created_by }) {
  return (
    <div className="bg-blue-300 p-6 rounded-lg shadow-lg text-center">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-lg text-gray-800">{description}</p>
      <p className="text-md text-gray-600 mt-2">📍 {location}</p>
      <p className="text-sm text-gray-700 mt-1 font-medium">👤 Created by: {created_by}</p>
    </div>
  );
}
