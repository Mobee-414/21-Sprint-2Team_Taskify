import axios from "./axios";
import type { AuthUser } from "@/types/user.type";

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};
// login
export async function login(params: LoginParams) {
  const res = await axios.post<LoginResponse>("/auth/login", params);
  return res.data;
}

// 비밀번호 변경
export type ChangePasswordParams = {
  password: string;
  newPassword: string;
};

export async function changePassword(
  teamId: number,
  params: ChangePasswordParams
): Promise<void> {
  await axios.put(
    `/${teamId}/auth/password`,
    params
  );
}