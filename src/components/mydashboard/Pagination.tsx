import Image from "next/image";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-end gap-[8px]">
      <button
        type="button"
        onClick={() => canPrev && onChange(page - 1)}
        disabled={!canPrev}
        aria-label="이전"
        className="
          flex items-center justify-center
          rounded-[6px] border
          border-gray-light
          bg-white
          transition-colors
          disabled:opacity-50
          w-[36px] h-[36px]
          tablet:w-[40px] tablet:h-[40px]
          desktop:w-[40px] desktop:h-[40px]
          enabled:hover:border-gray-medium
          enabled:hover:bg-gray-surface
        "
      >
        <Image
          src="/icons/pagination_left.svg"
          alt="이전"
          width={14}
          height={14}
          className="
            tablet:w-[16px] tablet:h-[16px]
            desktop:w-[16px] desktop:h-[16px]
          "
        />
      </button>

      <button
        type="button"
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        aria-label="다음"
        className="
          flex items-center justify-center
          rounded-[6px] border
          border-gray-light
          bg-white
          transition-colors
          disabled:opacity-50
          w-[36px] h-[36px]
          tablet:w-[40px] tablet:h-[40px]
          desktop:w-[40px] desktop:h-[40px]
          enabled:hover:border-gray-medium
          enabled:hover:bg-gray-surface
        "
      >
        <Image
          src="/icons/pagination_right.svg"
          alt="다음"
          width={14}
          height={14}
          className="
            tablet:w-[16px] tablet:h-[16px]
            desktop:w-[16px] desktop:h-[16px]
          "
        />
      </button>
    </div>
  );
}
