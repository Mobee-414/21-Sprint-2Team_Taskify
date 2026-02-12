import Image from "next/image";
import ProfileDropdown from "@/components/dropdown/feature/Profile";

type Props = {
  onClickPlus: () => void;
};

export default function DashboardsHeader({ onClickPlus }: Props) {
  return (
    <header
      className="
        flex h-[70px]
        items-center
        justify-between
        border-b border-gray-base
        bg-white
        pl-[40px] pr-[80px]
      "
    >
      <h1 className="text-xl font-bold text-black-medium">내 대시보드</h1>

      <div className="flex items-center">
        <button
          type="button"
          className="
            flex items-center
            w-[88px] h-[40px]
            rounded-md border border-gray-base
            text-lg font-medium text-gray-dark
            hover:bg-gray-surface cursor-pointer
          "
        >
          <span className="ml-[16px] mr-[8px] flex items-center">
            <Image src="/icons/settings.svg" alt="관리" width={20} height={20} />
          </span>
          관리
        </button>

        <div className="w-[16px]" />

        <button
          type="button"
          className="
            flex items-center
            w-[116px] h-[40px]
            rounded-md border border-gray-base
            text-lg font-medium text-gray-dark
            hover:bg-gray-surface cursor-pointer
          "
          onClick={onClickPlus}
        >
          <span className="ml-[16px] mr-[8px] flex items-center">
            <Image src="/icons/add_box.svg" alt="초대하기" width={20} height={20} />
          </span>
          초대하기
        </button>

        <div className="w-[36px]" />

        <div className="h-[40px] w-px bg-gray-base" />

        <div className="w-[36px]" />

        <ProfileDropdown
          nickname="배유철"
          profileImageUrl={null}
          avatarColor="#7AC555"
          onLogout={() => {
            console.log("logout");
          }}
        />
      </div>
    </header>
  );
}
