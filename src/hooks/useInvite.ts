import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const InviteSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("잘못된 이메일 형식입니다."),
});
type InviteValues = z.infer<typeof InviteSchema>;

export function useInvite() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(InviteSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: InviteValues) => {
    console.log(data);
  };

  return {
    control,
    errors,
    isValid,
    handleSubmit,
    onSubmit,
  };
}
