import React, { useState } from 'react';

const PlantCard = ({ plant, daysTillWatering, onDelete, onWateringConfirm }) => {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    onWateringConfirm();
    setShowModal(false);
  };

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
      <p className="text-sm text-gray-600">
        Days Till Watering: {daysTillWatering !== undefined ? daysTillWatering : 'Calculating...'}
      </p>

      <button
        className="bg-green-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-green-600 transition"
        onClick={() => setShowModal(true)}
      >
        Watered Today
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content bg-white p-6 rounded-lg shadow-md text-center">
            <p>Confirm that you watered your plant today?</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleConfirm}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantCard;
