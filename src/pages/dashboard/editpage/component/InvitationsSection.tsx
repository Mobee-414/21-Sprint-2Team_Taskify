import type { Invitation } from "@/types/invitation.type";

export default function InvitationsSection({
  invites,
  loading,
  hasNext,
  onLoadMore,
  onOpenInvite,
  onCancel,
}: {
  invites: Invitation[];
  loading: boolean;
  hasNext: boolean;
  onLoadMore: () => void;
  onOpenInvite: () => void;
  onCancel: (invitationId: number) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">초대 내역</h2>
        <button
          type="button"
          onClick={onOpenInvite}
          className="rounded-md border border-gray-base bg-white px-3 py-2 text-sm hover:bg-gray-surface"
        >
          초대하기
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {invites.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between rounded-md border border-gray-base bg-white p-3"
          >
            <div className="min-w-0">
              <p className="truncate font-medium">{inv.dashboard.title}</p>
              <p className="text-sm text-black-medium">
                {inv.inviter.nickname} · {inv.inviter.email}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onCancel(inv.id)}
              className="rounded-md border border-gray-base bg-white px-3 py-2 text-sm hover:bg-gray-surface"
            >
              취소
            </button>
          </div>
        ))}

        {hasNext && (
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loading}
            className="mt-2 h-[44px] rounded-md border border-gray-base bg-white text-sm hover:bg-gray-surface disabled:opacity-50"
          >
            {loading ? "불러오는 중..." : "더 불러오기"}
          </button>
        )}
      </div>
    </section>
  );
}
