import { useState } from "react";
import DashboardsLayout from "@/components/layout/DashboardsLayout";
import MyDashboardsSection from "@/components/mydashboard/MyDashboardsSection";
import InvitedDashboardsSection from "@/components/mydashboard/InvitedDashboardsSection";
import CreateDashboardModal from "@/components/modals/CreateDashboardModal";
import type { Dashboard } from "@/api/dashboards.api";

export default function DashboardsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const bumpRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleCreated = (_created: Dashboard) => {
    bumpRefresh();
    setIsCreateOpen(false);
  };

  return (
    <DashboardsLayout
      refreshKey={refreshKey}
      onRefresh={bumpRefresh}
      onClickPlus={() => setIsCreateOpen(true)}
    >
      <MyDashboardsSection
        refreshKey={refreshKey}
        onClickCreate={() => setIsCreateOpen(true)}
      />

      <div className="ml-[40px] mt-[40px]">
        <InvitedDashboardsSection onAccepted={bumpRefresh} />
      </div>

      {isCreateOpen && (
        <CreateDashboardModal
          onClose={() => setIsCreateOpen(false)}
          onCreated={handleCreated}
        />
      )}
    </DashboardsLayout>
  );
}
