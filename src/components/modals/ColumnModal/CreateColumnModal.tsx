import { createColumn } from "@/api/columns.api";
import { useForm, Controller } from "react-hook-form";
import BaseModal from "../../common/BaseModal";
import { Input } from "../../common/Input";
import { useEffect } from "react";
import axios from "axios";

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
  onSuccess: () => void;
  existingColumns: { title: string }[];
}

interface ColumnFormValues {
  columnTitle: string;
}

export default function CreateColumnModal({
  isOpen,
  onClose,
  dashboardId,
  onSuccess,
  existingColumns,
}: CreateColumnModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ColumnFormValues>({
    defaultValues: { columnTitle: "" },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ columnTitle: "" });
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: ColumnFormValues) => {
    const isDuplicate = existingColumns.some(
      (col) => col.title === data.columnTitle,
    );
    if (isDuplicate) {
      setError("columnTitle", {
        type: "manual",
        message: "중복된 컬럼 이름입니다.",
      });
      return;
    }

    try {
      await createColumn(data.columnTitle, dashboardId);
      reset();
      onSuccess();
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 409 ||
          error.response?.data?.message?.includes("중복")
        ) {
          setError("columnTitle", {
            type: "manual",
            message: "중복된 컬럼 이름입니다.",
          });
          return;
        }
      }
      console.log("원인: ", error);
      alert("컬럼 생성에 실패했습니다.");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} width={540}>
      <div
        className={`
          flex w-full flex-col items-center
          overflow-y-auto
        `}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-8"
        >
          <h2 className="text-2xl font-bold text-black-medium">새 컬럼 생성</h2>

          <Controller
            name="columnTitle"
            control={control}
            rules={{ required: "컬럼 이름을 입력해주세요." }}
            render={({ field }) => (
              <Input
                label="이름"
                field={field}
                placeholder="새로운 프로젝트"
                error={errors.columnTitle?.message}
                labelSize="labelLg"
                inputSize="inputMd"
              />
            )}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-gray-medium border border-gray-light rounded-md font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 text-white bg-violet-main rounded-md font-medium"
            >
              생성
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
