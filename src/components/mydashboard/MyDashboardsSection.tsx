import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Pagination from "./Pagination";
import { getDashboardsPagination, type Dashboard } from "@/api/dashboards.api";
import ButtonDashboardAdd from "@/components/common/Button/ButtonDashboardAdd";

const SIZE = 5;

type Props = {
  refreshKey: number;
  onClickCreate?: () => void;
};

export default function MyDashboardsSection({ refreshKey, onClickCreate }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const data = await getDashboardsPagination({ page, size: SIZE });
        if (!alive) return;

        setTotalCount(data.totalCount);
        setDashboards(data.dashboards);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [page, refreshKey]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / SIZE)),
    [totalCount]
  );

  return (
    <div className="ml-[40px] mt-[40px] w-[1022px]">
      <section>
        {loading ? (
          <div className="py-[40px] text-center text-[14px] text-gray-dark">
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
                    rounded-[8px] border border-[var(--color-gray-base)] bg-white
                    px-[16px]
                    hover:bg-[var(--color-gray-bg)]
                  "
                >
                  <div className="flex items-center gap-[10px]">
                    <span
                      className="h-[8px] w-[8px] rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-[16px] font-semibold text-black-dark">
                      {d.title}
                    </span>
                    {d.createdByMe && (
                      <Image
                        src="/icons/crown.svg"
                        alt="owner"
                        width={18}
                        height={18}
                      />
                    )}
                  </div>

                  <Image
                    src="/icons/arrow_right.svg"
                    alt="이동"
                    width={18}
                    height={18}
                  />
                </button>
              ))}
            </div>

            {dashboards.length > 0 && (
              <div className="mt-[12px] flex items-center justify-end">
                <span className="text-[14px] font-normal text-[#333236] mr-[16px]">
                  {page} 페이지 중 {totalPages}
                </span>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
