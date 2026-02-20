import axios from "./axios";

export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SignupParams = {
  email: string;
  nickname: string;
  password: string;
};

export type UpdateMyUserParams = {
  nickname: string;
  profileImageUrl?: string | null;
};

export type UploadImageResponse = {
  profileImageUrl: string;
};

// 회원가입
export const signup = async (
  params: SignupParams
): Promise<User> => {
  const response = await axios.post<User>("/users", params);
  return response.data;
};
// ✅ 내 정보 조회 
export const getMyUser = async (): Promise<User> => {
  const response = await axios.get<User>("/users/me");
  return response.data;
};

// ✅ 내 정보 수정
export const putMyUser = async (
  params: UpdateMyUserParams
): Promise<User> => {
  const response = await axios.put<User>("/users/me", params);
  return response.data;
};

// ✅ 프로필 이미지 업로드
export const postMyUserImage = async (
  image: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post<UploadImageResponse>(
    "/users/me/image",
    formData
  );

  return response.data;
};