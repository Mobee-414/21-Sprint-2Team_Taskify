import Image from 'next/image';
import DashboardItem from './DashboardItem';
import { useState } from 'react';

const MOCK_DATA = [
  { id: 1, title: '비브리지', color: '#7AC555', createdByMe: true },
  { id: 2, title: '코드잇', color: '#760DDE', createdByMe: true },
  { id: 3, title: '3분기 계획', color: '#FFA500', createdByMe: false },
  { id: 4, title: '회의록', color: '#76A5EA', createdByMe: false },
  { id: 5, title: '중요 문서함', color: '#E876EA', createdByMe: false },
  { id: 6, title: '비브리지', color: '#7AC555', createdByMe: true },
  { id: 7, title: '코드잇', color: '#760DDE', createdByMe: true },
  { id: 8, title: '3분기 계획', color: '#FFA500', createdByMe: false },
  { id: 9, title: '회의록', color: '#76A5EA', createdByMe: false },
  { id: 10, title: '중요 문서함', color: '#E876EA', createdByMe: false },
  { id: 11, title: '비브리지', color: '#7AC555', createdByMe: true },
  { id: 12, title: '코드잇', color: '#760DDE', createdByMe: true },
  { id: 13, title: '3분기 계획', color: '#FFA500', createdByMe: false },
  { id: 14, title: '회의록', color: '#76A5EA', createdByMe: false },
  { id: 15, title: '중요 문서함', color: '#E876EA', createdByMe: false },
  { id: 16, title: '비브리지', color: '#7AC555', createdByMe: true },
  { id: 17, title: '코드잇', color: '#760DDE', createdByMe: true },
  { id: 18, title: '3분기 계획', color: '#FFA500', createdByMe: false },
  { id: 19, title: '회의록', color: '#76A5EA', createdByMe: false },
  { id: 20, title: '중요 문서함', color: '#E876EA', createdByMe: false },
];

export default function SideBar() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDashborads = MOCK_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }
  return (
    <aside
      className="
        w-75
        h-screen
        border-r
        bg-white
        flex
        flex-col
        px-3
        gap-2.5
        "
    >
      <div className="pt-5 pl-2 pr-2 pb-15 flex items-center">
        <Image
          src="/icons/logo.svg"
          alt="로고"
          height={24}
          width={27}
          priority
        />
        <Image
          src="/icons/Taskify.svg"
          alt="Taskify 텍스트"
          width={80}
          height={22}
          priority
        />
      </div>
      <div className="
        flex
        justify-between
        w-70
        h-5
      ">
        <div className="text-xs font-semibold text-gray-dark">Dash Boards</div>
        <Image
          src="/icons/add_box.svg"
          alt="add box"
          width={20}
          height={20}
          priority
        />
      </div>

      <div className="flex-1">
        {currentDashborads.map((item) => (
          <DashboardItem
            key={item.id}
            title={item.title}
            color={item.color}
            createdByMe={item.createdByMe}
            isActive={item.id === 1}
          />
        ))}
      </div>

      <div>
        <button
          onClick={handlePrevPage}
          disabled={isFirstPage}
          className="enabled:hover enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <Image 
            src={isFirstPage ? "/icons/disable_left_arrow.svg" : "/icons/left_arrow.svg"}
            alt="prev" 
            width={40} 
            height={40}
            />
        </button>
        <button
          onClick={handleNextPage}
          disabled={isLastPage}
          className="enabled:hover enabled:cursor-pointer disabled:cursor-not-allowed"
        >
          <Image 
            src={isLastPage ? "/icons/disable_right_arrow.svg" : "/icons/right_arrow.svg"}
            alt="next" 
            width={40} 
            height={40} 
          />
        </button>
      </div>

    </aside>
  )
}