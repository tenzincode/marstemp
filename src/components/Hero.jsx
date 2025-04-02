import React from 'react';

const Hero = () => {
  return (
    <section className="hero is-medium is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h2 className="has-text-white title">Latest Weather at Elysium Planitia</h2>
          <p className="has-text-white subtitle">
            Daily weather measurements (temperature, wind, pressure) taken by InSight 
            on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
