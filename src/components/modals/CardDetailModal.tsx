import { Controller } from "react-hook-form";
import BaseModal from "../common/BaseModal";
import { useCardDetail } from "@/hooks/useCardDetail";

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  columnTitle: string;
}

export default function CardDetailModal({
  isOpen,
  onClose,
  cardId,
  columnTitle,
}: CardDetailModalProps) {
  const { control, isValid, handleSubmit, onSubmit } = useCardDetail(cardId);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      width={730}
      radius="md"
      padding="lg"
      gap="md"
    >
      <div className="w-full">
        <div className="flex justify-between">
          <h2>할일 카드 제목</h2>
          <div className="flex">
            {/* TODO: 공용 드롭다운 컴포넌트 작업 완료 시 교체 예정 (현재 임시 구현) */}
            <div>
              kabak 메뉴
              <ul>
                <li>수정하기</li>
                <li>삭제하기</li>
              </ul>
            </div>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <div className="flex">
              <div>{columnTitle}</div>
              <div>
                <span>해시태그</span>
                <span>해시태그</span>
              </div>
            </div>
            <div>할일 설명</div>
            <div>할일 이미지</div>

            <div className="h-[224px] overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label htmlFor={field.name}>댓글</label>
                      <div>
                        <textarea
                          {...field}
                          id={field.name}
                          placeholder="댓글 작성하기"
                        />
                        {/* TODO: 공용 버튼 컴포넌트 작업 완료 시 교체 예정 */}
                        <button type="submit" disabled={!isValid}>
                          입력
                        </button>
                      </div>
                    </div>
                  )}
                />
              </form>

              <ul>
                <li className="flex">
                  <div>프로필 이미지</div>
                  <div>
                    <div className="flex">
                      <div>이름</div>
                      <div>0000.00.00 00:00</div>
                    </div>
                    <div>내용</div>
                    <div className="flex">
                      <button type="button">수정</button>
                      <button type="button">삭제</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <ul>
            <li>
              <dt>담당자</dt>
              <dd>
                <div>
                  <div>담당자 프로필 이미지</div>
                  담당자 닉네임
                </div>
              </dd>
            </li>
            <li>
              <dt>마감일</dt>
              <dd>0000.00.00 00:00</dd>
            </li>
          </ul>
        </div>
      </div>
    </BaseModal>
  );
}
