import Image from "next/image";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const PriorityIntroSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="flex justify-center pt-[180px]">
      <div
        ref={ref}
        className={`
          relative grid h-[600px] w-[1200px] grid-cols-2 items-center rounded-[8px]
          bg-[#F9FAFB]
          transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        `}
      >
        <div className="absolute left-20 top-[123px] max-w-[420px]">
          <p className="text-[22px] font-medium text-[#4b4b4b]">Point1</p>

          <h3 className="mt-[100px] text-[48px] font-bold leading-tight text-black">
            일의 우선순위를<br />
            관리하세요
          </h3>
        </div>

        <div className="absolute bottom-0 right-0">
          <div className="relative h-[497.49px] w-[594px] overflow-hidden rounded-tl-xl">
            <Image
              src="/images/priorityintro_section.png"
              alt="Priority intro"
              fill
              className="object-cover"
              sizes="594px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriorityIntroSection;
