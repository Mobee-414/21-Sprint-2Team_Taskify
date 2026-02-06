import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";
import { useDropdown } from "../../../contexts/DropdownContext";

import Image from "next/image";

// 추후 api 연동으로 변경 가능
const STATUS = ["To Do", "On Progress", "Done"];

function StatusPill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-[var(--color-violet-light)] px-4 py-2">
      <span className="w-2 h-2 rounded-full bg-[var(--color-violet-main)]" />
      <span className="text-md font-regular text-[var(--color-violet-main)]">
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
        rounded-[6px]
        bg-[var(--color-white)]
        px-4
        border-[1px]
        ${open ? "border-[var(--color-violet-main)]" : "border-gray-200"}
      `}
    >
      <StatusPill text={value} />

      <Image
        src="/icons/arrow_drop_down.svg"
        alt="open"
        width={26}
        height={26}
        className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
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
          rounded-[6px]
          bg-[var(--color-white)]
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
              className="
                !px-0 !py-0
                w-[217px] h-[48px]
                hover:bg-gray-50
              "
            >
              <div className="flex items-center h-full w-full pl-[16px] pr-[16px]">
                <Image
                  src="/icons/check.svg"
                  alt="selected"
                  width={22}
                  height={22}
                  className={`${isSelected ? "opacity-100" : "opacity-0"}`}
                />

                <div className="w-[8px]" />

                <StatusPill text={item} />

                {/* ✅ 메뉴 아이템 화살표 유지 */}
                <Image
                  src="/icons/arrow_drop_down.svg"
                  alt="status arrow"
                  width={26}
                  height={26}
                  className="ml-auto"
                />
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
