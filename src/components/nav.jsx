import React from 'react';

export const Nav = () => {
  return (
    /* START NAV */
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <h1 className="title">MARŠTEMP</h1>
          </a>
          <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-end">
            <a href="/" className="navbar-item is-active">
              Home
            </a>
            <a href="/" className="navbar-item">
              Data Visualizations
            </a>
            <a href="/" className="navbar-item">
              Documentation
            </a>
            <span className="navbar-item">
              <a href="https://github.com/citizenofearth/marstemp.git" target="_blank" rel="noopener noreferrer" className="button is-black">
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>Code</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
    /* END NAV */
  );
}