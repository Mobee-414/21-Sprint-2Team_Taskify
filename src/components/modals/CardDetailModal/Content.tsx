import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import { CardDetailValues } from "@/hooks/useCardDetail";

interface ContentProps {
  columnTitle: string;
  control: Control<CardDetailValues>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<CardDetailValues>;
  onSubmit: (data: CardDetailValues) => void;
}

export default function Content({
  columnTitle,
  control,
  isValid,
  handleSubmit,
  onSubmit,
}: ContentProps) {
  return (
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
  );
}
