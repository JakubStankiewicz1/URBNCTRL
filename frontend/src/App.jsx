import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home/Home';
import CustomCursor from './components/CustomCursor/CustomCursor';

const App = () => {
  return (
    <div className='app'>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App