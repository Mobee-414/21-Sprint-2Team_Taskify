import Image from "next/image";

type Props = {
  message: string;
};

export default function InvitedDashboardsEmpty({ message }: Props) {
  return (
    <div className="flex h-[calc(650px-120px)] items-center justify-center">
      <div className="flex flex-col items-center">
        <Image
          src="/images/no_Invitation.png"
          alt="초대 없음"
          width={60}
          height={60}
          priority
          className="
            tablet:w-[100px] tablet:h-[100px]
            desktop:w-[100px] desktop:h-[100px]
          "
        />

        <p
          className="
            mt-[24px]
            text-xs-tight
            font-regular text-gray-medium
            tablet:text-2lg
            desktop:text-2lg
          "
        >
          {message}
        </p>
      </div>
    </div>
  );
}
