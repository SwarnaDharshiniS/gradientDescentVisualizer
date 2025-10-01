import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-container home-page">
      <div className="home-content">
        <h1 className="home-title">Gradient Descent Visualizer</h1>
        <p className="home-subtitle">
          Explore how gradient descent learns step by step!  
          Adjust learning rate, iterations, and initial values.  
          Save your experiments to MongoDB and compare runs visually.
        </p>

        <div className="features-card">
          <h3>Features</h3>
          <ul>
            <li>Step-by-step gradient descent animation</li>
            <li>Save and revisit experiments</li>
            <li>Interactive loss vs. iteration chart</li>
          </ul>
        </div>

        <Link to="/visualizer" className="btn home-btn">
          Open Visualizer
        </Link>
      </div>
    </div>
  );
}
