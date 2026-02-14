import { ControllerRenderProps } from "react-hook-form";
import { TagItem } from "@/types/card.type";
import { CardFormValues } from "@/types/card.schema";
import { useId } from "react";
import { CARD_FORM_STYLES } from "@/constants/cardFormStyles";

interface TagInputProps {
  tagList: TagItem[];
  field: ControllerRenderProps<CardFormValues, "tags">;
  error?: string | null;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentTags: string[],
    onChange: (value: string[]) => void,
  ) => void;
}

export default function TagInput({
  tagList,
  field,
  error,
  handleKeyDown,
}: TagInputProps) {
  const id = useId();

  return (
    <div className={CARD_FORM_STYLES.GAP}>
      <label className={CARD_FORM_STYLES.LABEL} htmlFor={id}>
        태그
      </label>
      <div
        className={`
          flex flex-wrap flex-col md:flex-row
          ${tagList.length > 0 && "gap-[10px]"} 
          ${CARD_FORM_STYLES.INPUT}
        `}
      >
        <div className="flex gap-[8px] md:gap-[6px]">
          {tagList.map((tag, index) => (
            <span
              className="
                flex justify-center items-center
                text-xs-tight font-regular 
                px-[6px] py-[4px] md:px-[9.5px] md:py-[5px] 
                rounded-[4px]
              "
              key={index}
              style={{
                backgroundColor: tag.bgColor,
                color: tag.fontColor,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <input
          className="flex-grow ouline-none focus:outline-none"
          id={id}
          type="text"
          placeholder="입력 후 Enter"
          onKeyDown={(e) => handleKeyDown(e, field.value, field.onChange)}
        />
        {error && <div className={CARD_FORM_STYLES.ERROR}>{error}</div>}
      </div>
    </div>
  );
}
