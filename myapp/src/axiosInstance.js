import axios from 'axios';

// Base URL dynamically set hota hai environment variables se
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL, // Environment variable
  // baseURL: "http://162.240.155.148/apiw/",
  timeout: 5000, // Optional: Timeout 5 seconds
  headers: {
    'Content-Type': 'application/json', // Optional:  
    'x-auth-token':localStorage.getItem('token')
  },
});

export default axiosInstance;
