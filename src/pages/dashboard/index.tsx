import SideBar from "@/pages/dashboard/SideBar";
import Column from "./Column";
import Image from "next/image";


export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-gray-bg items-stretch"> 
      <aside className="shrink-0">
        <SideBar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white">
          <div className="h-[70px]"/>
        </header>
      

        <main className="flex-1 flex flex-col lg:flex-row bg-gray-bg divide-x divide-gray-light">
          <Column title="To Do" count={3} />
          <Column title="On Progress" count={3} />
          <Column title="Done" count={3} />

          <div className="min-w-[354px] flex flex-col p-3">
          <button className="h-17.5 bg-white border border-gray-light rounded-md flex items-center justify-center gap-3 font-bold hover:bg-gray-50 transition-colors">
            새로운 컬럼 추가하기
            <Image src="/icons/add_box_purple.svg" alt="추가" width={22} height={22} />
          </button>
          </div>
        </main>
      </div>

    </div>
  );
}
