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
    <div
      className="
        ml-[24px] mt-[24px]
        w-[260px]
        tablet:ml-[40px] tablet:mt-[40px] tablet:w-[507px]
        desktop:ml-[40px] desktop:mt-[40px] desktop:w-[1022px]
      "
    >
      <section>
        {loading ? (
          <div className="py-[40px] text-center text-md text-gray-dark">
            불러오는 중...
          </div>
        ) : (
          <>
            <div
              className="
                grid
                grid-cols-1
                tablet:grid-cols-2
                desktop:grid-cols-3
                gap-x-[13px] gap-y-[12px]
              "
            >
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
                    flex items-center justify-between
                    rounded-[8px] border border-gray-base bg-white
                    hover:bg-gray-bg
                    px-[16px]

                    w-[260px] h-[58px]
                    tablet:w-[247px] tablet:h-[68px]
                    desktop:w-[332px] desktop:h-[70px]
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
                <span className="whitespace-nowrap text-xs-tight tablet:text-md font-regular text-black-medium mr-[16px]">
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
