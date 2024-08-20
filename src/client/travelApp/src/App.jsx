import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './NavBar';
import Login from './Login';

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h3>Page not found!</h3>} />
      </Routes>
    </>
  )
};

export default App;
