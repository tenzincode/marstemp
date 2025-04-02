import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Use environment variable for API key
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`;

/**
 * Custom hook for fetching Mars weather data from NASA's InSight API
 * @returns {Object} Object containing weather data, loading state, error state, and refresh function
 */
const useMarsWeather = () => {
  const [marsdata, setMarsdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches and processes Mars weather data
   */
  const fetchMarsWeather = useCallback(async () => {
    // Reset states before fetching
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      
      // Process the data
      let filteredData = [];
      
      // Check if data has the expected structure
      if (!data.sol_keys) {
        throw new Error('API response format has changed or is invalid');
      }
      
      // Use sol_keys to access the available sols
      if (data.sol_keys && data.sol_keys.length > 0) {
        filteredData = data.sol_keys.map(sol => {
          if (!data[sol]) return null;
          
          return {
            sol: sol,
            date: data[sol]['First_UTC'],
            temp: data[sol]['AT'] ? data[sol]['AT']['av'] : null,
            // Add more weather data properties as needed
            pressure: data[sol]['PRE'] ? data[sol]['PRE']['av'] : null,
            windSpeed: data[sol]['HWS'] ? data[sol]['HWS']['av'] : null,
          };
        }).filter(Boolean); // Remove any null entries
      }
      
      setMarsdata(filteredData);
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError({
          type: 'response',
          status: error.response.status,
          message: `Server error: ${error.response.status}`,
          details: error.response.data
        });
      } else if (error.request) {
        // The request was made but no response was received
        setError({
          type: 'request',
          message: 'No response from server. Please check your connection.',
          details: error.request
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        setError({
          type: 'setup',
          message: error.message || 'An unknown error occurred',
          details: error
        });
      }
      
      console.error('Error fetching Mars weather data:', error);
    } finally {
      // Always set loading to false when done, regardless of success or failure
      setIsLoading(false);
    }
  }, []); // No dependencies as API_URL is constant

  // Initial data fetch on component mount
  useEffect(() => {
    fetchMarsWeather();
  }, [fetchMarsWeather]);

  // Return all necessary states and the refresh function
  return { 
    marsdata, 
    isLoading, 
    error,
    refresh: fetchMarsWeather // Expose refresh function to allow manual refetching
  };
};

export default useMarsWeather;
