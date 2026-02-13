import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ChangeEvent, RefObject } from "react";
import { CardFormValues } from "@/types/card.schema";
import { DatepickerProps, TagItem } from "@/types/card.type";
import { MemberType } from "@/types/user.type";
import { Column } from "@/types/column.type";
import { Input } from "@/components/common/Input";
import { StatusDropdown } from "@/components/dropdown/feature/StatusDropdown";
import { AssigneeDropdown } from "@/components/dropdown/feature/Assignee";
import { Dropdown } from "@/components/dropdown/Dropdown";
import DatePickerInput from "@/components/common/DatePickerInput";
import "react-datepicker/dist/react-datepicker.css";
import TagInput from "@/components/common/TagInput";
import ImageInput from "@/components/common/ImageInput";
import DescriptionInput from "@/components/common/DescriptionInput";
import { CARD_FORM_STYLES } from "@/constants/cardFormStyles";
import ButtonModal from "@/components/common/Button/ButtonModal";

interface FormProps {
  control: Control<CardFormValues>;
  errors: FieldErrors<CardFormValues>;
  isValid: boolean;
  isDirty: boolean;
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
  columnList: Column[];
  memberList: MemberType[];
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
  columnList,
  memberList,
  datepickerProps,
  tagsProps,
  imageProps,
}: ContentProps) {
  const { control, errors, isValid, isDirty } = formProps;
  const { datepickerRef, handleDateChange } = datepickerProps;
  const { tagList, handleKeyDown } = tagsProps;
  const { fileInputRef, previewUrl, handleImageButtonClick, handleFileChange } =
    imageProps;

  return (
    <form
      className="flex flex-col gap-[32px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:gap-[32px]">
        {mode === "edit" && (
          <div className="flex-1">
            <Controller
              name="columnId"
              control={control}
              render={({ field }) => (
                <div className={CARD_FORM_STYLES.GAP}>
                  <label
                    className={CARD_FORM_STYLES.LABEL}
                    htmlFor={field.name}
                  >
                    상태
                  </label>
                  <StatusDropdown
                    columnList={columnList}
                    selectedColumnId={field.value}
                    onChange={(id: number) => {
                      field.onChange(id);
                    }}
                  />
                </div>
              )}
            />
          </div>
        )}

        <div className="flex-1">
          <Controller
            name="assigneeUserId"
            control={control}
            render={({ field }) => (
              <div className={CARD_FORM_STYLES.GAP}>
                <label className={CARD_FORM_STYLES.LABEL} htmlFor={field.name}>
                  담당자
                </label>
                <Dropdown>
                  <AssigneeDropdown
                    users={memberList}
                    selectedUserId={field.value}
                    onChange={(id: number) => {
                      field.onChange(id);
                    }}
                    placeholder="담당자를 지정해주세요"
                  />
                </Dropdown>
              </div>
            )}
          />
        </div>
      </div>

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input
            label="제목"
            field={field}
            type="text"
            placeholder="제목을 입력해주세요"
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
          <DescriptionInput field={field} error={errors.description?.message} />
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
            mode={mode}
            fileInputRef={fileInputRef}
            field={field}
            error={errors.imageUrl?.message as string}
            previewUrl={previewUrl}
            handleFileChange={handleFileChange}
            handleImageButtonClick={handleImageButtonClick}
          />
        )}
      />

      <div className="flex gap-[7px] md:gap-[8px]">
        <ButtonModal
          type="button"
          variant="secondary"
          fontSize={"lg"}
          className="w-full h-[54px]"
          onClick={onClose}
        >
          취소
        </ButtonModal>
        {mode === "create" ? (
          <ButtonModal
            type="submit"
            fontSize={"lg"}
            className={`w-full h-[54px] ${isValid ? "" : "disabled"}`}
          >
            생성
          </ButtonModal>
        ) : (
          <ButtonModal
            type="submit"
            disabled={!isDirty}
            fontSize={"lg"}
            className={`w-full h-[54px] ${isValid ? "" : "disabled"}`}
          >
            생성
          </ButtonModal>
        )}
      </div>
    </form>
  );
}
