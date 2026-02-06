import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const CardFormSchema = z.object({
  assigneeUserId: z.number(),
  dashboardId: z.number(),
  columnId: z.number(),
  cardId: z.number().optional().nullable(),
  title: z.string().nonempty("제목을을 입력해주세요."),
  description: z.string().nonempty("설명을 입력해주세요."),
  dueDate: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.union([z.string(), z.any()]),
});
export type CardFormValues = z.infer<typeof CardFormSchema>;

export function useCardForm(
  dashboardId: number,
  columnId: number,
  cardId: number | null,
) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit: handleSubmit,
  } = useForm({
    resolver: zodResolver(CardFormSchema),
    mode: "onChange",
    defaultValues: {
      assigneeUserId: 1,
      dashboardId: dashboardId,
      columnId,
      ...(cardId && { cardId }), // cardId가 있을때만 추가
      title: "",
      description: "",
      dueDate: "",
      tags: [],
      imageUrl: "",
    },
  });

  const onSubmit = async (data: CardFormValues) => {
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
