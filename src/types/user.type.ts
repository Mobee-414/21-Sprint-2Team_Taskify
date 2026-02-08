export type AssigneeUser = {
  id: number;
  nickname: string; // API 명세 기준
  profileImageUrl: string | null; // 프로필 이미지 URL
  avatarColor?: string; // fallback 용
};
