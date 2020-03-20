import React, { Component } from 'react'
import * as moment from 'moment'
import 'bulma/css/bulma.css'
import './App.css'

import axios from 'axios'
const API_URL = 'https://api.nasa.gov/insight_weather/?api_key=xem3ovPgeh9zWrw3fOyY4tTldhimR3ckKqnk9UoC&feedtype=json&ver=1.0'

class App extends Component {
  state = {
    marsdata: [],
    isLoading: true,
    errors: null
  }

  /**
   * Function to filter data retrieved by axios into workable array of data
   */
  filterData() {
    const url = `${API_URL}`
    const filteredData = []

    axios.get(url).then(response => response.data)
    .then((data) => {
      const sols = data['sol_keys']
      console.log(sols)
      for (const sol in data) {
        if (sols.indexOf(sol) > -1) {
          // console.log('Sol: ' + sol)
          // console.log('Date: ' + data[sol]['First_UTC'])
          // console.log('Temp: ' + data[sol]['AT']['av'] + " F")
          // console.log('--------------------------------------------')
          filteredData.push({
            sol: `${sol}`,
            date: data[sol]['First_UTC'],
            temp: data[sol]['AT']['av']
          })
        }
      }
      this.setState({
        marsdata: filteredData,
        isLoading: false
      })
      console.log(this.state.marsdata)
      console.log(filteredData)
    })
    .catch(error => this.setState({ error, isLoading: false }))
  }

  /**
   * Function to handle hamburger menu action
   */
  initNavMenu() {
    document.addEventListener('DOMContentLoaded', () => {

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
    
    });
  }

  componentDidMount() {
    this.filterData()
    this.initNavMenu()
  }
  
  render() {
    const marsdata = this.state.marsdata
    const isLoading = this.state.isLoading
    
    return (
      <React.Fragment>
        {/* START NAV */}
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
                  <a href="https://github.com/citizenofearth/marstemp.git" target="_blank" rel="noopener noreferrer" className="button is-success is-inverted">
                    <span className="icon">
                      <i className="ion-ionic"></i>
                    </span>
                    <span>Code</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAV */}

        <div className="container">
          <section className="articles row columns">
            <div className="column is-8 is-offset-2">
              {!isLoading ? (
                marsdata.map(marstemp => {
                  const { sol, date, temp } = marstemp
                  return (
                    /* START ARTICLE */
                    <div className="card article" key={sol}>
                      <div className="card-content" key={sol}>
                        <div className="sol" key={sol}>
                          <h2>Sol: {sol}</h2>
                          <p>Earth date: {moment(date).format('LLLL')}</p>
                          <p>Temperature: {temp} °Fahrenheit</p>
                        </div>
                      </div>
                    </div>
                    /* END ARTICLE */
                  )
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </section>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
