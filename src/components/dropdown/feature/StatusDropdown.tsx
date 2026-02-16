import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";
import { useDropdown } from "@/contexts/DropdownContext";
import Image from "next/image";
import { Column } from "@/types/column.type";

function StatusPill({ text }: { text: string }) {
  return (
    <div
      className="
      relative
      max-w-[calc(100%-66px)]
      flex items-center gap-[6px] 
      px-[8px] py-[4px] tablet:py-[1px]
      rounded-[16px] 
      bg-violet-light 
      
      before:content-[''] before:absolute
      before:top-1/2 before:-translate-y-1/2 
      before:left-[8px] 
      before:w-[6px] before:h-[6px] before:rounded-full before:bg-violet-main
    "
    >
      <span
        className="
        text-xs-tight tablet:text-md font-regular text-violet-main
        pl-[12px]
        whitespace-nowrap overflow-hidden overflow-ellipsis
      "
      >
        {text}
      </span>
    </div>
  );
}

function StatusTrigger({ selectedId }: { selectedId: string }) {
  const { open } = useDropdown();

  return (
    <button
      type="button"
      className={`
        flex items-center
        w-full
        px-[8px] py-[11px]
        rounded-[6px]
        bg-color-white
        border-[1px]
        ${open ? "border-violet-main" : "border-gray-200"}
      `}
    >
      <StatusPill text={selectedId} />

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

export function StatusDropdown({
  columnList,
  selectedColumnId,
  onChange,
}: {
  columnList: Column[];
  selectedColumnId: number;
  onChange: (id: number) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | undefined>(
    selectedColumnId,
  );
  const selectedColumn = columnList.find((col) => col.id === selectedId);

  return (
    <Dropdown>
      <DropdownTrigger>
        <StatusTrigger selectedId={selectedColumn?.title || ""} />
      </DropdownTrigger>

      <DropdownMenu
        className="
        w-full rounded-[6px] mt-[2px] bg-white border border-gray-200
        whitespace-nowrap overflow-hidden overflow-ellipsis
      "
      >
        {columnList.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <DropdownItem
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                onChange(item.id);
              }}
              className="w-full px-[8px] py-[11px] hover:bg-gray-50"
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

                <StatusPill text={item.title} />

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
