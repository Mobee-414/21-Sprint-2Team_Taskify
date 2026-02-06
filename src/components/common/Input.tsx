import Image from "next/image";
import { useId, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

/**
 * [폰트 사이즈 가이드]
 * - 네이밍 컨벤션: 역할(label/input/error) + 크기(Sm/Md/Lg/Fixed)
 * - 수치 대응: "MOBILE 사이즈 - PC 사이즈" 기준 (Tailwind responsive design)
 * - 활용 예시: labelSm = MOBILE 14px / PC 16px 대응
 */
const FONT_SIZE_VARIANTS = {
  labelSm: "text-md md:text-lg", // 14-16
  labelMd: "text-md md:text-2lg", // 14-18
  labelLg: "text-lg md:text-2lg", // 16-18
  labelFixed: "text-lg", // 16-16 (고정)

  inputMd: "text-md md:text-lg", // 14-16
  inputLg: "text-lg", // 16-16 (고정)

  errorSm: "text-xs md:text-md", // 12-14
  errorMd: "text-md", // 14-14 (고정)
};

const WEIGHT_VARIANTS = {
  normal: "font-normal", // 400
  medium: "font-medium", // 500
};

interface InputProps<T extends FieldValues> {
  label: string;
  field: ControllerRenderProps<T, Path<T>>;
  type?: string;
  placeholder: string;
  required?: boolean;
  error?: string | null;
  labelSize?: keyof typeof FONT_SIZE_VARIANTS;
  labelWeight?: keyof typeof WEIGHT_VARIANTS;
  inputSize?: keyof typeof FONT_SIZE_VARIANTS;
  errorSize?: keyof typeof FONT_SIZE_VARIANTS;
}

export function Input<T extends FieldValues>({
  label,
  field,
  type = "text",
  placeholder,
  required = false,
  error,
  labelSize = "labelMd",
  labelWeight = "medium",
  inputSize = "inputMd",
  errorSize = "errorMd",
}: InputProps<T>) {
  const id = useId();

  const [showPw, setShowPw] = useState(false);
  const inputType = type === "password" ? (showPw ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-[8px]">
      <label
        htmlFor={id}
        className={`${labelSize} ${labelWeight} text-black-medium`}
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
          id={id}
          placeholder={placeholder}
          className={`
            w-full 
            h-[50px]
            ${inputSize}
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
      {error && <div className={`${errorSize} text-red-point`}>{error}</div>}
    </div>
  );
}
