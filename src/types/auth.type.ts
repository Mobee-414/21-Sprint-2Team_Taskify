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