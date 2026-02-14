import { useState } from "react";

interface ColumnType {
  id: number;
  title: string;
  count: number;
}

export function useDashboardModals() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const [selectedColumn, setSelectedColumn] =
    useState<ColumnType | null>(null);

  const [activeColumnId, setActiveColumnId] =
    useState<number | null>(null);

  const openEditColumn = (column: ColumnType) => {
    setSelectedColumn(column);
    setIsEditModalOpen(true);
  };

  const openAddCard = (columnId: number) => {
    setActiveColumnId(columnId);
    setIsCardModalOpen(true);
  };

  return {
    isAddModalOpen,
    setIsAddModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isCardModalOpen,
    setIsCardModalOpen,
    selectedColumn,
    activeColumnId,
    openEditColumn,
    openAddCard,
  };
}
