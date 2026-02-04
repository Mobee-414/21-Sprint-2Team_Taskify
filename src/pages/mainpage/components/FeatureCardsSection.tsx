import Image from "next/image";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const cards = [
  {
    img: "/images/featurecard_1.png",
    title: "대시보드 설정",
    desc: "대시보드 사진과 이름을 변경할 수 있어요.",
    imgW: 300,
    imgH: 124,
  },
  {
    img: "/images/featurecard_2.png",
    title: "초대",
    desc: "새로운 팀원을 초대할 수 있어요.",
    imgW: 300,
    imgH: 231,
  },
  {
    img: "/images/featurecard_3.png",
    title: "구성원",
    desc: "구성원을 초대하고 내보낼 수 있어요.",
    imgW: 300,
    imgH: 195,
  },
];

const FeatureCardsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white pb-[160px]">
      <div
        ref={ref}
        className={`
          mx-auto w-[1200px]
          transition-all duration-700 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        `}
      >
        <h3 className="mb-[36px] text-left text-[28px] font-bold text-black">
          생산성을 높이는 다양한 설정 <span className="ml-2">⚡</span>
        </h3>

        <div className="grid grid-cols-3 gap-[33px]">
          {cards.map((card) => (
            <div key={card.title} className="w-[378px]">
              {/* 이미지 영역 */}
              <div className="flex h-[260px] w-[378px] items-center justify-center rounded-t-[8px] bg-[#eeeeee]">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={card.imgW}
                  height={card.imgH}
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="h-[124px] w-[378px] rounded-b-[8px] bg-[#fafafa] px-6 py-5">
                <h4 className="text-[18px] font-bold text-black">
                  {card.title}
                </h4>
                <p className="mt-[18px] text-[16px] font-medium leading-6 text-[#4b4b4b]">
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
