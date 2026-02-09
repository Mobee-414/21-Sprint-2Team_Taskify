import DatePicker from "react-datepicker";
import { AssigneeUser } from "./user.type";

export interface DatepickerProps {
  datepickerRef: React.RefObject<DatePicker | null>;
  handleDateChange: (
    date: Date | null,
    onChange: (value: string) => void,
  ) => void;
}

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
  teamId: string;
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
