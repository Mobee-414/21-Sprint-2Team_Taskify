import { useMemo } from "react";
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

export type AssigneeUser = {
  id: number;
  name: string;
  avatarColor?: string;
};

type Props = {
  users: AssigneeUser[];           // 상위 컴포넌트에서 API 연동 후 전달
  selectedUserId?: number;
  placeholder?: string;
  onChange: (user: AssigneeUser) => void;
};

function Avatar({
  name,
  color,
  size = 26,
}: {
  name: string;
  color?: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? "#A3C4A2",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {name?.[0] ?? "?"}
    </div>
  );
}

function AssigneeTrigger({
  label,
  color,
}: {
  label: string;
  color?: string;
}) {
  const { open } = useDropdown();

  return (
    <button
      type="button"
      className={`
        flex items-center
        w-[217px] h-[48px]
        rounded-[6px]
        bg-white
        px-4
        border-[1px]
        ${open ? "border-[#6D28D9]" : "border-gray-200"}
        cursor-pointer
      `}
    >
      <Avatar name={label} color={color} size={26} />

      <span className="ml-[6px] text-[16px] font-normal text-[#333236]">
        {label}
      </span>

      <Image
        src={arrowIcon}
        alt="open"
        width={26}
        height={26}
        className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export function AssigneeDropdown({
  users,
  selectedUserId,
  placeholder = "담당자",
  onChange,
}: Props) {
  const selectedUser = useMemo(() => {
    if (users.length === 0) return undefined;
    return users.find((u) => u.id === selectedUserId) ?? users[0];
  }, [users, selectedUserId]);

  if (users.length === 0 || !selectedUser) {
    return (
      <AssigneeTrigger label={placeholder} color="#A3C4A2" />
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <AssigneeTrigger
          label={selectedUser.name}
          color={selectedUser.avatarColor}
        />
      </DropdownTrigger>

      <DropdownMenu
        className="
          mt-[2px]
          w-[217px]
          rounded-xl
          bg-white
          border border-gray-200
          shadow-[0_6px_18px_rgba(0,0,0,0.12)]
          overflow-hidden
        "
      >
        {users.map((user) => {
          const isSelected = user.id === selectedUser.id;

          return (
            <DropdownItem
              key={user.id}
              onClick={() => onChange(user)}
              className="!px-0 !py-0 h-[48px] hover:bg-gray-50"
            >
              <div className="flex items-center h-full w-full pl-[16px] pr-[16px]">
                <Image
                  src={checkIcon}
                  alt="selected"
                  width={22}
                  height={22}
                  className={`${isSelected ? "opacity-100" : "opacity-0"}`}
                />
                <div className="w-[8px]" />
                <Avatar name={user.name} color={user.avatarColor} size={26} />
                <span className="ml-[6px] text-[16px] font-normal text-[#333236]">
                  {user.name}
                </span>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}