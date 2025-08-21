import axios from "axios";
import ApiEndPoint from "./api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

// Add request interceptor for debugging (remove in production)
api.interceptors.request.use(
  (config) => {
    // Debug logging (comment out in production)
    // console.log('🚀 API Request:', {
    //   baseURL: config.baseURL,
    //   url: config.url,
    //   method: config.method,
    //   fullURL: `${config.baseURL}${config.url}`
    // });

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (response) => {
    // Debug logging (comment out in production)
    // console.log('✅ API Response Success:', {
    //   url: response.config.url,
    //   status: response.status
    // });
    return response;
  },
  async (error) => {
    // Debug logging for errors (comment out in production)
    // console.error('❌ API Response Error:', {
    //   url: error.config?.url,
    //   status: error.response?.status,
    //   message: error.message,
    //   fullURL: `${error.config?.baseURL}${error.config?.url}`
    // });

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}${ApiEndPoint.REFRESHTOKEN}`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data?.data?.token;

        localStorage.setItem("token", newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {}
    }
    return Promise.reject(error);
  }
);

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
