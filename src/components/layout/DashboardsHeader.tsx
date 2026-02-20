'use client'

import Image from "next/image";
import ProfileDropdown from "@/components/dropdown/feature/Profile";
import { useLogout } from "@/hooks/useLogout";

type Props = {
  onClickPlus: () => void;
};

export default function DashboardsHeader({ onClickPlus }: Props) {
  const { logout } = useLogout();

  return (
    <>
      <header
        className="
          flex h-[70px]
          items-center
          justify-between
          border-b border-gray-base
          bg-white
          hidden tablet:flex
          tablet:pl-[40px] tablet:pr-[32px]
          desktop:pr-[80px]
        "
      >
        <h1 className="text-xl font-bold text-black-medium">내 대시보드</h1>

        <div className="flex items-center">

          <div className="w-[36px]" />
          <div className="h-[40px] w-px bg-gray-base" />
          <div className="w-[36px]" />

          <ProfileDropdown
            onLogout={logout}
          />
        </div>
      </header>

      <header
        className="
          flex h-[70px]
          items-center
          justify-between
          border-b border-gray-base
          bg-white
          px-4
          tablet:hidden
        "
      >
        <h1 className="text-[16px] font-bold text-black-medium whitespace-nowrap">
          내 대시보드
        </h1>

        <div className="flex items-center flex-nowrap">

          <div className="w-[12px]" />
          <div className="h-[30px] w-px bg-gray-base shrink-0" />
          <div className="w-[12px]" />

          <ProfileDropdown
            onLogout={() => {
              console.log("logout");
            }}
          />
        </div>
      </header>
    </>
  );
}
