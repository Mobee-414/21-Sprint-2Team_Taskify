import Sidebar from "@/components/layout/TempSidebar";
import Column from "./Column";
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateColumnModal from "@/components/modals/ColumnModal/CreateColumnModal";
import axiosInstance from "@/api/axios";
import EditColumnModal from "@/components/modals/ColumnModal/EditColumnModal";
import CardFormModal from "@/components/modals/CardFormModal";
import { useRouter } from "next/router";
import Header from "./Header";
import { getDashboard, Dashboard as DashboardType } from "@/api/dashboards.api";

interface ColumnType {
  id: number;
  title: string;
  count: number;
}

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedColumn, setselectedColumn] = useState<ColumnType | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(
    null
  );

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = id ? Number(id) : null;

  const handleEditClick = (column: ColumnType) => {
    setselectedColumn(column);
    setIsEditModalOpen(true);
  };

  const handleAddCardOpen = (columnId: number) => {
    setActiveColumnId(columnId);
    setIsCardModalOpen(true);
  };

  const handleSuccess = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    if (!router.isReady || !dashboardId) return;

    console.log("대시보드 ID:", dashboardId);

    const fetchColumns = async () => {
      try {
        const response = await axiosInstance.get(
          `/columns?dashboardId=${dashboardId}`
        );
        setColumns(response.data.data);
        const data = await getDashboard(dashboardId);
        setDashboardData(data);
      } catch (error) {
        console.error("로딩 실패", error);
      }
    };

    fetchColumns();
  }, [router.isReady, dashboardId, refreshTrigger]);

  return (
    <div className="flex min-h-screen w-full bg-gray-bg items-stretch">
      <aside className="shrink-0">
        <Sidebar refreshKey={refreshTrigger} onCreatedGlobal={handleSuccess} />
      </aside>

      <div className="flex-1 flex flex-col">
        <Header
          title={dashboardData?.title || "대시보드"}
          isOwner={dashboardData?.createdByMe || false}
        />

        <main className="flex-1 flex flex-col lg:flex-row bg-gray-bg divide-x divide-gray-light">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              onEditClick={() => handleEditClick(column)}
              onAddCard={() => handleAddCardOpen(column.id)}
              refreshTrigger={refreshTrigger}
              onSuccess={handleSuccess}
            />
          ))}

          <div className="min-w-[354px] flex flex-col p-3">
            <button
              className="h-17.5 bg-white border border-gray-light rounded-md flex items-center justify-center gap-3 font-bold hover:bg-gray-50 transition-colors"
              onClick={() => setIsAddModalOpen(true)}
            >
              새로운 컬럼 추가하기
              <Image
                src="/icons/add_box_purple.svg"
                alt="추가"
                width={22}
                height={22}
              />
            </button>
          </div>
        </main>
      </div>

      {isAddModalOpen && dashboardId && (
        <CreateColumnModal
          key={isAddModalOpen ? "open" : "closed"}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          dashboardId={dashboardId}
          onSuccess={handleSuccess}
          existingColumns={columns}
        />
      )}

      {selectedColumn && (
        <EditColumnModal
          key={selectedColumn.id}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          column={selectedColumn}
          onSuccess={handleSuccess}
          existingColumns={columns}
        />
      )}

      {isCardModalOpen && activeColumnId && dashboardId && (
        <CardFormModal
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          mode="create"
          columnId={Number(activeColumnId)}
          onSuccess={() => {
            handleSuccess();
            setIsCardModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
