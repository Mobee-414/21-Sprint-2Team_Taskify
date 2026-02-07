import { ControllerRenderProps } from "react-hook-form";
import { TagItem } from "@/types/card.type";
import { CardFormValues } from "@/hooks/useCardForm";

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
  return (
    <div>
      {tagList.map((tag, index) => (
        <span
          key={index}
          style={{
            backgroundColor: tag.bgColor,
            color: tag.fontColor,
          }}
        >
          {tag.name}
        </span>
      ))}
      <input
        id={field.name}
        type="text"
        placeholder="입력 후 Enter"
        onKeyDown={(e) => handleKeyDown(e, field.value, field.onChange)}
      />
      {error && <div>{error}</div>}
    </div>
  );
}
