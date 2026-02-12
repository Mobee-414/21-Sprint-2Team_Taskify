"use client";

import { useState } from "react";
import BaseModal from "@/components/common/BaseModal";
import CardDetailModal from "@/components/modals/CardDetailModal";
import CardFormModal from "@/components/modals/CardFormModal";
import InviteModal from "@/components/modals/InviteModal";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { CardDetailType } from "@/types/card.type";
import { useCardDelete } from "@/hooks/useCardDelete";

export default function ModalTestPage() {
  const [openSmall, setOpenSmall] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);

  // 할일 상세보기 모달
  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState(false);

  // 할일 삭제 모달
  const [isCardDeleteModalOpen, setIsCardDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [deleteTargetTitle, setDeleteTargetTitle] = useState("");

  // 할일 생성수정 모달
  const TARGET_COLUMNID_ID = 58310; // 해당 상수가 쓰인곳은 칼럼 아이디로 변경 필요
  const TARGET_CARD_ID = 14877; // 해당 상수가 쓰인곳은 카드 아이디로 변경 필요
  const [isCardFormModalOpen, setIsCardFormModalOpen] = useState(false);
  const [CardModalMode, setCardModalMode] = useState<"create" | "edit">(
    "create",
  );
  const [columnId, setColumnId] = useState<number | null>(null);
  const [selectedCardData, setSelectedCardData] =
    useState<CardDetailType | null>(null);

  // addCardLocally -> syncCardList 교체 필요(카드 생성수정삭제 동시)
  const [cards, setCards] = useState<CardDetailType[]>([]);
  const addCardLocally = (newCard: CardDetailType) => {
    setCards((prev) => [newCard, ...prev]);
    setSelectedCardData(null);
  };

  const syncCardList = (
    type: "create" | "edit" | "delete",
    card?: CardDetailType | undefined,
    cardId?: number,
  ) => {
    switch (type) {
      case "create":
        if (card) setCards((prev) => [card, ...prev]);
        break;

      case "edit":
        if (card)
          setCards((prev) =>
            prev.map((item) => (item.id === card.id ? card : item)),
          );
        break;

      case "delete":
        if (cardId)
          setCards((prev) => prev.filter((item) => item.id !== cardId));
        break;
    }
    setSelectedCardData(null);
  };

  const handleCardDeleteModalOpen = (id: number, title: string) => {
    setDeleteTargetId(id);
    setDeleteTargetTitle(title);
    setIsCardDeleteModalOpen(true);
  };

  const { mutate: deleteCard } = useCardDelete(
    deleteTargetId as number,
    syncCardList,
  );
  const handleCardDelete = () => {
    if (!deleteTargetId) return;
    deleteCard();
    setIsCardDeleteModalOpen(false);
    setIsCardDetailModalOpen(false);
  };

  const handleCardFormOpen = (
    mode: "create" | "edit",
    columnId: number,
    data?: CardDetailType,
  ) => {
    setColumnId(columnId);
    if (mode === "edit" && data) {
      setSelectedCardData(data);
      setIsCardDetailModalOpen(false);
    }
    setCardModalMode(mode);
    setIsCardFormModalOpen(true);
  };

  const handleCardFormClose = () => {
    setIsCardFormModalOpen(false);
    setSelectedCardData(null);
  };

  // 초대하기 모달
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className="p-10 flex gap-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setOpenSmall(true)}
      >
        작은 모달
      </button>

      <button
        className="rounded bg-green-500 px-4 py-2 text-white"
        onClick={() => setOpenLarge(true)}
      >
        큰 모달
      </button>

      {/* 작은 모달 */}
      <BaseModal
        isOpen={openSmall}
        onClose={() => setOpenSmall(false)}
        width={280}
        radius="sm"
      >
        <div className="text-black">작은 모달 테스트</div>
      </BaseModal>

      {/* 큰 모달 */}
      <BaseModal
        isOpen={openLarge}
        onClose={() => setOpenLarge(false)}
        width={420}
        radius="md"
      >
        <div className="text-black">큰 모달 테스트</div>
      </BaseModal>

      {/* 할일 상세보기 모달 */}
      <button
        className="rounded bg-violet-main px-4 py-2 text-white"
        onClick={() => setIsCardDetailModalOpen(true)}
      >
        할일 상세보기
      </button>

      {isCardDetailModalOpen && (
        <CardDetailModal
          isOpen={isCardDetailModalOpen}
          onClose={() => setIsCardDetailModalOpen(false)}
          cardId={TARGET_CARD_ID}
          columnTitle={"테스트"}
          handleCardFormOpen={(data) =>
            handleCardFormOpen("edit", TARGET_COLUMNID_ID, data)
          }
          handleCardDeleteModalOpen={(id, title) =>
            handleCardDeleteModalOpen(id, title)
          }
        />
      )}

      {/* 할일 삭제 모달 */}
      <ConfirmModal
        isOpen={isCardDeleteModalOpen}
        onClose={() => setIsCardDeleteModalOpen(false)}
        onClick={handleCardDelete}
      >
        {deleteTargetTitle} 카드가 삭제됩니다.
      </ConfirmModal>

      {/* 할일 생성수정 모달 */}
      <button
        className="rounded bg-purple-deep px-4 py-2 text-white"
        onClick={() => handleCardFormOpen("create", TARGET_COLUMNID_ID)}
      >
        할일 생성
      </button>

      {CardFormModal && columnId && (
        <CardFormModal
          key={selectedCardData?.id || "create"}
          isOpen={isCardFormModalOpen}
          onClose={handleCardFormClose}
          mode={CardModalMode}
          columnId={columnId}
          initialData={selectedCardData}
          onSuccess={addCardLocally}
        />
      )}

      {/* 초대하기 모달 */}
      <button
        className="rounded bg-pink-main px-4 py-2 text-white"
        onClick={() => setIsInviteModalOpen(true)}
      >
        초대하기
      </button>
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  );
}
