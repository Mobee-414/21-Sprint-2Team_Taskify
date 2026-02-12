"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/common/Input";
import { Controller, useForm } from "react-hook-form";
import InviteModal from "@/components/modals/InviteModal";

const COLORS = ["#7AC555", "#760DDE", "#FFA500", "#76A5EA", "#E876EA"];
type FormValues = { title: string };

export default function DashboardEditTestPage() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [inviteOpen, setInviteOpen] = useState(false);

  const members = [
    { id: 1, nickname: "정만철" },
    { id: 2, nickname: "김태순" },
    { id: 3, nickname: "최주현" },
    { id: 4, nickname: "윤지현" },
  ];

  const invites = [
    { id: 101, inviteeEmail: "cc:deitA@codeit.com" },
    { id: 102, inviteeEmail: "cc:deitB@codeit.com" },
    { id: 103, inviteeEmail: "cc:deitC@codeit.com" },
    { id: 104, inviteeEmail: "codeitD@codeit.com" },
    { id: 105, inviteeEmail: "cc:deitE@codeit.com" },
  ];

  const [memberPage, setMemberPage] = useState(1);
  const [invitePage, setInvitePage] = useState(1);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { title: "뉴프로젝트" },
    mode: "onChange",
  });

  const onSubmit = (values: FormValues) => {
    alert(`변경 클릭! title=${values.title}, color=${selectedColor}`);
  };

  return (
    <div className="min-h-screen bg-gray-bg px-[20px] pt-[20px]">
      <button
        type="button"
        onClick={() => alert("돌아가기 클릭 (테스트)")}
        className="flex items-center gap-[6px]"
      >
        <Image src="/icons/arrow_forward.svg" alt="돌아가기" width={20} height={20} />
        <span className="text-lg font-medium text-black-medium">돌아가기</span>
      </button>

      <div className="mt-[34px] flex flex-col">
        <section className="w-[620px] h-[344px] rounded-[12px] bg-white px-[28px] py-[32px]">
          <h2 className="text-2xl font-bold text-black-medium">비브리지</h2>

          <div className="mt-[24px]">
            <div className="text-2lg font-medium text-black-medium">대시보드 이름</div>

            <div className="mt-[8px] w-[564px]">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    label=""
                    field={field}
                    placeholder="대시보드 이름"
                    labelSize="labelFixed"
                    labelWeight="medium"
                    inputSize="inputLg"
                  />
                )}
              />
            </div>

            <div className="mt-[16px] flex items-center gap-[12px]">
              {COLORS.map((color) => {
                const isSelected = color === selectedColor;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className="relative h-[30px] w-[30px] rounded-full"
                    style={{ backgroundColor: color }}
                  >
                    {isSelected && (
                      <Image
                        src="/icons/white_check.svg"
                        alt="선택됨"
                        width={24}
                        height={24}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="mt-[40px] h-[54px] w-[564px] rounded-[8px] bg-violet-main text-lg font-semibold text-white hover:opacity-90"
            >
              변경
            </button>
          </div>
        </section>

        <section className="mt-[16px] w-[620px] rounded-[12px] bg-white px-[28px] py-[32px]">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-black-medium">구성원</h3>

            <div className="flex items-center">
              <span className="text-md font-regular text-black-medium">
                {memberPage} 페이지 중 3
              </span>

              <div className="ml-[16px]">
                <div className="flex h-[40px] w-[80px] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMemberPage((p) => Math.max(1, p - 1))}
                    disabled={memberPage <= 1}
                    className="flex h-[40px] w-[40px] items-center justify-center bg-white rounded-l-[4px] disabled:opacity-50"
                    aria-label="이전"
                  >
                    <Image src="/icons/pagination_left.svg" alt="이전" width={16} height={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMemberPage((p) => Math.min(3, p + 1))}
                    disabled={memberPage >= 3}
                    className="-ml-px flex h-[40px] w-[40px] items-center justify-center bg-white rounded-r-[4px] disabled:opacity-50"
                    aria-label="다음"
                  >
                    <Image src="/icons/pagination_right.svg" alt="다음" width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[27px]">
            <div className="text-lg font-regular text-gray-medium">이름</div>

            <div className="mt-[17px] flex flex-col">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between border-b border-gray-light py-[12px]"
                >
                  <div className="flex items-center">
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-surface text-md font-bold text-gray-dark">
                      {m.nickname[0]}
                    </div>
                    <div className="ml-[12px] text-lg font-regular text-black-medium">
                      {m.nickname}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`멤버 삭제(테스트): ${m.nickname}`)}
                    className="h-[32px] w-[84px] rounded-[6px] bg-white text-md font-medium text-violet-main hover:bg-gray-surface border border-gray-base"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-[16px] w-[620px] rounded-[12px] bg-white px-[28px] py-[32px]">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-black-medium">초대 내역</h3>

            <div className="flex items-center gap-[16px]">
              <span className="text-md font-regular text-black-medium">
                {invitePage} 페이지 중 4
              </span>

              <div className="flex h-[40px] w-[80px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setInvitePage((p) => Math.max(1, p - 1))}
                  disabled={invitePage <= 1}
                  className="flex h-[40px] w-[40px] items-center justify-center bg-white rounded-l-[4px] disabled:opacity-50"
                  aria-label="이전"
                >
                  <Image src="/icons/pagination_left.svg" alt="이전" width={16} height={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setInvitePage((p) => Math.min(4, p + 1))}
                  disabled={invitePage >= 4}
                  className="-ml-px flex h-[40px] w-[40px] items-center justify-center bg-white rounded-r-[4px] disabled:opacity-50"
                  aria-label="다음"
                >
                  <Image src="/icons/pagination_right.svg" alt="다음" width={16} height={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setInviteOpen(true)}
                className="flex items-center justify-center gap-[6px] h-[32px] w-[105px] rounded-[8px] bg-violet-main text-md font-medium text-white hover:opacity-90"
              >
                <Image src="/icons/white_add_box.svg" alt="초대" width={16} height={16} />
                초대하기
              </button>
            </div>
          </div>

          <div className="mt-[32px]">
            <div className="text-lg font-regular text-gray-medium">이메일</div>

            <div className="mt-[17px] flex flex-col">
              {invites.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between border-b border-gray-light py-[12px]"
                >
                  <div className="text-lg font-regular text-black-medium">
                    {inv.inviteeEmail}
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`초대 취소(테스트): ${inv.inviteeEmail}`)}
                    className="h-[32px] w-[84px] rounded-[6px] bg-white text-md font-medium text-violet-main hover:bg-gray-surface border border-gray-base"
                  >
                    취소
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-[24px]">
          <button
            type="button"
            onClick={() => alert("대시보드 삭제하기(테스트)")}
            className="w-[320px] h-[62px] rounded-[8px] border border-gray-base bg-gray-bg text-2lg font-medium text-black-medium hover:opacity-90"
          >
            대시보드 삭제하기
          </button>
        </div>
      </div>

      <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}
