export interface CommentItem {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

export interface CommentType {
  cursorId: number | null;
  comments: CommentItem[];
}
