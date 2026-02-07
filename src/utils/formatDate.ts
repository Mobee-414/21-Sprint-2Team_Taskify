import { format } from "date-fns";

export const formatToDisplayDate = (date: string | Date) => {
  const targetDate = new Date(date);
  return format(targetDate, "yyyy.MM.dd HH:mm");
};

export const formatToApiDate = (date: string | Date) => {
  const targetDate = new Date(date);
  return format(targetDate, "yyyy-MM-dd HH:mm");
};
