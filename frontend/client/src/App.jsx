import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        {/* Dashboard Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Form Page */}
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}
