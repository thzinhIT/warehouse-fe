import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken"); // hoặc sessionStorage, cookie, v.v.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
