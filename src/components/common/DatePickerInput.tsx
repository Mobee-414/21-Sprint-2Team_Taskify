import { useId } from "react";
import DatePicker from "react-datepicker";
import { ControllerRenderProps } from "react-hook-form";
import { DatepickerProps } from "@/types/card.type";
import { CardFormValues } from "@/types/card.schema";
import { CARD_FORM_STYLES } from "@/constants/cardFormStyles";
import Image from "next/image";
import "@/styles/utility.module.css";

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
    <div className={CARD_FORM_STYLES.GAP}>
      <label className={CARD_FORM_STYLES.LABEL} htmlFor={id}>
        마감일
      </label>
      <div className="flex gap-[8px] items-center px-[16px] py-[12px] border border-gray-base rounded-[8px]">
        <label htmlFor={id}>
          <Image
            width={22}
            height={22}
            src="/icons/common/calender.svg"
            alt="캘린더 아이콘"
            className="w-[22px] h-[22px]"
          />
        </label>
        <DatePicker
          ref={datepickerRef}
          id={id}
          className={`${CARD_FORM_STYLES.INPUT} !border-none !px-0 !py-0 outline-none focus:outline-none`}
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
      {error && <div className={CARD_FORM_STYLES.ERROR}>{error}</div>}
    </div>
  );
}
