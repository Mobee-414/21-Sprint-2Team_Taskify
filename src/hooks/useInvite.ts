import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { postInvitations } from "@/api/invitations.api";

const InviteSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("잘못된 이메일 형식입니다."),
});
export type InviteValues = z.infer<typeof InviteSchema>;

export function useInvite(onClose: () => void) {
  // const params = useParams();
  // const dashboardId = params.dashboardId;
  const dashboardId = 17390; // 임시 고정

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
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        alert(serverMessage || "서버 응답 오류가 발생했습니다.");
      } else {
        alert("예상치 못한 에러가 발생했습니다.");
      }

      console.error("초대하기 실패:", error);
      return;
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
