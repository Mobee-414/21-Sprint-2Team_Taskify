import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../dropdown/Dropdown";
import { useDropdown } from "../dropdown/DropdownContext";

import arrowIcon from "../../assets/icon/arrow_drop_down.svg";
import checkIcon from "../../assets/icon/check.svg";


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

      <img
        src={arrowIcon}
        alt="open"
        className={`ml-auto w-[26px] h-[26px] transition-transform ${
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
                <img
                  src={checkIcon}
                  alt="selected"
                  className={`w-[22px] h-[22px] ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="w-[3px]" />

                <StatusPill text={item} />

                <img
                  src={arrowIcon}
                  alt="more"
                  className="ml-auto w-[26px] h-[26px]"
                />
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
