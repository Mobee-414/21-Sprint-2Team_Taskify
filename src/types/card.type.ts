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
