import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PlantCard from '../components/PlantCard';

const Garden = () => {
  const [plants, setPlants] = useState([]);
  const [streak, setStreak] = useState(parseInt(localStorage.getItem('streak')) || 0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

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

        // Fetch days till watering for each plant
        const updatedPlants = await Promise.all(
          response.data.map(async (userPlant) => {
            try {
              const daysResponse = await axios.get(`http://localhost:5000/user-plants/${userPlant.id}/days-till-watering`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return {
                ...userPlant,
                daysTillWatering: daysResponse.data.daysTillNextWatering,
              };
            } catch (error) {
              console.error(`Error fetching days till watering for plant ${userPlant.id}:`, error);
              return { ...userPlant, daysTillWatering: 'Unknown' };
            }
          })
        );

        setPlants(updatedPlants);
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

      setPlants(plants.filter((userPlant) => userPlant.id !== userPlantId));
      alert('Plant removed from your garden.');
    } catch (error) {
      console.error('Error removing plant:', error);
      alert('Failed to remove the plant.');
    }
  };

  const handleWateringConfirmation = async (userPlantId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first.');
      return;
    }

    try {
      // Confirm the watering through the backend
      await axios.put(`http://localhost:5000/user-plants/${userPlantId}/confirm-watering`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update streak
      setStreak(streak + 1);
      localStorage.setItem('streak', streak + 1);
      alert('Watering confirmed!');

      // Update the plant's daysTillWatering to its watering frequency after confirmation
      const updatedPlants = plants.map((plant) => {
        if (plant.id === userPlantId) {
          return {
            ...plant,
            daysTillWatering: plant.Plant.watering_frequency,
          };
        }
        return plant;
      });

      setPlants(updatedPlants);
    } catch (error) {
      console.error('Error confirming watering:', error);
      alert('Failed to confirm watering.');
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    alert(`Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}.`);
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-semibold text-green-700 text-center mb-10">Your Garden</h1>

        <div className="text-center mb-6">
          <p>Watering Streak: {streak} days</p>
          <div className="flex justify-center items-center">
            <label className="mr-2">Enable Notifications:</label>
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={toggleNotifications}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plants.length > 0 ? (
            plants.map((userPlant) => (
              userPlant && userPlant.Plant ? (
                <PlantCard
                  key={userPlant.id}
                  plant={userPlant.Plant}
                  daysTillWatering={userPlant.daysTillWatering}
                  onDelete={() => handleDeletePlant(userPlant.id)}
                  onWateringConfirm={() => handleWateringConfirmation(userPlant.id)}
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
