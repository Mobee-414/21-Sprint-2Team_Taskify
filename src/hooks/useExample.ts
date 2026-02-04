import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function useExample() {
  const ExampleSchema = z.object({
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("잘못된 이메일 형식입니다."),
    // nickname: z.string().nonempty("닉네임을 입력해주세요."),
    password: z
      .string()
      .nonempty("비밀번호를 입력해주세요.")
      .min(8, "비밀번호를 8자 이상 입력해주세요."),
    // passwordConfirmation: z
    //   .string()
    //   .nonempty("비밀번호 확인을 입력해주세요."),
  });
  // .refine((data) => data.password === data.passwordConfirmation, {
  //   message: "비밀번호가 일치하지 않습니다.",
  //   path: ["passwordConfirmation"],
  // });
  type ExampleValues = z.infer<typeof ExampleSchema>;

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ExampleSchema),
    mode: "all", // 검색해서 적절한 방법으로 수정 사용
    defaultValues: {
      email: "",
      // nickname: "",
      password: "",
      // passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: ExampleValues) => {
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
