import Image from "next/image";
import { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T, Path<T>>;
  type?: string;
  placeholder: string;
  required?: boolean;
  error?: string | null;
  labelSize: "14-16" | "14-18" | "16-18" | "16-16";
  labelWeight: "400" | "500";
  inputSize: "14-16" | "16-16";
  errorSize?: "12-14" | "14-14";
}

const FONT_VARIANTS = {
  "12-14": "text-xs md:text-md",
  "14-14": "text-md",
  "14-16": "text-md md:text-lg",
  "14-18": "text-md md:text-2lg",
  "16-18": "text-lg md:text-2lg",
  "16-16": "text-lg",
};

export function Input<T extends FieldValues>({
  label,
  field,
  type = "text",
  placeholder,
  required = false,
  error,
  labelSize,
  labelWeight,
  inputSize,
  errorSize = "12-14",
}: InputProps<T>) {
  const [showPw, setShowPw] = useState(false);
  const inputType = type === "password" ? (showPw ? "text" : "password") : type;

  const weightClass = labelWeight === "400" ? "font-regular" : "font-medium";

  return (
    <div className="flex flex-col gap-[8px]">
      <label
        htmlFor={field.name}
        className={`${FONT_VARIANTS[labelSize]} ${weightClass} text-black-medium`}
      >
        {label}
        {required && (
          <span className="text-md md:text-lg font-regular text-violet-main ml-[8px]">
            *
          </span>
        )}
      </label>
      <div className="relative">
        <input
          {...field}
          type={inputType}
          id={field.name}
          placeholder={placeholder}
          className={`
            w-full 
            h-[50px]
            ${FONT_VARIANTS[inputSize]}
            font-regular
            text-black-medium 
            px-[16px] py-[12px] 
            ${type === "password" ? "pr-[40px]" : ""}
            border rounded-[8px] 
            ${error ? "border-red-point" : "border-gray-base"} 
            outline-none
            focus:border-violet-main
            placeholder:text-gray-medium
          `}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-[50%] right-[13px] md:right-[16px] w-[24px] h-[24px] -translate-y-1/2 cursor-pointer"
            aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보이기"}
            onClick={() => setShowPw((prev) => !prev)}
          >
            <Image
              fill
              src={showPw ? "/icons/eye_open.svg" : "/icons/eye_close.svg"}
              alt=""
            />
          </button>
        )}
      </div>
      {error && (
        <div className={`${FONT_VARIANTS[errorSize]} text-red-point`}>
          {error}
        </div>
      )}
    </div>
  );
}
