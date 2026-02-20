import { format, parseISO } from "date-fns";

export const formatToDisplayDate = (date: string | Date) => {
  if (!date) return "-";

  let targetDate: Date;

  if (typeof date === "string") {
    const dateWithoutZ = date.endsWith("Z") ? date.slice(0, -1) : date;
    targetDate = parseISO(dateWithoutZ);
  } else {
    targetDate = date;
  }

  if (isNaN(targetDate.getTime())) {
    return "유효하지 않은 날짜";
  }

  return format(targetDate, "yyyy.MM.dd HH:mm");
};

export const formatToApiDate = (date: string | Date) => {
  const targetDate = new Date(date);
  return format(targetDate, "yyyy-MM-dd HH:mm");
};
