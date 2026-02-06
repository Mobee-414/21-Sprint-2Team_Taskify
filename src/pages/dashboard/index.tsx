import SideBar from "@/pages/dashboard/SideBar";
import Column from "./Column";
import Image from "next/image";


export default function Dashboard() {
  return (
    <div className="flex h-screen w-full">
      <aside>
        <SideBar />
      </aside>
      <header>

      </header>
      <main className="flex-1 flex overflow-y-auto bg-gray-bg divide-x divide-gray-light">
        <Column title="To Do" count={3} />
        <Column title="On Progress" count={3} />
        <Column title="Done" count={3} />
        <div className="min-w-88.5 flex flex-col p-3">
        <div className="h-17.5" />
        <button className="h-17.5 bg-white border border-gray-light rounded-md flex items-center justify-center gap-3 font-bold hover:bg-gray-50 transition-colors">
          새로운 컬럼 추가하기
          <Image src="/icons/add_box_purple.svg" alt="추가" width={22} height={22} />
        </button>
        </div>
      </main>
    </div>
  );
}
