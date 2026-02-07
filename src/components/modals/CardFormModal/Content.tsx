import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { CardFormValues } from "@/hooks/useCardForm";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/common/Input";
import DatePickerInput from "@/components/common/DatePickerInput";
import { DatepickerProps, TagItem } from "@/types/card.type";
import { ChangeEvent, RefObject } from "react";
import Image from "next/image";
import TagInput from "@/components/common/TagInput";
import ImageInput from "@/components/common/ImageInput";

interface FormProps {
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
  isValid: boolean;
}

interface TagsProps {
  tagList: TagItem[];
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentTags: string[],
    onChange: (value: string[]) => void,
  ) => void;
}

interface imageProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  previewUrl: string | null;
  handleImageButtonClick: () => void;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (value: File) => void,
  ) => void;
}

interface ContentProps {
  mode: "create" | "edit";
  formProps: FormProps;
  handleSubmit: UseFormHandleSubmit<CardFormValues>;
  onSubmit: (data: CardFormValues) => void;
  onClose: () => void;
  datepickerProps: DatepickerProps;
  tagsProps: TagsProps;
  imageProps: imageProps;
}

export default function Content({
  mode,
  formProps,
  handleSubmit,
  onSubmit,
  onClose,
  datepickerProps,
  tagsProps,
  imageProps,
}: ContentProps) {
  const { control, errors, isValid } = formProps;
  const { datepickerRef, handleDateChange } = datepickerProps;
  const { tagList, handleKeyDown } = tagsProps;
  const { fileInputRef, previewUrl, handleImageButtonClick, handleFileChange } =
    imageProps;

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
                <DatePickerInput
                  datepickerRef={datepickerRef}
                  field={field}
                  error={errors.dueDate?.message}
                  handleDateChange={handleDateChange}
                />
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
              <TagInput
                tagList={tagList}
                field={field}
                error={errors.dueDate?.message}
                handleKeyDown={handleKeyDown}
              />
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
                <ImageInput
                  fileInputRef={fileInputRef}
                  field={field}
                  error={errors.imageUrl?.message as string}
                  previewUrl={previewUrl}
                  handleFileChange={handleFileChange}
                  handleImageButtonClick={handleImageButtonClick}
                />
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
