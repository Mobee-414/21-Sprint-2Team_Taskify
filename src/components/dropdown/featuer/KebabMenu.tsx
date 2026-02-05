import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";

import Image from "next/image";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export function KebabMenuDropdown({ onEdit, onDelete }: Props) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          src="/icons/kebab_more_vert.svg"
          width={28}
          height={28}
          className="w-[28px] h-[28px] cursor-pointer hover:opacity-70 transition"
          alt="menu"
        />
      </DropdownTrigger>

      <DropdownMenu
        align="end"
        className="
          w-[93px] h-[82px]
          bg-[var(--color-white)]
          border border-gray-200
          rounded-xl
          shadow-[0_4px_12px_rgba(0,0,0,0.08)]
          flex flex-col
          justify-center
        "
      >
        <DropdownItem
          onClick={onEdit}
          className="
            h-1/2
            flex items-center justify-center
            text-sm
            text-[var(--color-black-pure)]
            hover:bg-[var(--color-violet-light)]
            hover:text-[var(--color-violet-main)]
          "
        >
          수정하기
        </DropdownItem>

        <DropdownItem
          onClick={onDelete}
          className="
            h-1/2
            flex items-center justify-center
            text-sm
            text-[var(--color-black-pure)]
            hover:bg-[var(--color-violet-light)]
            hover:text-[var(--color-violet-main)]
          "
        >
          삭제하기
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
