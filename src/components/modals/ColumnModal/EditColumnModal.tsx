import axiosInstance from "@/api/axios";
import BaseModal from "@/components/common/BaseModal";
import { Input } from "@/components/common/Input";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: { id: number; title: string };
  dashboardId: number;
}

interface FormValue {
  columnTitle: string;
}

export default function EditColumnModal({
  isOpen,
  onClose,
  column,
  dashboardId,
}: EditColumnModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      columnTitle: column.title,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ columnTitle: column.title });
    }
  }, [isOpen, column, reset]);

  const updateMutation = useMutation({
    mutationFn: (title: string) =>
      axiosInstance.put(`/columns/${column.id}`, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns", dashboardId],
      });
      onClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => axiosInstance.delete(`/columns/${column.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns", dashboardId],
      });
      setIsConfirmOpen(false);
      onClose();
    },
  });

  const onSubmit = async (data: FormValue) => {
    const columnsCache =
      queryClient.getQueryData<{ id: number; title: string; count: number }[]>([
        "columns",
        dashboardId,
      ]) ?? [];
    const isDuplicate = columnsCache
      .filter((col) => col.id !== column.id)
      .some((col) => col.title === data.columnTitle);

    if (isDuplicate) {
      setError("columnTitle", {
        type: "manual",
        message: "중복된 컬럼 이름입니다.",
      });
      return;
    }

    updateMutation.mutate(data.columnTitle);
  };

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose} width={540}>
        <div className="flex w-full flex-col items-center overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-8"
          >
            <h2 className="text-2xl font-bold text-black-dark text-left w-full">
              컬럼
            </h2>

            <div className="w-full">
              <Controller
                name="columnTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    label="이름"
                    placeholder="컬럼 이름을 입력하세요"
                    field={field}
                    labelSize="labelFixed"
                    error={errors.columnTitle?.message}
                  />
                )}
              />
            </div>

            <div className="flex justify-between items-center w-full mt-4">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                className="text-gray-medium underline text-sm hover:text-red-point"
              >
                삭제
              </button>

              <button
                type="submit"
                className="bg-violet-main text-white px-12 py-4 rounded-[8px] font-bold"
              >
                변경
              </button>
            </div>
          </form>
        </div>
      </BaseModal>

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
      />
    </>
  );
}
