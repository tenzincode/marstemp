import React, { Component } from 'react'
import './App.css'

import axios from 'axios'
const API_URL = 'https://api.nasa.gov/insight_weather/?api_key=xem3ovPgeh9zWrw3fOyY4tTldhimR3ckKqnk9UoC&feedtype=json&ver=1.0'

class App extends Component {
  state = {
    marsdata: [],
    isLoading: true,
    errors: null
  }

  componentDidMount() {
    const url = `${API_URL}`
    const filteredData = []
    axios.get(url).then(response => response.data)
    .then((data) => {
      const sols = data['sol_keys']
      console.log(sols)
      for (const sol in data) {
        if (sols.indexOf(sol) > -1) {
          console.log('Sol: ' + sol)
          console.log('Date: ' + data[sol]['First_UTC'])
          console.log('Temp: ' + data[sol]['AT']['av'] + " F")
          console.log('--------------------------------------------')
          // filteredData[sol] = {
          //   date: data[sol]['First_UTC'],
          //   temp: data[sol]['AT']['av']``
          // }
        }
      }

      this.setState({
        marsdata: filteredData,
        isLoading: false
      })
      console.log(this.state.marsdata)
    })

    .catch(error => this.setState({ error, isLoading: false }))
  }
  
  render() {
    const marsdata = this.state.marsdata
    const isLoading = this.state.isLoading
    
    return (
      <React.Fragment>
        <div>
          <h1>Mars Temps</h1>
          {!isLoading ? (
            marsdata.map(marstemp => {
              const { sol, date, temp } = marstemp
              return (
                <div key={sol}>
                  <h2>{date}}</h2>
                  <p>{temp}</p>
                </div>
              )
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default App;
