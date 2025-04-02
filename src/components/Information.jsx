import React from 'react';

const Information = () => {
  return (
    <section>
      <div className="container">
        <div className="card">
          <div className="card-content">
            <h2 className="has-text-white title">InSight — Studying the 'Inner Space' of Mars</h2>
            <p className="has-text-white subtitle">
              InSight, short for Interior Exploration using Seismic Investigations, Geodesy and Heat Transport, 
              is a Mars lander designed to give the Red Planet its first thorough checkup since it formed 4.5 billion years ago. 
              It is the first outer space robotic explorer to study in-depth the "inner space" of Mars: its crust, mantle, and core.
            </p>
            <p className="has-text-white subtitle">
              Studying Mars' interior structure answers key questions about the early formation of rocky planets in our inner 
              solar system - Mercury, Venus, Earth, and Mars - more than 4 billion years ago, as well as rocky exoplanets. 
              InSight also measures tectonic activity and meteorite impacts on Mars today.
            </p>
            <p className="has-text-white subtitle">
              The lander uses cutting edge instruments, to delve deep beneath the surface and seek the fingerprints of the 
              processes that formed the terrestrial planets. It does so by measuring the planet's "vital signs": its "pulse" 
              (seismology), "temperature" (heat flow), and "reflexes" (precision tracking).
            </p>
            <p className="has-text-white subtitle">
              This mission is part of NASA's Discovery Program for highly focused science missions that ask critical questions 
              in solar system science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
