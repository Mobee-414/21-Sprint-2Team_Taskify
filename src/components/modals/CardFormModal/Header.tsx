interface HeaderProps {
  mode: "create" | "edit";
}

export default function Header({ mode }: HeaderProps) {
  return (
    <div>
      <h2>{mode === "create" ? "할 일 생성" : "할 일 수정"}</h2>
    </div>
  );
}
