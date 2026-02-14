import Image from "next/image";

const MainFooter = () => {
  return (
    <footer className="flex w-full justify-center bg-[var(--color-white)] text-[var(--color-black-light)]">
      <div className="flex w-full flex-col items-center tablet:hidden">
        <div className="pt-[120.48px] text-lg">© codeit · 2023</div>

        <div className="mt-4 flex gap-6 text-lg">
          <a
            href="#"
            className="transition-colors hover:text-[var(--color-black-pure)]"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="transition-colors hover:text-[var(--color-black-pure)]"
          >
            FAQ
          </a>
        </div>

        <div className="mt-[68px] flex items-center gap-[14px] pb-[90px]">
          <Image
            src="/icons/email.svg"
            alt="Email"
            width={20}
            height={20}
            className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
          />
          <Image
            src="/icons/facebook.svg"
            alt="Facebook"
            width={22}
            height={22}
            className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
          />
          <Image
            src="/icons/instagram.svg"
            alt="Instagram"
            width={22}
            height={22}
            className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
          />
        </div>
      </div>

      <div className="hidden h-[64px] w-full max-w-[1760px] items-center justify-between px-4 text-md tablet:flex">
        <span className="text-lg">© codeit · 2026</span>

        <div className="flex gap-6">
          <a
            href="#"
            className="text-lg transition-colors hover:text-[var(--color-black-pure)]"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-lg transition-colors hover:text-[var(--color-black-pure)]"
          >
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-[14px]">
          <Image
            src="/icons/email.svg"
            alt="Email"
            width={20}
            height={20}
            className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
          />
          <Image
            src="/icons/facebook.svg"
            alt="Facebook"
            width={22}
            height={22}
            className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
          />
          <Image
            src="/icons/instagram.svg"
            alt="Instagram"
            width={22}
            height={22}
            className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
          />
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
