import Image from 'next/image';

const MainFooter = () => {
  return (
    <footer className="flex w-full justify-center bg-white">
      <div className="flex h-[64px] w-full max-w-[1760px] items-center justify-between px-4 text-[14px] text-[#4b4b4b]">
        <span className="text-[16px]">© codeit · 2023</span>

        <div className="flex gap-6">
          <a href="#" className="text-[16px] transition-colors hover:text-black">
            Privacy Policy
          </a>
          <a href="#" className="text-[16px] transition-colors hover:text-black">
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
