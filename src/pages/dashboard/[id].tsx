import Sidebar from "@/components/layout/TempSidebar";
import Column from "@/pages/dashboard/Column";
import Image from "next/image";
import CreateColumnModal from "@/components/modals/ColumnModal/CreateColumnModal";
import EditColumnModal from "@/components/modals/ColumnModal/EditColumnModal";
import CardFormModal from "@/components/modals/CardFormModal";
import { useRouter } from "next/router";
import Header from "@/pages/dashboard/Header";
import { useDashboardMembers } from "@/hooks/useDashboardMembers";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useDashboardModals } from "@/hooks/useDashboardModals";
import { useState } from "react";
import { SyncCardListType } from "@/types/card.type";
import Header from "./Header";
import { getDashboard } from "@/api/dashboards.api";
import type { Dashboard as DashboardType } from "@/types/dashboard.type";

interface ColumnType {
  id: number;
  title: string;
  count: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = id ? Number(id) : null;

  const { data: memberData } = useDashboardMembers(dashboardId ?? undefined);
  const members = memberData?.members ?? [];
  const totalCount = memberData?.totalCount ?? 0;

  const { columns, dashboardData, isLoading } = useDashboardData(dashboardId);

  const [createHandler, setCreateHandler] = useState<
    Record<number, SyncCardListType>
  >({});

  const {
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
  } = useDashboardModals();

  if (!dashboardId || isLoading) return null;

  return (
    <div className="flex min-h-screen w-full bg-gray-bg items-stretch">
      <aside className="shrink-0">
        <Sidebar refreshKey={0} />
      </aside>

      <div className="flex-1 flex flex-col">
        <Header
          title={dashboardData?.title || "대시보드"}
          isOwner={dashboardData?.createdByMe || false}
          members={members}
          totalCount={totalCount}
          onEditClick={() => router.push(`/dashboard/${dashboardId}/edit`)}
        />

        <main className="flex-1 flex flex-col lg:flex-row bg-gray-bg divide-x divide-gray-light">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              onEditClick={() => openEditColumn(column)}
              onAddCard={() => openAddCard(column.id)}
              registerCreateHandler={(handler) =>
                setCreateHandler((prev) => ({
                  ...prev,
                  [column.id]: handler,
                }))
              }
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

      {isAddModalOpen && (
        <CreateColumnModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          dashboardId={dashboardId}
        />
      )}

      {selectedColumn && (
        <EditColumnModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          column={selectedColumn}
          dashboardId={dashboardId}
        />
      )}

      {isCardModalOpen && activeColumnId && (
        <CardFormModal
          isOpen={isCardModalOpen}
          onClose={() => setIsCardModalOpen(false)}
          mode="create"
          columnId={activeColumnId}
          onSuccess={(action, cardData) => {
            if (cardData) {
              createHandler[cardData.columnId]?.(action, cardData);
            }
            setIsCardModalOpen(false);
          }}
        />
      )}
    </div>
  );
}