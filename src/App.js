import React, { Component } from 'react'
import './App.css'

import axios from 'axios'
const API_URL = 'https://api.nasa.gov/insight_weather/?api_key=xem3ovPgeh9zWrw3fOyY4tTldhimR3ckKqnk9UoC&feedtype=json&ver=1.0'

class App extends Component {
  state = {
    marsdata: [],
    sols: [],
    dates: [],
    temps: [],
    isLoading: true,
    errors: null
  }

  componentDidMount() {
    const url = `${API_URL}`
    axios.get(url).then(response => response.data)
    .then((data) => {
      let filteredTemps = []
      let filteredDates = []

      // JSON filter temperatures
      for (var x in data) {
        if (data['sol_keys'].indexOf(x) > -1) {
          filteredTemps.push(data[x]['AT']['av'])
        }
      }

      // JSON filter earth dates
      for (var y in data) {
        if (data['sol_keys'].indexOf(y) > -1) {
          filteredDates.push(data[y]['First_UTC'])
        }
      }

      this.setState({
        marsdata: data,
        sols: data['sol_keys'],
        temps: filteredTemps,
        dates: filteredDates,
        isLoading: false
      })
      //console.log(this.state.marsdata)
    })

    .catch(error => this.setState({ error, isLoading: false }))
  }
  
  render() {
    const marsdata = this.state.marsdata
    const sols = this.state.sols
    const temps = this.state.temps
    const dates = this.state.dates
    const isLoading = this.state.isLoading
    
    console.log('sols:')
    console.log(sols)
    console.log('temps:')
    console.log(temps)
    console.log('dates:')
    console.log(dates)
    
    return (
      <React.Fragment>
        <div>
          {!isLoading ? (
            <div>
              <h1>Mars Temps</h1>
              
              {temps}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default App;
