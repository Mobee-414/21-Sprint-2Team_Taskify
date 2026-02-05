import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";
import { useDropdown } from "../DropdownContext";

import Image from "next/image";

import arrowIcon from "../../../../public/icons/arrow_drop_down.svg";
import checkIcon from "../../../../public/icons/icon/check.svg";


// 추후 api 연동으로 변경 가능
const STATUS = ["To Do", "On Progress", "Done"];
const PURPLE = "#5534DA";

function StatusPill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-[#F1EEFF] px-4 py-2">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PURPLE }} />
      <span className="text-[14px] font-normal" style={{ color: PURPLE }}>
        {text}
      </span>
    </div>
  );
}

function StatusTrigger({ value }: { value: string }) {
  const { open } = useDropdown();

  return (
    <button
      type="button"
      className={`
        flex items-center
        w-[217px] h-[48px]
        rounded-[6px] bg-white
        px-4
        border-[1px]
        ${open ? "border-[#5534DA]" : "border-gray-200"}
      `}
    >
      <StatusPill text={value} />

      <Image
        src={arrowIcon}
        alt="open"
        width={26}
        height={26}
        className={`ml-auto transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

export function StatusDropdown() {
  const [value, setValue] = useState("To Do");

  return (
    <Dropdown>
      <DropdownTrigger>
        <StatusTrigger value={value} />
      </DropdownTrigger>

      <DropdownMenu
        className="
          mt-[2px]
          w-[217px] h-[144px]
          rounded-[6px] bg-white
          border border-gray-200
          overflow-hidden
        "
      >
        {STATUS.map((item) => {
          const isSelected = item === value;

          return (
            <DropdownItem
              key={item}
              onClick={() => setValue(item)}
              className="!px-0 !py-0 w-[217px] h-[48px] hover:bg-gray-50"
            >
              <div className="flex items-center h-full w-full pl-[16px] pr-[16px]">
                <Image
                  src={checkIcon}
                  alt="selected"
                  width={22}
                  height={22}
                  className={`${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="w-[3px]" />

                <StatusPill text={item} />

                <Image  
                  src={arrowIcon}
                  alt="화살표 아이콘"
                  width={26}
                  height={26}
                />
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
