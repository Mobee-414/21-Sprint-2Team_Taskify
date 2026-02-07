import Image from 'next/image';

interface DashboardItemProps {
  title: string;
  color: string;
  createdByMe?: boolean;
  isActive?: boolean;
}

export default function DashboardItem({ title, color, createdByMe, isActive }: DashboardItemProps) {
  return (
    <div className={`
      flex items-center justify-between px-3 py-3 rounded-md cursor-pointer transition-colors
      ${isActive ? 'bg-violet-light text-violet-main' : 'hover:bg-gray-light text-gray-medium'}
    `}>
      <div className="flex items-center gap-3">
        {/* 컬러 점 */}
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: color }} 
        />
        <span className="text-lg font-medium">{title}</span>
      </div>
      
      {/* 내가 만든 경우만 표시 */}
      {createdByMe && (
        <Image src="/icons/crown.svg" alt="owner" width={17} height={14} />
      )}
    </div>
  );
}