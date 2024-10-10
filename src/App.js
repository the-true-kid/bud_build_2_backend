import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Garden from './pages/Garden';
import PlantShop from './pages/PlantShop';


const App = () => {


  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/plant-shop" element={<PlantShop />} />
        <Route path="*" element={<Login />} />  {/* Redirect to garden by default */}
      </Routes>
    </Router>
  );
};

export default App;
