import axios from "./axios";
import type { SignupResponse, LoginResponse } from '@/types/auth.type';

export async function signup(params: {
  email: string;
  nickname: string;
  password: string;
}) {
  const res = await axios.post<SignupResponse>("/users", params);
  return res.data;
}

export async function login(params: { email: string; password: string }) {
  const res = await axios.post<LoginResponse>("/auth/login", params);
  return res.data;
}