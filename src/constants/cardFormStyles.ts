export const CARD_FORM_STYLES = {
  GAP: "flex flex-col gap-[8px]",
  LABEL: "text-md tablet:text-2lg font-medium text-black-medium",
  INPUT: (isError: boolean) => `
    text-md tablet:text-lg font-regular text-black-medium 
    px-[16px] py-[12px] 
    border border-gray-base rounded-[8px] outline-none
    ${isError ? "border-red-point" : "border-gray-base"}
    focus:border-violet-main
    placeholder:text-gray-medium
  `,
  ERROR: "text-xs tablet:text-md text-red-point font-regular",
};

export type CardFormStyleType = typeof CARD_FORM_STYLES;
