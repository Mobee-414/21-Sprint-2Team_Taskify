import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import { CardDetailValues } from "@/hooks/useCardDetail";
import { TagItem } from "@/types/card.type";
import Image from "next/image";
import ButtonInputDelete from "@/components/common/Button/ButtonInputDelete";
import BaseButton from "@/components/common/Button/ButtonBase";

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
    <div className="order-2 md:order-1">
      <div className="flex gap-[24px] md:gap-[40px] mb-[16px]">
        <div
          className="
          relative flex itmes-center
          text-xs font-regular text-violet-main
          p-[4px_8px_4px_20px] md:p-[4px_10px_4px_22px]
          rounded-[16px] bg-violet-light
          
          before:content-[''] before:absolute 
          before:top-1/2 before:-translate-y-1/2 
          before:left-[8px] md:before:left-[10px] 
          before:w-[6px] before:h-[6px] before:bg-violet-main
          before:rounded-[100%]
          
          after:content-[''] after:absolute 
          after:top-1/2 after:-translate-y-1/2 
          after:right-[-12px] md:after:right-[-20px] 
          after:w-[1px] after:h-[20px] after:bg-gray-base
          "
        >
          {columnTitle}
        </div>
        <div className="flex gap-[8px] md:gap-[6px]">
          {tagList.length > 0 &&
            tagList.map((tag, index) => (
              <span
                className="
                  text-xs font-regular 
                  px-[6px] py-[4px] md:px-[9.5px] py-[5px] 
                  rounded-[4px]
                  "
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
      <div className="text-xs md:text-md font-regular text-black-pure mb-[32px] md:mb-[16px]">
        {description}
      </div>
      <div className="relative w-full h-[168px] md:h-[246px] mb-[24px]">
        {imageUrl && (
          <Image
            fill
            className="object-cover rounded-[6px]"
            src={imageUrl}
            alt="${title} 이미지"
          />
        )}
      </div>

      <div className="h-[180px] md:h-[236px] overflow-y-auto mb-[16px] md:mb-[24px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <div>
                <div className="mb-[4px]">
                  <label
                    className="text-md md:text-lg font-medium text-black-medium"
                    htmlFor={field.name}
                  >
                    댓글
                  </label>
                </div>
                <div
                  className="
                    relative
                    h-[70px] md:h-[110px] 
                    p-[12px_20px_12px_12px] md:p-[16px_12px_12px_16px]
                    mb-[16px]
                    border border-gray-base rounded-[6px]
                    "
                >
                  <textarea
                    {...field}
                    id={field.name}
                    className="
                      resize-none 
                      w-[calc(100%-90px)] md:w-[calc(100%-80px)] h-full 
                      text-xs-tight md:text-md font-regular text-black-medium
                      placeholder-gray-medium placeholder:font-regular
                      ouline-none focus:outline-none
                      "
                    placeholder="댓글 작성하기"
                  />
                  <ButtonInputDelete
                    type="submit"
                    variant="secondary"
                    disabled={!isValid}
                    className="
                      absolute right-[20px] bottom-[12px] md:right-[11px]
                      w-[84px] h-[28px] md:w-[77px] md:h-[32px]
                      text-xs-tight font-medium
                      "
                  >
                    입력
                  </ButtonInputDelete>
                </div>
              </div>
            )}
          />
        </form>

        <ul>
          <li className="flex gap-[8px] md:gap-[12px]">
            {/* TODO: 댓글 API 작업 시 프로필 이미지 부분 Avatar 공통 컴포넌트로 교체 예정 */}
            <div>프로필 이미지</div>
            <div className="pt-[6px] md:pt-0">
              <div className="flex justify-center items-center gap-[8px] mb-[8px] md:mb-0">
                <div className="text-xs md:text-md font-semibold text-black-medium">
                  이름
                </div>
                <div className="text-[10px] md:text-xs font-regular text-gray-medium">
                  0000.00.00 00:00
                </div>
              </div>
              <div className="text-xs md:text-md font-regular text-black-medium mb-[8px] md:mb-[10px]">
                내용
              </div>
              <div className="flex gap-[8px] md:gap-[12px]">
                <BaseButton
                  type="button"
                  className="text-[10px] md:text-xs font-regular text-gray-medium underline"
                >
                  수정
                </BaseButton>
                <BaseButton
                  type="button"
                  className="text-[10px] md:text-xs font-regular text-gray-medium underline"
                >
                  삭제
                </BaseButton>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
