/**
 * Axios client configuration.
 * Provides a centralized HTTP client with base configuration,
 * interceptors, and error handling.
 */

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

/**
 * Base URL for API requests.
 * Falls back to localhost if environment variable is not set.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Configured Axios instance for API calls.
 * Automatically includes base URL and handles common scenarios.
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor.
 * Can be used to add auth tokens, log requests, etc.
 */
axiosClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor.
 * Handles successful responses and errors globally.
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error('[API Error Response]', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('[API No Response]', error.message);
    } else {
      // Error in request setup
      console.error('[API Request Setup Error]', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
