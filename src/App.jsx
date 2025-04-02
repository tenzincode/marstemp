import React, { useEffect } from 'react'
import 'bulma/css/bulma.min.css'
import './App.css'

// Import components
import { Nav } from './components/Nav'
import Hero from './components/Hero'
import WeatherCard from './components/WeatherCard'
import Information from './components/Information'
import Footer from './components/Footer'

// Import custom hook
import useMarsWeather from './hooks/useMarsWeather'

function App() {
  const { marsdata, isLoading, errors } = useMarsWeather();

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
    // DOMContentLoaded equivalent in React
    document.addEventListener('DOMContentLoaded', initNavMenu);

    // Cleanup function
    return () => {
      document.removeEventListener('DOMContentLoaded', initNavMenu);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <section className="content-wrap">
        <Nav />

        {/* Hero Section */}
        <Hero />

        {/* Main Content */}
        <section className="container">
          {/* Weather Cards Section */}
          <WeatherCard marsdata={marsdata} isLoading={isLoading} />

          {/* Information Section */}
          <Information />
        </section>

        {/* Footer */}
        <Footer />
      </section>
    </>
  )
}

export default App;
