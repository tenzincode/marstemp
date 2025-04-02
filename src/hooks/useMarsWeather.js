import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://api.nasa.gov/insight_weather/?api_key=REMOVED_API_KEY&feedtype=json&ver=1.0';

const useMarsWeather = () => {
  const [marsdata, setMarsdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchMarsWeather = async () => {
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
        console.error('Error fetching Mars weather data:', error);
      }
    };

    fetchMarsWeather();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount

  return { marsdata, isLoading, errors };
};

export default useMarsWeather;
