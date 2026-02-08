import DatePicker from "react-datepicker";

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

export interface CardDetailType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
}
