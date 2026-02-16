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
        flex flex-wrap flex-col tablet:flex-row 
        justify-between 
        content-start tablet:content-center
        gap-[16px] tablet:gap-[10px]
        mb-[8px] tablet:mb-[24px] 
        "
    >
      <h2
        className="
        order-2 tablet:order-1 
        text-xl tablet:text-2xl font-bold text-black-medium
        w-full tablet:w-[calc(100%-98px)]
        whitespace-nowrap overflow-hidden overflow-ellipsis
        "
      >
        {title}
      </h2>
      <div
        className="
          order-1 tablet:order-2 
          flex justify-end content-center tablet:justify-center tablet: items-center
          gap-[16px] tablet:gap-[24px] 
          w-full tablet:w-auto
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
