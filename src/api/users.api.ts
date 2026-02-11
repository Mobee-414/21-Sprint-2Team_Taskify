import axios from './axios';

export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null; // nullable 가능성 고려
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
};

// 회원가입 
export const signup = async (
  params: SignupParams
): Promise<User> => { 
  const response = await axios.post<User>("/users", params);
  return response.data;
};

// 내 정보 조회
export const getMyUser = async (
  teamId: number
): Promise<User> => {
  const response = await axios.get<User>(
    `/${teamId}/users/me`
  );
  return response.data;
};

// 내 정보 수정
export const putMyUser = async (
  teamId: number,
  params: UpdateMyUserParams
): Promise<User> => {
  const response = await axios.put<User>(
    `/${teamId}/users/me`,
    params
  );
  return response.data;
};

//프로필 이미지 업로드
export const postMyUserImage = async (
  teamId: number,
  image: File
): Promise<User> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post<User>(
    `/${teamId}/users/me/image`,
    formData
  );

  return response.data;
};