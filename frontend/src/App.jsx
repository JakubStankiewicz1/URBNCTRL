import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home/Home';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <div className='app'>

      <Navbar />

      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App