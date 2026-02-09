import Image from "next/image";

export default function InvitedDashboardsEmpty() {
  return (
    <section
      className="
        h-[390px] w-[960px]
        rounded-[12px] bg-white
        px-[28px] py-[24px]
      "
    >
      <h2 className="text-[24px] font-bold text-[#333236]">
        초대받은 대시보드
      </h2>

      <div className="flex h-[calc(390px-24px-36px)] items-center justify-center">
        <div className="flex flex-col items-center">
          <Image
            src="/images/no_Invitation.png"
            alt="초대 없음"
            width={100}
            height={100}
            priority
          />

          <p className="mt-[24px] text-[18px] font-normal text-[#9FA6B2]">
            아직 초대받은 대시보드가 없어요
          </p>
        </div>
      </div>
    </section>
  );
}
