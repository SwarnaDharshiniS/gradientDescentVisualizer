import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Visualizer from './pages/Visualizer';
import SavedRuns from './pages/SavedRuns';

export default function App(){
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/visualizer">Visualizer</Link>
        <Link to="/saved">Saved Runs</Link>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/visualizer" element={<Visualizer/>} />
          <Route path="/saved" element={<SavedRuns/>} />
        </Routes>
      </main>
    </div>
  );
}
