import { useRouter } from "next/router";
import Image from "next/image";
import Pagination from "./Pagination";
import Tooltip from "@/components/common/Tooltip";
import ButtonDashboardAdd from "@/components/common/Button/ButtonDashboardAdd";
import { useMyDashboards } from "@/hooks/useMyDashboards";

type Props = {
  refreshKey: number;
  onClickCreate?: () => void;
};

export default function MyDashboardsSection({ refreshKey, onClickCreate }: Props) {
  const router = useRouter();

  const { page, setPage, totalPages, dashboards, loading } =
    useMyDashboards(refreshKey);

  return (
    <div className="ml-[40px] mt-[40px] w-[1022px]">
      <section>
        {loading ? (
          <div className="py-[40px] text-center text-md text-gray-dark">
            불러오는 중...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-x-[13px] gap-y-[12px]">
              <ButtonDashboardAdd
                type="button"
                onClick={onClickCreate}
                variant="secondary"
                borderline="gray"
              >
                <span>새로운 대시보드</span>
                <Image src="/icons/chip.svg" alt="추가" width={22} height={22} />
              </ButtonDashboardAdd>

              {dashboards.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => router.push(`/dashboard/${d.id}`)}
                  className="
                    flex h-[70px] w-[332px]
                    items-center justify-between
                    rounded-[8px] border border-gray-base bg-white
                    px-[16px]
                    hover:bg-gray-bg
                  "
                >
                  <div className="flex min-w-0 flex-1 items-center gap-[10px]">
                    <span
                      className="h-[8px] w-[8px] rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />

                    <Tooltip content={d.title} placement="bottom" onlyWhenTruncated>
                      <span className="min-w-0 flex-1 truncate text-lg font-semibold text-black-dark">
                        {d.title}
                      </span>
                    </Tooltip>

                    {d.createdByMe && (
                      <Image src="/icons/crown.svg" alt="owner" width={18} height={18} />
                    )}
                  </div>

                  <Image src="/icons/arrow_right.svg" alt="이동" width={18} height={18} />
                </button>
              ))}
            </div>

            {dashboards.length > 0 && (
              <div className="mt-[12px] flex items-center justify-end">
                <span className="text-md font-regular text-black-medium mr-[16px]">
                  {page} 페이지 중 {totalPages}
                </span>
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
