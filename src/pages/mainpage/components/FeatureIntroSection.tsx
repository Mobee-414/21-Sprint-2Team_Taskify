import Image from "next/image";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const FeatureIntroSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="flex justify-center px-4 py-[90px]">
      <div
        ref={ref}
        className={`
          relative overflow-hidden rounded-[8px]
          bg-gray-surface
          transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}

          w-[343px] h-[686px]
          tablet:w-[664px] tablet:h-[972px]
          desktop:w-[1200px] desktop:h-[600px]
        `}
      >
        <div
          className="
            absolute bottom-0
            left-1/2 -translate-x-1/2
            tablet:left-1/2 tablet:-translate-x-1/2
            desktop:left-[108px] desktop:translate-x-0
          "
        >
          <div
            className="
              relative overflow-hidden rounded-tl-xl
              w-[217.13px] h-[250px]
              tablet:w-[360.44px] tablet:h-[415px]
              desktop:w-[436px] desktop:h-[502px]
            "
          >
            <Image
              src="/images/featureintro_section.png"
              alt="Feature intro"
              fill
              className="object-cover"
              sizes="(min-width: 1920px) 436px, (min-width: 768px) 360.44px, 217.13px"
            />
          </div>
        </div>

        <div
          className="
            absolute w-full
            top-[60px]
            flex flex-col items-center text-center

            tablet:w-auto tablet:items-start tablet:text-left
            tablet:left-10 tablet:top-[60px]

            desktop:left-[108px] desktop:top-[123px] desktop:translate-x-[536px]

            max-w-[420px]
          "
        >
          <p
            className="
              font-medium text-black-light
              text-[18px] tablet:text-[22px]
            "
          >
            Point2
          </p>

          <h3
            className="
              mt-[61px] tablet:mt-[100px]
              text-[36px] tablet:text-[48px]
              font-bold leading-tight
              text-black-pure
            "
          >
            해야 할 일을<br />
            등록하세요
          </h3>
        </div>
      </div>
    </section>
  );
};

export default FeatureIntroSection;
