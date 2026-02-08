'use client';

import { useState } from "react";
import Image from "next/image";
import BaseModal from "@/components/common/BaseModal";
import { createDashboard, Dashboard } from "@/api/dashboards.api";
import { Input } from "@/components/common/Input";
import { useForm, Controller } from "react-hook-form";

const COLORS = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];

type FormValues = {
  title: string;
};

type Props = {
  onClose: () => void;
  onCreated: (created: Dashboard) => void;
};

export default function CreateDashboardModal({ onClose, onCreated }: Props) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { title: "" },
    mode: "onChange",
  });

  const titleValue = watch("title");
  const canSubmit = titleValue.trim().length > 0 && !loading;

  const onSubmit = async ({ title }: FormValues) => {
    if (!title.trim() || loading) return;

    setLoading(true);
    try {
      const created = await createDashboard({
        title: title.trim(),
        color: selectedColor,
      });
      onCreated(created);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      width={584}
      radius="md"
      padding="lg"
      gap="md"
    >
      <div className="flex w-[520px] h-[280px] flex-col gap-[24px]">
        <h2 className="text-[24px] font-bold text-[#333236]">
          새로운 대시보드
        </h2>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              label="대시보드 이름"
              field={field}
              placeholder=""
              labelSize="labelFixed"
              labelWeight="medium"
              inputSize="inputLg"
            />
          )}
        />

        <div className="flex items-center gap-[12px]">
          {COLORS.map((color) => {
            const isSelected = color === selectedColor;

            return (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className="relative w-[30px] h-[30px] rounded-full cursor-pointer"
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

        <div className="mt-auto flex gap-[8px]">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex items-center justify-center
              w-[254px] h-[54px]
              px-[46px] py-[14px]
              rounded-[8px]
              border border-gray-base
              text-[16px] font-medium text-[#787486]
              hover:bg-gray-surface
              cursor-pointer
              disabled:opacity-40 disabled:cursor-not-allowed
            "
            >
            취소
          </button>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={!canSubmit || loading}
            className="
              flex items-center justify-center
              w-[254px] h-[54px]
              px-[46px] py-[14px]
              rounded-[8px]
              bg-violet-main
              text-[16px] font-medium text-white
              hover:opacity-90
              cursor-pointer
              disabled:opacity-40 disabled:cursor-not-allowed
            "
            >
            {loading ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
