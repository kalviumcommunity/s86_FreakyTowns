import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import FormPage from "./pages/FormPage";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserEntityFilter from './components/UserEntityFilter.jsx';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sqltest" element={<UserEntityFilter/>} />
      </Routes>
    </Router>
  );
}
