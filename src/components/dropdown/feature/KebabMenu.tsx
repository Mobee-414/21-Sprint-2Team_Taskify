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
          width={20}
          height={20}
          className="
          w-[20px] md:w-[28px] h-[20px] md:h-[28px] 
          cursor-pointer hover:opacity-70 transition
          "
          alt="menu"
        />
      </DropdownTrigger>

      <DropdownMenu
        align="end"
        className="
          flex flex-col
          justify-center
          w-[93px] h-[82px]
          px-[6px] py-[7px]
          bg-white
          border border-gray-200
          rounded-xl
          shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        "
      >
        <DropdownItem
          onClick={onEdit}
          className="
            h-1/2
            flex items-center justify-center
            text-md
            text--black-medium
            hover:bg-violet-light
            hover:text-violet-main
          "
        >
          수정하기
        </DropdownItem>

        <DropdownItem
          onClick={onDelete}
          className="
            h-1/2
            flex items-center justify-center
            text-md
            text-black-medium
            hover:bg-violet-light
            hover:text-violet-main
          "
        >
          삭제하기
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
