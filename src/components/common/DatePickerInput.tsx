import { useId } from "react";
import DatePicker from "react-datepicker";
import { ControllerRenderProps } from "react-hook-form";
import { DatepickerProps } from "@/types/card.type";
import { CardFormValues } from "@/types/card.schema";

interface DatePickerInputProps extends DatepickerProps {
  field: ControllerRenderProps<CardFormValues, "dueDate">;
  error?: string | null;
}

export default function DatePickerInput({
  datepickerRef,
  field,
  error,
  handleDateChange,
}: DatePickerInputProps) {
  const id = useId();

  return (
    <div>
      <div>
        <label htmlFor={id}>마감일</label>
      </div>
      <div>
        <DatePicker
          ref={datepickerRef}
          id={id}
          placeholderText="날짜를 입력해 주세요"
          selected={field.value ? new Date(field.value) : null}
          onChange={(date: Date | null) =>
            handleDateChange(date, field.onChange)
          }
          dateFormat="yyyy.MM.dd HH:mm"
          showTimeSelect
          timeIntervals={30}
          timeCaption="시간"
          shouldCloseOnSelect={false}
          minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
        />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
