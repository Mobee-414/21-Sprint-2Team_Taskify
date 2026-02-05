import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const CardDetailSchema = z.object({
  content: z.string().min(1),
});
export type CardDetailValues = z.infer<typeof CardDetailSchema>;

export function useCardDetail(cardId: number) {
  // 댓글
  const {
    control,
    formState: { isValid },
    handleSubmit: handleSubmit,
  } = useForm({
    resolver: zodResolver(CardDetailSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: CardDetailValues) => {
    console.log(data);
  };

  return {
    control,
    isValid,
    handleSubmit,
    onSubmit,
  };
}
