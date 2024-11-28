import React from 'react';

const PlantCard = ({ plant, onDelete }) => {
  return (
    <div className="relative border border-gray-200 p-4 rounded-lg shadow-md bg-white">
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm hover:bg-red-600 transition"
        onClick={onDelete}
      >
        X
      </button>

      <h3 className="text-lg font-semibold text-green-700 mb-2">{plant.name}</h3>
      {plant.image && (
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-auto rounded-lg mb-2"
        />
      )}
      <p className="text-sm text-gray-600">Water Interval: Every {plant.water_intervals} days</p>
      <p className="text-sm text-gray-600">Care Info: {plant.care_info}</p>
    </div>
  );
};

export default PlantCard;
