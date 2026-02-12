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
          width={100}
          height={100}
          priority
        />

        <p className="mt-[24px] text-2lg font-regular text-gray-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
