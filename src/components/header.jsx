import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-500 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Patient Management System</h1>
        <nav className="relative">
          <div className="flex items-center">
            <Link to="/" className="mx-4 hover:underline transition duration-200 ease-in-out">Home</Link>
            <Link to="/add-patient" className="mx-4 hover:underline transition duration-200 ease-in-out">Add Patient</Link>
            <div className="relative">
              <button onClick={toggleDropdown} className="mx-4 focus:outline-none">
                <span className="hover:underline">More</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                  <Link to="/patient-details" className="block px-4 py-2 hover:bg-teal-100">Patient Details</Link>
                  <Link to="/reports" className="block px-4 py-2 hover:bg-teal-100">Reports</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-teal-100">Settings</Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
