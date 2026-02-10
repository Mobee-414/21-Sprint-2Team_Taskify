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
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => canPrev && onChange(page - 1)}
        disabled={!canPrev}
        aria-label="이전"
        className="
          flex h-[40px] w-[40px] items-center justify-center
          rounded-[6px] border
          border-gray-light
          bg-white
          enabled:hover:border-gray-medium
          enabled:hover:bg-gray-surface
          disabled:opacity-50
          transition-colors
        "
      >
        <Image
          src="/icons/pagination_left.svg"
          alt="이전"
          width={16}
          height={16}
        />
      </button>

      <button
        type="button"
        onClick={() => canNext && onChange(page + 1)}
        disabled={!canNext}
        aria-label="다음"
        className="
          flex h-[40px] w-[40px] items-center justify-center
          rounded-[6px] border
          border-gray-light
          bg-white
          enabled:hover:border-gray-medium
          enabled:hover:bg-gray-surface
          disabled:opacity-50
          transition-colors
        "
      >
        <Image
          src="/icons/pagination_right.svg"
          alt="다음"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
}
