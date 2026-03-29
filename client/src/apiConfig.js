// src/apiConfig.js
// This ensures that we use the environment variable if available, otherwise fallback to the production backend.
export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://cookmeet-recipe-backend.onrender.com";
