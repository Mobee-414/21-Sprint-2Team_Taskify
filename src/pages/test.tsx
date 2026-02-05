"use client";

import { useState } from "react";
import BaseModal from "@/components/common/BaseModal";
import CardDetailModal from "@/components/modals/CardDetailModal";

export default function ModalTestPage() {
  const [openSmall, setOpenSmall] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);

  // 할일 상세보기 모달
  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState(false);

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
        cardId={1}
        columnTitle={"테스트"}
      />
    </div>
  );
}
