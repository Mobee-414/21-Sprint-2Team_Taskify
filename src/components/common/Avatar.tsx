import Image from "next/image";

const AVATAR_COLORS = [
  "#FFC85A",
  "#FDD446",
  "#9DD7ED",
  "#C4B1A2",
  "#F4D7DA",
  "#A3C4A2",
];

const getAvatarColor = (nickname: string) => {
  const charCodeSum = Array.from(nickname).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );
  return AVATAR_COLORS[charCodeSum % AVATAR_COLORS.length];
};

export default function Avatar({
  nickname,
  imageUrl,
  size = 26,
}: {
  nickname: string;
  imageUrl: string | null;
  size?: number;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={nickname}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  const color = getAvatarColor(nickname);
  return (
    <div
      className="flex items-center justify-center rounded-full text-[var(--color-white)]"
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? "#A3C4A2",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {nickname?.[0] ?? "?"}
    </div>
  );
}
