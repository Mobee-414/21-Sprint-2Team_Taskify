import { ControllerRenderProps } from "react-hook-form";
import { TagItem } from "@/types/card.type";
import { CardFormValues } from "@/types/card.schema";
import { useId } from "react";
import { CARD_FORM_STYLES } from "@/constants/cardFormStyles";

interface TagInputProps {
  tagList: TagItem[];
  field: ControllerRenderProps<CardFormValues, "tags">;
  error?: string | null;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentTags: string[],
    onChange: (value: string[]) => void,
  ) => void;
}

export default function TagInput({
  tagList,
  field,
  error,
  onKeyDown,
}: TagInputProps) {
  const id = useId();

  return (
    <div className={CARD_FORM_STYLES.GAP}>
      <label className={CARD_FORM_STYLES.LABEL} htmlFor={id}>
        태그
      </label>
      <div
        className={`
          flex flex-wrap flex-col tablet:flex-row
          ${tagList.length > 0 && "gap-[10px]"} 
          ${CARD_FORM_STYLES.INPUT(!!error)}
          border border-gray-base rounded-[8px]
          ${error ? "border-red-point" : "border-gray-base"}
          focus-within:border-violet-main
          placeholder:text-gray-medium
        `}
      >
        <div className="flex gap-[8px] tablet:gap-[6px]">
          {tagList.map((tag, index) => (
            <span
              className="
                flex justify-center items-center
                text-xs-tight font-regular 
                px-[6px] py-[4px] tablet:px-[9.5px] tablet:py-[5px] 
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
          className={`flex-grow !border-none !px-0 !py-0 outline-none focus:outline-none`}
          id={id}
          type="text"
          placeholder="입력 후 Enter"
          onKeyDown={(e) => onKeyDown(e, field.value, field.onChange)}
        />
      </div>
      {error && <div className={CARD_FORM_STYLES.ERROR}>{error}</div>}
    </div>
  );
}
