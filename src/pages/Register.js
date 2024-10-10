import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // State to track any validation or registration errors
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password) {
      setError('All fields must be filled');
      return;
    }

    try {
      // Send POST request to register the user
      await axios.post('http://localhost:5000/auth/register', { username, email, password });

      // After successful registration, log the user in automatically
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);  // Store JWT token

      // Redirect to garden after successful registration and login
      navigate('/garden');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your inputs or try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-green-700 text-center mb-6">Register</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}  {/* Display error message */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
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
            Register
          </button>
        </form>

        {/* Back to Login Button */}
        <div className="text-center mt-4">
          <Link to="/login">
            <button className="mt-2 p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition w-full">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

