import ButtonModalClose from "@/components/common/Button/ButtonModalClose";
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
    <div
      className="
        flex flex-wrap flex-col md:flex-row 
        justify-between 
        content-start md:content-center
        gap-[16px] md:gap-[10px]
        mb-[8px] md:mb-[24px] 
        "
    >
      <h2
        className="
        order-2 md:order-1 
        text-xl md:text-2xl font-bold text-black-medium
        w-full md:w-[calc(100%-98px)]
        whitespace-nowrap overflow-hidden overflow-ellipsis
        "
      >
        {title}
      </h2>
      <div
        className="
          order-1 md:order-2 
          flex justify-end content-center md:justify-center md: items-center
          gap-[16px] md:gap-[24px] 
          w-full md:w-auto
          "
      >
        <KebabMenuDropdown
          onEdit={handleCardFormOpen}
          onDelete={handleCardDeleteModalOpen}
        />
        <ButtonModalClose onClick={onClose} />
      </div>
    </div>
  );
}
