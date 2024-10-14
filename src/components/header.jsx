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
        <h1 className="text-2xl font-bold tracking-wide">HealthPlus</h1>
        <nav className="relative">
          <div className="flex items-center">
            <Link to="/home" className="mx-4 hover:underline transition duration-200 ease-in-out">Home</Link>
            <Link to="/" className="mx-4 hover:underline transition duration-200 ease-in-out">Services</Link>
            <Link to="/" className="mx-4 hover:underline transition duration-200 ease-in-out">Apointments</Link>
            <Link to="/" className="mx-4 hover:underline transition duration-200 ease-in-out">About us</Link>     <div className="relative">
              
            
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
