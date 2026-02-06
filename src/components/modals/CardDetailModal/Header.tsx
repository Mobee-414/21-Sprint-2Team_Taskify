interface HeaderProps {
  title: string;
  onClose: () => void;
  handleCardFormOpen: () => void;
}

export default function Header({
  title,
  onClose,
  handleCardFormOpen,
}: HeaderProps) {
  return (
    <div className="flex justify-between">
      <h2>할일 카드 제목</h2>
      <div className="flex">
        {/* TODO: 공용 드롭다운 컴포넌트 작업 완료 시 교체 예정 (현재 임시 구현) */}
        <div>
          kabak 메뉴
          <ul>
            <li onClick={handleCardFormOpen}>수정하기</li>
            <li>삭제하기</li>
          </ul>
        </div>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
