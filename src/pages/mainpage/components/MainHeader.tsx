import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="mt-3 flex w-full justify-center bg-[var(--color-white)] tablet:mt-[15px]">
      <div className="flex h-10 w-full max-w-[1760px] items-center justify-between px-4 tablet:px-6 desktop:px-10">
        <Link href="/" aria-label="Taskify home" className="shrink-0 tablet:hidden">
          <Image src="/icons/logo.svg" alt="logo" width={24} height={27} priority />
        </Link>

        <Link href="/" aria-label="Taskify home" className="hidden shrink-0 tablet:block">
          <Image src="/icons/main_logo.svg" alt="logo" width={121} height={39} priority />
        </Link>

        <nav className="flex items-center gap-6 tablet:gap-9">
          <Link
            href="/login"
            className="text-[14px] font-normal text-[var(--color-black-pure)] tablet:text-lg"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="text-[14px] font-normal text-[var(--color-black-pure)] tablet:text-lg"
          >
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
