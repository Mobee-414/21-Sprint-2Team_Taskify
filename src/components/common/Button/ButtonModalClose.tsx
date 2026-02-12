import Image from "next/image";

interface ModalCloseButtonProps {
  onClick: () => void;
}

export default function ButtonModalClose({ onClick }: ModalCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        relative
        flex items-center justify-center
      "
      aria-label="닫기"
    >
      <picture>
        <source
          srcSet="/icons/common/close_sm.svg"
          media="(max-width: 767px)"
        />

        <Image
          src="/icons/common/close_lg.svg"
          alt="닫기"
          width={36}
          height={36}
          className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] object-contain"
          priority
        />
      </picture>
    </button>
  );
}
