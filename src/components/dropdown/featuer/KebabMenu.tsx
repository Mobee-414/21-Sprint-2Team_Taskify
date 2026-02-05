import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";

import Image from "next/image";

import kebabIcon from "../../../../public/icons/kebab_more_vert.svg";

export function KebabMenuDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          src={kebabIcon}
          className="w-[28px] h-[28px] cursor-pointer hover:opacity-70 transition"
          alt="menu"
        />
      </DropdownTrigger>

      <DropdownMenu
        align="end"
        className="
          w-[93px] h-[82px]
          bg-white
          border border-gray-200
          rounded-xl
          shadow-[0_4px_12px_rgba(0,0,0,0.08)]
          flex flex-col
          justify-center
        "
      >
        <DropdownItem
          className="
            h-1/2
            flex items-center justify-center
            text-sm text-black
            hover:bg-[#F1EEFF]
            hover:text-[#6D28D9]
          "
        >
          수정하기
        </DropdownItem>

        <DropdownItem
          className="
            h-1/2
            flex items-center justify-center
            text-sm text-black
            hover:bg-[#F1EEFF]
            hover:text-[#6D28D9]
          "
        >
          삭제하기
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
