interface HeaderProps {
  mode: "create" | "edit";
}

export default function Header({ mode }: HeaderProps) {
  return (
    <h2
      className="
      text-lg tablet:text-2xl font-bold text-black-medium 
      mb-[32px]
    "
    >
      {mode === "create" ? "할 일 생성" : "할 일 수정"}
    </h2>
  );
}
