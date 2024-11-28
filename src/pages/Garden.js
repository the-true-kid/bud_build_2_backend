import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PlantCard from '../components/PlantCard';

const Garden = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in to see your garden.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/user-plants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched plants:', response.data); // Debug API response
        setPlants(response.data);
      } catch (error) {
        console.error('Error fetching plants:', error);
        alert('Failed to fetch your plants.');
      }
    };

    fetchPlants();
  }, []);

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

      setPlants(plants.filter((userPlant) => userPlant.user_plant_id !== userPlantId));
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
              userPlant ? (
                <PlantCard
                  key={userPlant.user_plant_id}
                  plant={userPlant}
                  onDelete={() => handleDeletePlant(userPlant.user_plant_id)}
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
