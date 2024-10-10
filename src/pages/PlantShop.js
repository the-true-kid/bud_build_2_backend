import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import NavBar from '../components/NavBar';

const PlantShop = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function

  // Fetch plants from backend on component mount
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/plants');  // Ensure this URL is correct
        setPlants(response.data);  // Update the plants state with the fetched data
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    };

    fetchPlants();  // Call fetchPlants function
  }, []);  // Empty dependency array to run once on component mount

  const handleAddPlant = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/user-plants',  // Ensure this URL is correct
        { plant_id: selectedPlant },
        { headers: { Authorization: `Bearer ${token}` } }  // Send JWT token
      );
      alert('Plant added to your garden!');
      navigate('/garden');  // Redirect to the Garden page after successful addition
    } catch (error) {
      console.error('Error adding plant to garden:', error);
      alert('Failed to add plant to your garden.');
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <NavBar />
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-semibold text-green-700 text-center mb-10">Plant Shop</h1>
        
        <div className="flex justify-center mb-6">
          <select
            onChange={(e) => setSelectedPlant(e.target.value)}
            value={selectedPlant}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          >
            <option value="">Select a plant</option>
            {plants.map((plant) => (
              <option key={plant.id} value={plant.id}>{plant.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleAddPlant}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Add to Garden
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantShop;
