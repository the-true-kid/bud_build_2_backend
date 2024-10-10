import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PlantCard from '../components/PlantCard';  // Import PlantCard component

const Garden = () => {
  const [plants, setPlants] = useState([]);

  // Fetch user's plants when the component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in to see your garden.');
        return;
      }

      try {
        // Make an authenticated request to fetch the user's plants
        const response = await axios.get('http://localhost:5000/user-plants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(response.data);  // Update plants state with response data
      } catch (error) {
        console.error('Error fetching plants:', error);
        alert('Failed to fetch your plants.');
      }
    };

    fetchPlants();
  }, []);

  // Handle plant deletion
  const handleDeletePlant = async (userPlantId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/user-plants/${userPlantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted plant from the local state
      setPlants(plants.filter((userPlant) => userPlant.id !== userPlantId));  // Use userPlant.id here
      alert('Plant removed from your garden.');
    } catch (error) {
      console.error('Error removing plant:', error);
      alert('Failed to remove the plant.');
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-semibold text-green-700 text-center mb-10">Your Garden</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plants.length > 0 ? (
            plants.map((userPlant) => (
              userPlant && userPlant.Plant ? (
                <PlantCard
                  key={userPlant.id}  // Use userPlant.id instead of plant.id
                  plant={userPlant.Plant}  // Pass the plant object
                  onDelete={() => handleDeletePlant(userPlant.id)}  // Use userPlant.id for deletion
                />
              ) : null
            ))
          ) : (
            <p className="text-center text-gray-500">No plants found in your garden.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Garden;
