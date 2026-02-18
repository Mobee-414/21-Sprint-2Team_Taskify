import axios from "axios";
import type { InternalAxiosRequestConfig} from "axios";

const NEXT_PUBLIC_TEAM_ID = "21-2";
const NEXT_PUBLIC_API_BASE_URL = `https://sp-taskify-api.vercel.app/${NEXT_PUBLIC_TEAM_ID}`;

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
});
// 요청 인터셉터: 모든 요청에 accessToken 자동 첨부
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = (localStorage.getItem("accessToken") ?? "").trim();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 발생시 자동 로그아웃 
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      if(error.response?.status === 401) {
        console.log("토큰 만료 or 인증 실패 로 자동로그아웃 됩니다")

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;