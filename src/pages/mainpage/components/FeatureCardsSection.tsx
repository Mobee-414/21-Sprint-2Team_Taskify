import Image from "next/image";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const cards = [
  {
    img: "/images/featurecard_1.png",
    title: "대시보드 설정",
    desc: "대시보드 사진과 이름을 변경할 수 있어요.",
    desktopImgW: 300,
    desktopImgH: 123.87,
    mobileImgW: 260,
    mobileImgH: 107.35,
  },
  {
    img: "/images/featurecard_2.png",
    title: "초대",
    desc: "새로운 팀원을 초대할 수 있어요.",
    desktopImgW: 300,
    desktopImgH: 230.81,
    mobileImgW: 260,
    mobileImgH: 200.03,
  },
  {
    img: "/images/featurecard_3.png",
    title: "구성원",
    desc: "구성원을 초대하고 내보낼 수 있어요.",
    desktopImgW: 300,
    desktopImgH: 195.48,
    mobileImgW: 260,
    mobileImgH: 169.42,
  },
];

const FeatureCardsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white pb-0 tablet:pb-[160px]">
      <div
        ref={ref}
        className={`
          mx-auto w-full max-w-[1200px] px-4
          transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        `}
      >
        <h3 className="mb-[36px] text-center text-xl2 font-bold text-black-pure desktop:text-left">
          생산성을 높이는 다양한 설정 <span className="ml-2">⚡</span>
        </h3>

        <div className="grid grid-cols-1 justify-items-center gap-10 desktop:grid-cols-3 desktop:gap-[33px]">
          {cards.map((card) => (
            <div key={card.title} className="w-[343px] tablet:w-[378px]">
              <div className="flex items-center justify-center rounded-t-[8px] bg-gray-light w-[343px] h-[235.93px] tablet:w-[378px] tablet:h-[260px]">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={card.desktopImgW}
                  height={card.desktopImgH}
                  style={{
                    width: card.mobileImgW,
                    height: card.mobileImgH,
                  }}
                  className="tablet:w-auto tablet:h-auto"
                />
              </div>

              <div className="rounded-b-[8px] bg-gray-bg px-6 py-5 w-[343px] h-[112.52px] tablet:w-[378px] tablet:h-[124px]">
                <h4 className="text-2lg font-bold text-black-pure">
                  {card.title}
                </h4>
                <p className="mt-[18px] text-lg font-medium text-black-light">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsSection;
