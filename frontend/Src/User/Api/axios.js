import axios from "axios";

// ==========================================================
// Axios Instance
// ==========================================================
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// ==========================================================
// Request Interceptor
// Automatically attach JWT Access Token
// ==========================================================
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==========================================================
// Response Interceptor
// Handle common API errors
// ==========================================================
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized. Please login again.");
                    break;

                case 403:
                    console.error("Forbidden.");
                    break;

                case 404:
                    console.error("Resource not found.");
                    break;

                case 500:
                    console.error("Internal server error.");
                    break;

                default:
                    console.error(error.response.data);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
