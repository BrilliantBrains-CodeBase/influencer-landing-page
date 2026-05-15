import axios from "axios";
import { getCsrfToken, clearCsrfToken } from "./csrf";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 🚫 Never intercept auth endpoints
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/me")
    ) {
      return Promise.reject(error);
    }

    // 🔁 CSRF retry
    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.toLowerCase().includes("csrf")
    ) {
      clearCsrfToken();
      const csrfToken = await getCsrfToken();
      originalRequest.headers["X-CSRF-Token"] = csrfToken;
      return api(originalRequest);
    }

    // 🔁 Token refresh (once)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
