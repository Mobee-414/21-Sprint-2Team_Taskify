import Avatar from "@/components/common/Avatar";
import BaseButton from "@/components/common/Button/ButtonBase";
import ButtonInputDelete from "@/components/common/Button/ButtonInputDelete";
import { CardCommentValues } from "@/hooks/useCardDetail";
import { CommentItem } from "@/types/comment.type";
import { formatToDisplayDate } from "@/utils/formatDate";
import { RefObject } from "react";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";

interface ListProps {
  commentList: CommentItem[];
  loading: boolean;
  loadingMore: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
}

interface FormProps {
  control: Control<CardCommentValues>;
  isValid: boolean;
}

interface CommentProps {
  listProps: ListProps;
  formProps: FormProps;
  handleSubmit: UseFormHandleSubmit<CardCommentValues>;
  onSubmit: (data: CardCommentValues) => void;
}

export default function CommentForm({
  listProps,
  formProps,
  handleSubmit,
  onSubmit,
}: CommentProps) {
  const { control, isValid } = formProps;
  const { commentList, loading, loadingMore, sentinelRef } = listProps;

  return (
    <div
      className={`flex flex-col ${commentList.length > 0 ? "gap-[16px]" : ""} max-h-[180px] md:max-h-[236px] overflow-y-auto`}
    >
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
                      outline-none focus:outline-none
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

      <ul className="flex flex-col gap-[15px] md:gap-[20px]">
        {loading ? (
          <div className="py-[40px] text-center text-md text-gray-dark">
            불러오는 중...
          </div>
        ) : (
          <>
            {commentList.map((comment) => (
              <li key={comment.id} className="flex gap-[8px] md:gap-[12px]">
                <Avatar
                  nickname={comment.author.nickname}
                  imageUrl={comment.author.profileImageUrl}
                  className="min-w-[26px] h-[26px] md:min-w-[34px] md:h-[34px]"
                />
                <div className="pt-[6px] md:pt-0">
                  <div className="flex items-center gap-[8px] mb-[8px] md:mb-0">
                    <div className="text-xs md:text-md font-semibold text-black-medium">
                      {comment.author.nickname}
                    </div>
                    <div className="text-[10px] md:text-xs font-regular text-gray-medium">
                      {formatToDisplayDate(comment.updatedAt)}
                    </div>
                  </div>
                  <div className="text-xs md:text-md font-regular text-black-medium mb-[8px] md:mb-[10px]">
                    {comment.content}
                  </div>
                  <div className="flex gap-[8px] md:gap-[12px]">
                    {/* TODO: 내가 쓴 댓글일때만 노출되도록 작업 예정 */}
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
            ))}
          </>
        )}

        <div
          ref={sentinelRef}
          className="w-full h-[1px] opacity-0 pointer-events-none"
          aria-hidden="true"
        />

        {loadingMore && (
          <li className="py-[10px] text-center text-xs text-gray-medium">
            더 불러오는 중...
          </li>
        )}
      </ul>
    </div>
  );
}
