import axios from 'axios';

// Task 1: Axios instance configuration
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach Mock Authorization Header
apiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Bearer MOCK_STUDENT_TOKEN_123';
    console.log(`[API Request] ${config.method.toUpperCase()} -> ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize returned data and errors
apiClient.interceptors.response.use(
  (response) => response.data, // Unwraps response data wrapper directly
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected API error occurred',
      statusCode: error.response?.status || 500
    };
    return Promise.reject(customError);
  }
);

export default apiClient;