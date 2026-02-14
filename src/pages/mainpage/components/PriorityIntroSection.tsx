import Image from "next/image";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const PriorityIntroSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="flex justify-center px-4 pt-[180px]">
      <div
        ref={ref}
        className={`
          relative overflow-hidden rounded-[8px]
          bg-[var(--color-gray-surface)]
          transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}

          w-[343px] h-[686px]
          tablet:w-[664px] tablet:h-[972px]
          desktop:w-[1200px] desktop:h-[600px]
        `}
      >
        <div
          className="
            absolute w-full
            top-[60px]
            flex flex-col items-center text-center

            tablet:w-auto tablet:items-start tablet:text-left
            tablet:left-10 tablet:top-[60px]

            desktop:left-20 desktop:top-[123px]
            max-w-[420px]
          "
        >
          <p
            className="
              font-medium text-[var(--color-black-light)]
              text-[18px] tablet:text-[22px]
            "
          >
            Point 1
          </p>

          <h3
            className="
              mt-[61px] tablet:mt-[100px]
              text-[36px] tablet:text-[48px]
              font-bold leading-tight
              text-[var(--color-black-pure)]
            "
          >
            일의 우선순위를<br />
            관리하세요
          </h3>
        </div>

        <div
          className="
            absolute bottom-0 right-1/2 translate-x-1/2
            tablet:right-0 tablet:translate-x-0
          "
        >
          <div
            className="
              relative overflow-hidden rounded-tl-xl
              w-[296.11px] h-[248px]
              tablet:w-[519.39px] tablet:h-[435px]
              desktop:w-[594px] desktop:h-[497.49px]
            "
          >
            <Image
              src="/images/priorityintro_section.png"
              alt="Priority intro"
              fill
              className="object-cover"
              sizes="(min-width: 1920px) 594px, (min-width: 768px) 519.39px, 296.11px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriorityIntroSection;
