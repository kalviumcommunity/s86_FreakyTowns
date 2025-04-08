import React from "react";
import TownCard from "../components/TownCard";

export default function Dashboard() {
  const dummyTowns = [
    {
      name: "Boring",
      description: "Despite its name, Boring is a lovely little town in Oregon with a friendly community and picturesque surroundings.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwkSwkvGKDYFmt5FprErCX0uKLG0wlLqIa1Q&s",
      location: "Oregon, USA",
    },
    {
      name: "Dull",
      description: "Known for its partnership with Boring, Oregon, this small Scottish village embraces its ironic name.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnyVJ1iLu6jdXi3jmgW14ePnZY8ksUKuifrA&s",
      location: "Scotland, UK",
    },
    {
      name: "Truth or Consequences",
      description: "Originally named Hot Springs, this town was renamed after a 1950s radio show contest.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN2Q3isrFtPbGruumSw07SCn42l_ebkEtUHQ&s",
      location: "New Mexico, USA",
    },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyTowns.map((town, index) => (
            <TownCard
              key={index}
              name={town.name}
              description={town.description}
              image={town.image}
              location={town.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
