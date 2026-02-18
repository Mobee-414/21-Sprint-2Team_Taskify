"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "../Dropdown";
import { useDropdown } from "@/contexts/DropdownContext";
import { getMyUser, type User } from "@/api/users.api";

type Props = {
  onLogout?: () => void;
};

const AVATAR_COLORS = [
  "#7AC555",
  "#760DDE",
  "#FFA500",
  "#76A5EA",
  "#E876EA",
];

const getAvatarColor = (seed: string) => {
  const sum = Array.from(seed).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
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
      className={[
        "flex h-[38px] w-[38px] items-center justify-center rounded-full text-white font-semibold",
        color ? "" : "bg-gray-medium",
      ].join(" ")}
      style={color ? { backgroundColor: color } : undefined}
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

      <span className="ml-[12px] text-lg font-medium text-black-medium hidden tablet:inline">
        {nickname}
      </span>

      <span
        className={`ml-[8px] text-gray-dark transition-transform hidden tablet:inline ${
          open ? "rotate-180" : ""
        }`}
        aria-hidden
      >
        ▾
      </span>
    </button>
  );
}

export default function ProfileDropdown({ onLogout }: Props) {
  const router = useRouter();

  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const data = await getMyUser(); 
        if (!alive) return;
        setMe(data);
      } catch (e) {
        console.error("getMyUser 실패:", e);
        if (!alive) return;
        setMe(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const nickname = me?.nickname ?? (loading ? "로딩중" : "사용자");
  const profileImageUrl = me?.profileImageUrl ?? null;

  const avatarColor = useMemo(() => getAvatarColor(nickname), [nickname]);

  const handleAccount = () => router.push("/mypage");
  const handleMyDashboard = () => router.push("/mydashboard");
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
