import { CardFormValues } from "@/hooks/useCardForm";
import Image from "next/image";
import { ChangeEvent, useId } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface ImageInputProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  field: ControllerRenderProps<CardFormValues, "imageUrl">;
  error?: string | null;
  previewUrl?: string | null;
  handleImageButtonClick: () => void;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File) => void,
  ) => void;
}

export default function ImageInput({
  fileInputRef,
  field,
  error,
  previewUrl,
  handleImageButtonClick,
  handleFileChange,
}: ImageInputProps) {
  const id = useId();

  return (
    <div>
      <div>
        <label htmlFor={id}>이미지</label>
      </div>
      <div>
        <div
          className="imagePreview relative w-[76px] h-[76px] border border-black-pure"
          onClick={(e) => {
            e.stopPropagation();
            e.stopPropagation();
            handleImageButtonClick();
          }}
        >
          {previewUrl && <Image fill src={previewUrl} alt="" />}
        </div>
        <input
          id={id}
          type="file"
          accept="image/*"
          aria-label="이미지 파일 선택"
          ref={(e) => {
            field.ref(e);
            fileInputRef.current = e;
          }}
          className="hidden"
          onChange={(e) => handleFileChange(e, field.onChange)}
        />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
