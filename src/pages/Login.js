import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link for navigation
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);  // Store JWT token
      navigate('/garden');  // Redirect to garden view
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-green-700">Bud.</h1>
          <p className="text-lg text-green-500">your <span className="text-green-600">plant</span> <span className="text-green-800">companion</span></p>
        </div>

        {/* Login Form */}
        <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        {/* Register Button */}
        <div className="text-center mt-4">
          <p className="text-gray-500">Don't have an account?</p>
          <Link to="/register">
            <button className="mt-2 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition w-full">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
