import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export function useCardDetail(cardId: number) {
  // 댓글
  const CardDetailSchema = z.object({
    content: z.string().min(1),
  });
  type CardDetailValues = z.infer<typeof CardDetailSchema>;

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
