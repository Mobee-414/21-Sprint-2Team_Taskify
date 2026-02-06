import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { CardFormValues } from "@/hooks/useCardForm";
import { Input } from "@/components/common/Input";

interface ContentProps {
  mode: "create" | "edit";
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<CardFormValues>;
  onSubmit: (data: CardFormValues) => void;
  onClose: () => void;
}

export default function Content({
  mode,
  control,
  errors,
  isValid,
  handleSubmit,
  onSubmit,
  onClose,
}: ContentProps) {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === "edit" && (
          <Controller
            name="columnId"
            control={control}
            render={({ field }) => (
              <div>
                <div>
                  <label htmlFor={field.name}>상태</label>
                </div>
                <div>드롭다운 추가</div>
              </div>
            )}
          />
        )}

        <Controller
          name="assigneeUserId"
          control={control}
          render={({ field }) => (
            <div>
              <div>
                <label htmlFor={field.name}>담당자</label>
              </div>
              <div>드롭다운 추가</div>
            </div>
          )}
        />

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              label="제목"
              field={field}
              type="text"
              placeholder="제목을 입력해주세요"
              required={true}
              error={errors.title?.message}
              labelSize="labelMd"
              labelWeight="medium"
              inputSize="inputMd"
              errorSize="errorSm"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <div>
                <label htmlFor={field.name}>설명</label>
                <span>*</span>
              </div>
              <div>
                <textarea
                  {...field}
                  id={field.name}
                  placeholder="설명을 입력해 주세요"
                />
              </div>
              {errors && <div>{errors.description?.message}</div>}
            </div>
          )}
        />

        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <div>
              <div>
                <label htmlFor={field.name}>마감일</label>
              </div>
              <div>
                {/* TODO: [DatePicker] 라이브러리 도입 및 마감일 선택 기능 구현 예정 */}
              </div>
            </div>
          )}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div>
              <div>
                <label htmlFor={field.name}>태그</label>
              </div>
              <div>
                {/* TODO: [HashTag] 태그 입력 UI 및 생성/삭제 로직 추가 예정 */}
              </div>
            </div>
          )}
        />

        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <div>
              <label htmlFor={field.name}>
                이미지
                <div>
                  {/* TODO: [Image] 이미지 업로드 미리보기 및 파일 핸들링 기능 추가 예정 */}
                </div>
              </label>
            </div>
          )}
        />

        <div>
          <button type="button" onClick={onClose}>
            취소
          </button>
          {mode === "create" ? (
            <button type="submit">생성</button>
          ) : (
            <button type="submit">수정</button>
          )}
        </div>
      </form>
    </div>
  );
}
