import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postInvitations } from "@/api/invitations.api";
import { useParams } from "next/navigation";
import { handleApiError } from "@/utils/handleError";

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
    try {
      await postInvitations(dashboardId, data);
      alert("초대가 완료되었습니다!");
      onClose();
    } catch (error) {
      handleApiError(error, "초대하기 실패:");
    }
  };

  return {
    control,
    errors,
    isValid,
    handleSubmit,
    onSubmit,
  };
}
