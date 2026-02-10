import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ChangeEvent, RefObject } from "react";
import { DatepickerProps, TagItem } from "@/types/card.type";
import { CardFormValues } from "@/hooks/useCardForm";
import TagInput from "@/components/common/TagInput";
import ImageInput from "@/components/common/ImageInput";
import { Input } from "@/components/common/Input";
import DatePickerInput from "@/components/common/DatePickerInput";
import "react-datepicker/dist/react-datepicker.css";

interface FormProps {
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
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
  const { control, errors } = formProps;
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
                {/* TODO: StatusDropdown 작업 예정 */}
                {/* <StatusDropdown /> */}
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
              {/* TODO: AssigneeDropdown 작업 예정 */}
              {/* <AssigneeDropdown
                users={assigneeList}
                selectedUserId={selectedUserId}
                onChange={handleAssigneeChange}
                placeholder="담당자를 지정해주세요"
              /> */}
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
            <DatePickerInput
              datepickerRef={datepickerRef}
              field={field}
              error={errors.dueDate?.message}
              handleDateChange={handleDateChange}
            />
          )}
        />

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              tagList={tagList}
              field={field}
              error={errors.tags?.message}
              handleKeyDown={handleKeyDown}
            />
          )}
        />

        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <ImageInput
              fileInputRef={fileInputRef}
              field={field}
              error={errors.imageUrl?.message as string}
              previewUrl={previewUrl}
              handleFileChange={handleFileChange}
              handleImageButtonClick={handleImageButtonClick}
            />
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
