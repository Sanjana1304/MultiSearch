import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import About from './components/About';

const App = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <div>
        <Header/>
        <Hero/>
      </div>
      }/>
      <Route path="/aboutus" element={<About/>}/>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
