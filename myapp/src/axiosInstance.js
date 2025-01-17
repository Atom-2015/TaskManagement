import axios from 'axios';

// Base URL dynamically set hota hai environment variables se
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Environment variable
  timeout: 5000, // Optional: Timeout 5 seconds
  headers: {
    'Content-Type': 'application/json', // Optional:  
  },
});

export default axiosInstance;
