"use client";

import Image from "next/image";
import { Controller, Control, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "@/components/common/Input";

const COLORS = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

type FormValues = { title: string };

type Props = {
  control: Control<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onSubmitUpdate: (values: FormValues) => void;
  canUpdate: boolean;
  updating: boolean;
};

export default function DashboardInfoSection({
  control,
  handleSubmit,
  selectedColor,
  onSelectColor,
  onSubmitUpdate,
  canUpdate,
  updating,
}: Props) {
  return (
    <section className="h-[344px] w-[620px] rounded-[12px] bg-white px-[28px] py-[32px]">
      <h2 className="text-2xl font-bold text-black-medium">비브리지</h2>

      <div className="mt-[24px]">
        <div className="text-2lg font-medium text-black-medium">
          대시보드 이름
        </div>

        <div className="mt-[8px] w-[564px]">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label=""
                field={field}
                placeholder="대시보드 이름"
                labelSize="labelFixed"
                labelWeight="medium"
                inputSize="inputLg"
              />
            )}
          />
        </div>

        <div className="mt-[16px] flex items-center gap-[12px]">
          {COLORS.map((color) => {
            const isSelected = color === selectedColor;

            return (
              <button
                key={color}
                type="button"
                onClick={() => onSelectColor(color)}
                className="relative h-[30px] w-[30px] rounded-full"
                style={{ backgroundColor: color }}
                aria-label={`색상 선택 ${color}`}
              >
                {isSelected && (
                  <Image
                    src="/icons/white_check.svg"
                    alt="선택됨"
                    width={24}
                    height={24}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmitUpdate)}
          disabled={!canUpdate}
          className="
            mt-[40px]
            h-[54px] w-[564px]
            rounded-[8px]
            bg-violet-main
            text-lg font-semibold text-white
            hover:opacity-90
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          {updating ? "변경 중..." : "변경"}
        </button>
      </div>
    </section>
  );
}
