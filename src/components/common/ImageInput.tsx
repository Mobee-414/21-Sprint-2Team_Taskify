import { CardFormValues } from "@/hooks/useCardForm";
import Image from "next/image";
import { ChangeEvent } from "react";
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
  return (
    <div>
      <div
        className="imagePreview"
        onClick={(e) => {
          e.stopPropagation();
          handleImageButtonClick;
        }}
      >
        <Image
          width={76}
          height={76}
          src={`${previewUrl ? previewUrl : ""}`}
          alt=""
        />
        <span>아이콘</span>
      </div>
      <input
        id={field.name}
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
      {error && <div>{error}</div>}
    </div>
  );
}
