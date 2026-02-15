import { z } from "zod";

export const CardFormSchema = z.object({
  assigneeUserId: z.number(),
  dashboardId: z.number(),
  columnId: z.number(),
  cardId: z.number().optional().nullable(),
  title: z.string().nonempty("제목을을 입력해주세요."),
  description: z.string().nonempty("설명을 입력해주세요."),
  dueDate: z.string().nonempty("날짜를 선택해주세요."),
  tags: z
    .array(z.string())
    .nonempty("태그를 1개 이상 입력해주세요.")
    .refine((items) => new Set(items).size === items.length, {
      message: "중복된 태그가 있습니다.",
    }),
  imageUrl: z
    .union([z.string(), z.any()])
    .refine((val) => {
      if (!val || (Array.isArray(val) && val.length === 0)) return false;
      return true;
    }, "이미지는 필수입니다.")
    .superRefine((val, ctx) => {
      // 파일 객체인 경우에만 상세 검증 (문자열 URL일 때는 통과)
      if (val instanceof File) {
        // 크기 제한
        if (val.size > 5 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "최대 파일 크기는 5MB입니다.",
          });
        }
        // 형식 제한
        const ACCEPTED_TYPES = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        if (!ACCEPTED_TYPES.includes(val.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "JPG, JPEG, PNG, WEBP 형식만 지원합니다.",
          });
        }
      }
    }),
});
export type CardFormValues = z.infer<typeof CardFormSchema>;

export const CardCommentSchema = z.object({
  cardId: z.number(),
  columnId: z.number(),
  dashboardId: z.number(),
  content: z.string().min(1),
});
export type CardCommentValues = z.infer<typeof CardCommentSchema>;
