import { ChangeEvent, useId } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CardFormValues } from "@/types/card.schema";
import Image from "next/image";
import { CARD_FORM_STYLES } from "@/constants/cardFormStyles";

interface ImageInputProps {
  mode: "create" | "edit";
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
  mode,
  fileInputRef,
  field,
  error,
  previewUrl,
  handleImageButtonClick,
  handleFileChange,
}: ImageInputProps) {
  const id = useId();

  return (
    <div className={CARD_FORM_STYLES.GAP}>
      <label className={CARD_FORM_STYLES.LABEL} htmlFor={id}>
        이미지
      </label>
      <div>
        <div
          className="w-[58px] h-[58px] md:w-[76px] md:h-[76px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.stopPropagation();
            handleImageButtonClick();
          }}
        >
          {previewUrl ? (
            <div
              className={`
                relative
                w-full h-full 
                rounded-[6px]
                ${
                  mode === "edit" &&
                  `before:content-[''] before:z-1
                  before:absolute 
                  before:top-0 before:left-0
                  before:rounded-[6px]
                  before:w-full before:h-full
                  before:bg-black-pure before:opacity-[0.6]
                  
                  after:content-[''] after:z-2
                  after:absolute 
                  after:top-1/2 after:left-1/2 after:-translate-1/2 
                  after:w-[22px] after:h-[22px] md:after:w-[30px] md:after:h-[30px]
                  after:bg-[url('/icons/card/image_edit.svg')] 
                  after:bg-no-repeat 
                  after:bg-contain 
                  after:bg-center
                  `
                } 
              `}
            >
              <Image
                fill
                src={previewUrl}
                alt=""
                className="object-fit rounded-[6px]"
              />
            </div>
          ) : (
            <div
              className="
              relative
              w-full h-full bg-[#F5F5F5] rounded-[6px]
              before:content-[''] before:absolute 
              before:top-1/2 before:left-1/2 before:-translate-1/2 
              before:w-[21px] before:h-[21px] md:before:w-[28px] md:before:h-[28px]
              before:bg-[url('/icons/card/image_add.svg')] 
              before:bg-no-repeat 
              before:bg-contain 
              before:bg-center
            "
            ></div>
          )}
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
      {error && <div className={CARD_FORM_STYLES.ERROR}>{error}</div>}
    </div>
  );
}
