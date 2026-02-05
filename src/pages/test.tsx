"use client";

import { useState } from "react";
import BaseModal from "@/components/common/BaseModal";
import CardDetailModal from "@/components/modals/CardDetailModal";
import CardFormModal from "@/components/modals/CardFormModal.tsx";

export default function ModalTestPage() {
  const [openSmall, setOpenSmall] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);

  // 할일 상세보기 모달
  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState(false);

  // 할일 생성수정 모달
  const TARGET_CARD_ID = 1; // 해당 상수가 쓰인곳은 카드 아이디로 변경 필요
  const [isCardFormModalOpen, setIsCardFormModalOpen] = useState(false);
  const [CardModalMode, setCardModalMode] = useState<"create" | "edit">(
    "create",
  );
  const [columnId, SetColumnId] = useState<number | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleCardFormOpen = (mode: "create" | "edit", id: number) => {
    if (mode === "create") {
      SetColumnId(id);
    } else {
      setSelectedCardId(id);
      setIsCardDetailModalOpen(false);
    }
    setCardModalMode(mode);
    setIsCardFormModalOpen(true);
  };

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
        padding="lg"
        gap="sm"
      >
        <div className="text-black">작은 모달 테스트</div>
      </BaseModal>

      {/* 큰 모달 */}
      <BaseModal
        isOpen={openLarge}
        onClose={() => setOpenLarge(false)}
        width={420}
        radius="md"
        padding="md"
        gap="lg"
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
      <CardDetailModal
        isOpen={isCardDetailModalOpen}
        onClose={() => setIsCardDetailModalOpen(false)}
        cardId={TARGET_CARD_ID}
        columnTitle={"테스트"}
        handleCardFormOpen={() => handleCardFormOpen("edit", TARGET_CARD_ID)}
      />

      {/* 할일 생성수정 모달 */}
      <button
        className="rounded bg-purple-deep px-4 py-2 text-white"
        onClick={() => handleCardFormOpen("create", 1)}
      >
        할일 생성
      </button>

      {(columnId !== null || selectedCardId !== null) && (
        <CardFormModal
          isOpen={isCardFormModalOpen}
          onClose={() => setIsCardFormModalOpen(false)}
          mode={CardModalMode}
          columnId={columnId}
          cardId={selectedCardId}
        />
      )}
    </div>
  );
}
