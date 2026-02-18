import type { ReactNode } from "react";
import TempSidebar from "./TempSidebar";
import DashboardsHeader from "./DashboardsHeader";

type Props = {
  children: ReactNode;
  onClickPlus?: () => void;

  refreshKey: number;
  onRefresh: () => void;
};

export default function DashboardsLayout({
  children,
  onClickPlus,
  refreshKey,
  onRefresh,
}: Props) {
  return (
    <div className="flex min-h-screen bg-gray-bg">
      <TempSidebar
        refreshKey={refreshKey}
        onCreatedGlobal={onRefresh}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardsHeader onClickPlus={onClickPlus ?? (() => {})} />

        <main className="min-w-0 flex-1 p-4 tablet:p-[20px]">{children}</main>
      </div>
    </div>
  );
}
