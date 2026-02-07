import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="mt-[15px] flex w-full justify-center bg-[var(--color-white)]">
      <div className="flex h-[40px] w-full max-w-[1760px] items-center justify-between px-4">
        <Image
          src="/icons/main_logo.svg"
          alt="logo"
          width={121}
          height={39}
          priority
        />

        <div className="flex gap-9">
          <button className="text-lg font-regular text-[var(--color-black-pure)]">
            로그인
          </button>
          <button className="text-lg font-regular text-[var(--color-black-pure)]">
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
