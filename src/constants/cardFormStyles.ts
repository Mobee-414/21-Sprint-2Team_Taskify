export const CARD_FORM_STYLES = {
  GAP: "flex flex-col gap-[8px]",
  LABEL: "text-md md:text-2lg font-medium text-black-medium",
  INPUT:
    "text-md md:text-lg font-regular text-black-medium px-[16px] py-[12px] border border-gray-base rounded-[8px]",
  ERROR: "text-xs md:text-md text-red-point font-regular",
} as const;

export type CardFormStyleType = typeof CARD_FORM_STYLES;
