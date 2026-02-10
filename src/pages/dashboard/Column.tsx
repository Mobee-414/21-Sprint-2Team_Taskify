import { getCards } from "@/api/cards.api";
import { Card } from "@/types/card.type";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ColumnProps {
  id: number;
  title: string;
  onEditClick: () => void;
}

export default function Column({ id, title, onEditClick }: ColumnProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getCards(id);
      setCards(data.cards);
    } catch (error) {
      console.log("카드 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <div className="w-full lg:min-w-[354px] flex flex-col gap-4 p-3">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-main" />
          <span className="font-bold text-lg">{title}</span>
          <span className="bg-gray-light px-2 py-0.5 rounded text-xs text-gray-dark">
            {cards.length}
          </span>
        </div>
        <button onClick={onEditClick} className="hover:opacity-70 transition">
          <Image src="/icons/setting.svg" alt="설정" width={24} height={24} />
        </button>
      </div>

      {/* 할 일 추가 버튼 */}
      <button className="w-full py-2 bg-white border border-gray-light rounded-md text-violet-main font-bold flex justify-center items-center">
        <Image
          src="/icons/add_box_purple.svg"
          alt="할일 추가"
          width={22}
          height={22}
        />
      </button>

      {/* 카드 추가 연결 시 렌더링 테스트 예정 */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
        {isLoading ? (
          <div className="text-center py-10 text-gray-medium">...</div>
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-som p-4 hover:ring-1 hover:ring-violet-main cursor-pointer"
            >
              <h3 className="font-bold text-black-dark mb-2">{card.title}</h3>
              <p className="text -sm text-gray-medium line-clamp-2">
                {card.description}
              </p>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
