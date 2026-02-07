import Image from 'next/image';

interface ColumnProps {
  title: string;
  count: number;
}

export default function Column({ title, count, }: ColumnProps) {
  return (
    <div className="w-full lg:min-w-[354px] flex flex-col gap-4 p-3">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-main" />
          <span className="font-bold text-lg">{title}</span>
          <span className="bg-gray-light px-2 py-0.5 rounded text-xs text-gray-dark">{count}</span>
        </div>
        <button><Image src="/icons/setting.svg" alt="설정" width={24} height={24} /></button>
      </div>

      {/* 할 일 추가 버튼 */}
      <button className="w-full py-2 bg-white border border-gray-light rounded-md text-violet-main font-bold flex justify-center items-center">
        <Image src="/icons/add_box_purple.svg" alt="할일 추가" width={22} height={22} />
      </button>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
        {/* 여기에 TaskCard 렌더링될 예정 */}
        <div className="h-40 bg-white rounded-lg shadow-sm p-4">할 일 카드 예시</div>
      </div>
    </div>
  );
}