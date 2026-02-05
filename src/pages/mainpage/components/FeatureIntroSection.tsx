import Image from "next/image";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const FeatureIntroSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="flex justify-center py-[90px]">
      <div
        ref={ref}
        className={`
          relative h-[600px] w-[1200px]
          rounded-[8px] bg-[var(--color-gray-surface)]
          transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        `}
      >
        <div className="absolute bottom-0 left-[108px]">
          <div className="relative h-[502px] w-[436px]">
            <Image
              src="/images/featureintro_section.png"
              alt="Feature intro"
              fill
              className="object-cover"
              sizes="436px"
              priority={false}
            />
          </div>
        </div>

        <div className="absolute top-[123px] left-[108px] translate-x-[536px]">
          <p className="mb-[100px] text-lg2 font-medium text-[var(--color-black-light)]">
            Point2
          </p>

          <h3 className="text-4xl font-bold text-[var(--color-black-pure)]">
            해야 할 일을 <br />
            등록하세요
          </h3>
        </div>
      </div>
    </section>
  );
};

export default FeatureIntroSection;
