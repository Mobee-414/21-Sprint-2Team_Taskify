import axios from "./axios";

export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SignupResponse = User;

export type LoginResponse = {
  user: User;
  accessToken: string;
};

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