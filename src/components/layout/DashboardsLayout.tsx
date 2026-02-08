import TempSidebar from "./TempSidebar";
import DashboardsHeader from "./DashboardsHeader";

export default function DashboardsLayout() {
  return (
    <div className="flex min-h-screen bg-gray-bg">
      <TempSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        
        <DashboardsHeader onClickPlus={() => {}} />
      </div>
    </div>
  );
}
