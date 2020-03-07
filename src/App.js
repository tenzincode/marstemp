import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
const API_URL = 'https://api.nasa.gov/insight_weather/?api_key=xem3ovPgeh9zWrw3fOyY4tTldhimR3ckKqnk9UoC&feedtype=json&ver=1.0'

class App extends Component {
  state = {
    marstemp: []
  }
  componentDidMount() {
    const url = `${API_URL}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ marstemp: data })
      console.log(this.state.marstemp)
    })
  }
  
  render() {
    return (
      <div className="container">
        <div className="col-xs-8">
          <h1>React Axios Example</h1>
          {JSON.stringify(this.state.marstemp)}
        </div>
       </div>
    )
  }
}

export default App;
