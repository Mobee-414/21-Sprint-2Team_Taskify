import { useId } from "react";
import { CardFormValues } from "@/types/card.schema";
import { ControllerRenderProps } from "react-hook-form";
import { CARD_FORM_STYLES } from "@/constants/cardFormStyles";
import { Input } from "@/components/common/Input";

interface DescriptionInputProps {
  field: ControllerRenderProps<CardFormValues, "description">;
  error?: string | null;
}

export default function DescriptionInput({
  field,
  error,
}: DescriptionInputProps) {
  const id = useId();

  return (
    <div className={CARD_FORM_STYLES.GAP}>
      <label className={CARD_FORM_STYLES.LABEL} htmlFor={id}>
        설명
      </label>
      <div>
        <textarea
          {...field}
          id={id}
          placeholder="설명을 입력해 주세요"
          className={`
            resize-none 
            w-full h-[126px]
            ${CARD_FORM_STYLES.INPUT} 
            px-[16px] py-[15px]
            placeholder-gray-medium placeholder:font-regular
            ouline-none focus:outline-none
          `}
        />
      </div>
      {error && <div className={CARD_FORM_STYLES.ERROR}>{error}</div>}
    </div>
  );
}
