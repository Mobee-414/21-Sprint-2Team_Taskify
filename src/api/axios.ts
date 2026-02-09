import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

// 추후에 .env.local과 같은 파일에 이동 필요
const NEXT_PUBLIC_TEAM_ID = "21-2";
const NEXT_PUBLIC_API_BASE_URL = `https://sp-taskify-api.vercel.app/${NEXT_PUBLIC_TEAM_ID}`;

const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;

  // const token = localStorage.getItem("accessToken"); // 나중에 주석 해제
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjUzMywidGVhbUlkIjoiMjEtMiIsImlhdCI6MTc3MDUzMzA2MiwiaXNzIjoic3AtdGFza2lmeSJ9.yWo_CRBOMjTDpzm1eIwwRkemjN_TPZxM37KFEtNjUgw"; // 임시로 박아두기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
