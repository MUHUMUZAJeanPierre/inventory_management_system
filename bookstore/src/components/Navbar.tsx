import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 p-4 shadow-md fixed top-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-white text-xl font-bold">Learning Platform</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/about" className="text-white hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
}
