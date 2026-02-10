import axios from "axios";
import type { InternalAxiosRequestConfig} from "axios";

const NEXT_PUBLIC_TEAM_ID = "21-2";
const NEXT_PUBLIC_API_BASE_URL = `https://sp-taskify-api.vercel.app/${NEXT_PUBLIC_TEAM_ID}`;

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if(typeof window !== "undefined") {
    const token = (localStorage.getItem("accessToken") ?? "").trim();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;