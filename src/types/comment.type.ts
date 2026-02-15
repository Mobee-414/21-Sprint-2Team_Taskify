export interface CommentItemType {
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
  comments: CommentItemType[];
}

export interface CommentCreateType {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}
