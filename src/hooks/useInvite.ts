import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postInvitations } from "@/api/invitations.api";
import { useParams } from "next/navigation";
import { handleApiError } from "@/utils/handleError";
import { useState } from "react";
import { showToast } from "@/contexts/ToastProvider";

const InviteSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("잘못된 이메일 형식입니다."),
});
export type InviteValues = z.infer<typeof InviteSchema>;

export function useInvite(onClose: () => void) {
  const params = useParams();
  const dashboardId = Number(params?.id) ?? null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<InviteValues>({
    resolver: zodResolver(InviteSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: InviteValues) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      await postInvitations(dashboardId, data);
      showToast.success("초대가 완료되었습니다!");
      onClose();
    } catch (error) {
      handleApiError(error, "초대하기 실패:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    errors,
    isValid,
    onFormSubmit: handleSubmit,
    onSubmit,
    isSubmitting,
  };
}
