import { KebabMenuDropdown } from "@/components/dropdown/feature/KebabMenu";

interface HeaderProps {
  title: string;
  onClose: () => void;
  handleCardFormOpen: () => void;
  handleCardDeleteModalOpen: () => void;
}

export default function Header({
  title,
  onClose,
  handleCardFormOpen,
  handleCardDeleteModalOpen,
}: HeaderProps) {
  return (
    <div className="flex justify-between">
      <h2>{title}</h2>
      <div className="flex">
        <KebabMenuDropdown
          onEdit={handleCardFormOpen}
          onDelete={handleCardDeleteModalOpen}
        />
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
