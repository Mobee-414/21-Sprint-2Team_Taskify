import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-[140px] text-center">
      <Image
        src="/images/hero_section.png"
        alt="Hero Section Image"
        width={722}
        height={423}
        priority
        className="mb-10 rounded-lg shadow-lg"
      />

      <h2 className="mb-[48.24px] text-[76px] font-bold">
        새로운 일정 관리{" "}
        <span className="text-[#5534DA]">Taskify</span>
      </h2>

      <button className="mt-[125px] h-[54px] w-[280px] rounded-md bg-[#5534DA] text-[18px] font-medium text-white">
        로그인하기
      </button>
    </section>
  );
};

export default HeroSection;
