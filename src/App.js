import React, { useState, useEffect, useTransition } from 'react'
import * as moment from 'moment'
import { Nav } from './components/nav'
import 'bulma/css/bulma.css'
import './App.css'

import axios from 'axios'
const API_URL = 'https://api.nasa.gov/insight_weather/?api_key=REMOVED_API_KEY&feedtype=json&ver=1.0'

function App() {
  const [marsdata, setMarsdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isPending, startTransition] = useTransition();

  /**
   * Function to filter data retrieved by axios into workable array of data
   */
  const filterData = () => {
    startTransition(async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log(data);
        
        let filteredData = [];
        // Use sol_keys to access the available sols
        if (data.sol_keys && data.sol_keys.length > 0) {
          data.sol_keys.forEach(sol => {
            if (data[sol]) {
              console.log('Sol: ', sol);
              console.log('Date: ', data[sol]['First_UTC']);
              console.log('Temp: ', data[sol]['AT'] ? data[sol]['AT']['av'] : null, " F");
              console.log('--------------------------------------------');
              
              filteredData.push({
                sol: sol,
                date: data[sol]['First_UTC'],
                temp: data[sol]['AT'] ? data[sol]['AT']['av'] : null
              });
            }
          });
        }
        
        setMarsdata(filteredData);
        setIsLoading(false);
        console.log('marsdata: ', marsdata);
        console.log('filteredData: ', filteredData);
      } catch (error) {
        setErrors(error);
        setIsLoading(false);
      }
    });
  };

  /**
   * Function to handle hamburger menu action
   */
  const initNavMenu = () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  }

  useEffect(() => {
    filterData();
    
    // DOMContentLoaded equivalent in React
    document.addEventListener('DOMContentLoaded', initNavMenu);
    
    // Cleanup function
    return () => {
      document.removeEventListener('DOMContentLoaded', initNavMenu);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount
  
  return (
    <>
      <section className="content-wrap">
        <Nav />

        {/* START HERO */}
        <section className="hero is-medium is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h2 className=" has-text-white title">Latest Weather at Elysium Planitia</h2>
              <p className=" has-text-white subtitle">Daily weather measurements (temperature, wind, pressure) taken by InSight on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator.</p>
            </div>
          </div>
        </section>
        {/* END HERO */}

        {/* START MAIN */}
        <section className="container">
          {/* START WEATHER */}
          <section className="articles">
            <div className="row columns">
              {!isLoading ? (
                marsdata.map(marstemp => {
                  const { sol, date, temp } = marstemp
                  return (
                    <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd" key={sol}>
                      <div className="card article">
                        <div className="card-content">
                          <div className="sol">
                            <h3 className="title is-5 has-text-white">Sol: {sol}</h3>
                            <p>Earth date: {date ? moment(date).format('LLLL') : 'N/A'}</p>
                            <p>Temperature: {temp ? `${temp} °Fahrenheit` : 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                ) : (
                  <p>Loading...</p>
                  )}
            </div>
          </section>
          {/* END WEATHER */}

          <section>
            <div className="container">
              <div className="card">
                <div className="card-content">
                  <h2 className=" has-text-white title">InSight — Studying the 'Inner Space' of Mars</h2>
                  <p className=" has-text-white subtitle">InSight, short for Interior Exploration using Seismic Investigations, Geodesy and Heat Transport, is a Mars lander designed to give the Red Planet its first thorough checkup since it formed 4.5 billion years ago. It is the first outer space robotic explorer to study in-depth the "inner space" of Mars: its crust, mantle, and core.</p>
                  <p className=" has-text-white subtitle">Studying Mars' interior structure answers key questions about the early formation of rocky planets in our inner solar system - Mercury, Venus, Earth, and Mars - more than 4 billion years ago, as well as rocky exoplanets. InSight also measures tectonic activity and meteorite impacts on Mars today.</p>
                  <p className=" has-text-white subtitle">The lander uses cutting edge instruments, to delve deep beneath the surface and seek the fingerprints of the processes that formed the terrestrial planets. It does so by measuring the planet's "vital signs": its "pulse" (seismology), "temperature" (heat flow), and "reflexes" (precision tracking).</p>
                  <p className=" has-text-white subtitle">This mission is part of NASA's Discovery Program for highly focused science missions that ask critical questions in solar system science.</p>
                </div>
              </div>
            </div>
          </section>
        </section>
        {/* END MAIN */}

        {/* START FOOTER */}
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Marštemp</strong> by <a href="https://tenzin.ca">Tenzin Namgyal</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
          </div>
        </footer>
        {/* END FOOTER */}
      </section>
    </>
  )
}

export default App;
