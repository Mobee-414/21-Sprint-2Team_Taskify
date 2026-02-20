import { createColumn } from "@/api/columns.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import BaseModal from "../../common/BaseModal";
import { Input } from "../../common/Input";
import { useEffect } from "react";
import axios from "axios";
import ButtonModal from "@/components/common/Button/ButtonModal";

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
}

interface ColumnFormValues {
  columnTitle: string;
}

export default function CreateColumnModal({
  isOpen,
  onClose,
  dashboardId,
}: CreateColumnModalProps) {
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: (title: string) => createColumn(title, dashboardId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns", dashboardId],
      });
      onClose();
      reset();
    },
  });

  const onSubmit = async (data: ColumnFormValues) => {
    const columnsCache =
      queryClient.getQueryData<{ id: number; title: string; count: number }[]>([
        "columns",
        dashboardId,
      ]) ?? [];
    const isDuplicate = columnsCache.some(
      (col) => col.title === data.columnTitle
    );

    if (isDuplicate) {
      setError("columnTitle", {
        type: "manual",
        message: "중복된 컬럼 이름입니다.",
      });
      return;
    }

    try {
      await mutation.mutateAsync(data.columnTitle);
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
      alert("컬럼 생성에 실패했습니다.");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} radius="sm">
      <div className="w-[327px] tablet:w-[568px] mx-auto px-5 tablet:px-8 py-6 tablet:py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-10 "
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
            <ButtonModal
              type="button"
              variant="secondary"
              fontSize="md"
              onClick={onClose}
              className="flex-1 h-[48px] tablet:h-[54px]"
            >
              취소
            </ButtonModal>
            <ButtonModal
              type="submit"
              variant="primary"
              fontSize="md"
              className="flex-1 h-[48px] tablet:h-[54px]"
            >
              생성
            </ButtonModal>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
