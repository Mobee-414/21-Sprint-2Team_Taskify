import { AssigneeUser } from "./user.type";

export interface TagItem {
  name: string;
  bgColor: string;
  fontColor: string;
}

export interface CardDefaultType {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CardDetailType extends CardDefaultType {
  id: number;
  assignee: AssigneeUser;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardCreateType extends CardDefaultType {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
}

export interface CardUpdateType extends CardDefaultType {
  columnId: number;
  assigneeUserId: number;
}

export type SyncCardListType = (
  action: "create" | "edit" | "delete",
  cardData?: CardDetailType,
  cardId?: number,
) => void;
