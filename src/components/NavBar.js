import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear JWT token
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav className="bg-green-700 p-4 shadow-md">
      <ul className="flex justify-between items-center max-w-6xl mx-auto">
        
        {/* BUD Logo in the corner */}
        <li>
          <Link to="/garden" className="text-white font-bold text-2xl">
            Bud.
          </Link>
        </li>

        {/* Navigation links */}
        <li className="flex space-x-4">
          <Link to="/garden" className="text-white font-medium hover:text-green-200 transition">
            Garden
          </Link>
          <Link to="/plant-shop" className="text-white font-medium hover:text-green-200 transition">
            Plant Shop
          </Link>
        </li>

        {/* Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
