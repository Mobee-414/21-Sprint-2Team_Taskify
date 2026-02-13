export type AssigneeUser = { // 기본 사용자(공통필드)
  id: number;
  nickname: string; // API 명세 기준
  profileImageUrl: string | null; // 프로필 이미지 URL
  avatarColor?: string; // fallback 용
};

export interface MemberType extends AssigneeUser { // 멤버 타입
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface AuthUser extends AssigneeUser { // 로그인 내 정보 사용자 타입
  email: string;
  createdAt: string;
  updatedAt: string;
}