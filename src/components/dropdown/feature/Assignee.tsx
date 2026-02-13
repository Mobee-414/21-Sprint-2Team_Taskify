import { useMemo } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";
import { useDropdown } from "@/contexts/DropdownContext";
import { MemberType } from "@/types/user.type";
import Avatar from "@/components/common/Avatar";
import Image from "next/image";

type Props = {
  users: MemberType[];
  selectedUserId?: number;
  placeholder?: string;
  onChange: (id: number) => void;
};

function AssigneeTrigger({
  label,
  imageUrl,
  color,
}: {
  label: string;
  imageUrl: string | null;
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
        bg-[var(--color-white)]
        px-4
        border-[1px]
        ${open ? "border-[var(--color-violet-main)]" : "border-gray-200"}
        cursor-pointer
      `}
    >
      <Avatar nickname={label} imageUrl={imageUrl} />

      <span className="ml-[6px] text-lg font-regular text-[var(--color-black-medium)]">
        {label}
      </span>

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

export function AssigneeDropdown({
  users,
  selectedUserId,
  placeholder = "담당자",
  onChange,
}: Props) {
  const selectedUser = useMemo(() => {
    if (users.length === 0) return undefined;
    return users.find((u) => u.userId === selectedUserId) ?? users[0];
  }, [users, selectedUserId]);

  if (users.length === 0 || !selectedUser) {
    return (
      <AssigneeTrigger label={placeholder} imageUrl={null} color="#A3C4A2" />
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <AssigneeTrigger
          label={selectedUser.nickname}
          imageUrl={selectedUser.profileImageUrl}
          color={selectedUser.avatarColor}
        />
      </DropdownTrigger>

      <DropdownMenu
        className="
          mt-[2px]
          w-[217px]
          rounded-xl
          bg-[var(--color-white)]
          border border-gray-200
          shadow-[0_6px_18px_rgba(0,0,0,0.12)]
          overflow-hidden
        "
      >
        {users.map((user) => {
          const isSelected = user.userId === selectedUser.id;

          return (
            <DropdownItem
              key={user.id}
              onClick={() => onChange(user.userId)}
              className="!px-0 !py-0 h-[48px] hover:bg-gray-50"
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

                <Avatar
                  nickname={user.nickname}
                  imageUrl={user.profileImageUrl}
                />

                <span className="ml-[6px] text-lg font-regular text-[var(--color-black-medium)]">
                  {user.nickname}
                </span>
              </div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}