import axios from "axios";
import { showToast } from "@/contexts/ToastProvider";

export const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    showToast.error(serverMessage || "서버 응답 오류가 발생했습니다.");
  } else {
    showToast.error("예상치 못한 에러가 발생했습니다.");
  }
  console.error(defaultMessage, error);
  throw error;
};
