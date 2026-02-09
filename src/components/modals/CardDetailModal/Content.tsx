import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import { CardDetailValues } from "@/hooks/useCardDetail";
import { CardDetailType, TagItem } from "@/types/card.type";
import Image from "next/image";

interface ContentProps {
  columnTitle: string;
  control: Control<CardDetailValues>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<CardDetailValues>;
  onSubmit: (data: CardDetailValues) => void;
  title: string;
  description: string;
  imageUrl: string;
  tagList: TagItem[];
}

export default function Content({
  columnTitle,
  control,
  isValid,
  handleSubmit,
  onSubmit,
  title,
  description,
  imageUrl,
  tagList,
}: ContentProps) {
  return (
    <div>
      <div className="flex">
        <div>{columnTitle}</div>
        <div>
          {tagList.length > 0 &&
            tagList.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: tag.bgColor,
                  color: tag.fontColor,
                }}
              >
                {tag.name}
              </span>
            ))}
        </div>
      </div>
      <div>{description}</div>
      <div>
        {imageUrl && (
          <Image
            width={420}
            height={246}
            src={imageUrl}
            alt={`${title} 이미지`}
          />
        )}
      </div>

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
