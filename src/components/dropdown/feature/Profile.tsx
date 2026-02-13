import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";
import { useDropdown } from "@/contexts/DropdownContext";

type Props = {
  nickname: string;
  profileImageUrl?: string | null;
  avatarColor?: string;
  onLogout?: () => void;
};

function ProfileAvatar({
  nickname,
  imageUrl,
  color,
}: {
  nickname: string;
  imageUrl: string | null;
  color?: string;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={nickname}
        width={38}
        height={38}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-base text-white font-semibold"
      style={{ backgroundColor: color ?? "var(--color-gray-medium)" }}
    >
      {nickname?.[0] ?? "?"}
    </div>
  );
}

function ProfileTrigger({
  nickname,
  imageUrl,
  color,
}: {
  nickname: string;
  imageUrl: string | null;
  color?: string;
}) {
  const { open } = useDropdown();

  return (
    <button type="button" className="flex items-center cursor-pointer">
      <ProfileAvatar nickname={nickname} imageUrl={imageUrl} color={color} />
      <span className="ml-[12px] text-lg font-medium text-black-medium">
        {nickname}
      </span>
      <span
        className={`ml-[8px] text-gray-dark transition-transform ${
          open ? "rotate-180" : ""
        }`}
        aria-hidden
      >
        ▾
      </span>
    </button>
  );
}

export default function ProfileDropdown({
  nickname,
  profileImageUrl = null,
  avatarColor,
  onLogout,
}: Props) {
  const router = useRouter();

  const handleAccount = () => router.push("/account");
  const handleMyDashboard = () => router.push("/dashboard");
  const handleLogout = () => onLogout?.();

  return (
    <div className="relative inline-flex">
      <Dropdown>
        <DropdownTrigger>
          <ProfileTrigger
            nickname={nickname}
            imageUrl={profileImageUrl}
            color={avatarColor}
          />
        </DropdownTrigger>

        <DropdownMenu
          className="
            mt-[10px]
            w-[140px]
            rounded-[6px]
            bg-white
            border border-gray-light
            overflow-hidden
          "
        >
          <DropdownItem
            onClick={handleLogout}
            className="
              group
              h-[44px]
              !px-0 !py-0
              hover:bg-violet-light
              cursor-pointer
            "
          >
            <div
              className="
                flex h-full items-center justify-center
                text-center px-[16px]
                text-lg font-medium
                text-black-medium
                group-hover:text-violet-main
                transition-colors
              "
            >
              로그아웃
            </div>
          </DropdownItem>

          <DropdownItem
            onClick={handleAccount}
            className="
              group
              h-[44px]
              !px-0 !py-0
              hover:bg-violet-light
              cursor-pointer
            "
          >
            <div
              className="
                flex h-full items-center justify-center
                text-center px-[16px]
                text-lg font-medium
                text-black-medium
                group-hover:text-violet-main
                transition-colors
              "
            >
              계정관리
            </div>
          </DropdownItem>

          <DropdownItem
            onClick={handleMyDashboard}
            className="
              group
              h-[44px]
              !px-0 !py-0
              hover:bg-violet-light
              cursor-pointer
            "
          >
            <div
              className="
                flex h-full items-center justify-center
                text-center px-[16px]
                text-lg font-medium
                text-black-medium
                group-hover:text-violet-main
                transition-colors
              "
            >
              내 대시보드
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
