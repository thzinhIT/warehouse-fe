import axios from "axios";
import ApiEndPoint from "./api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});
api.interceptors.request.use(
  (config) => {
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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}${ApiEndPoint.REFRESHTOKEN}`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data.accessToken;

        localStorage.setItem("token", newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
      }
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
