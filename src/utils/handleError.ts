import axios from "axios";

export const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    alert(serverMessage || "서버 응답 오류가 발생했습니다.");
  } else {
    alert("예상치 못한 에러가 발생했습니다.");
  }
  console.error(defaultMessage, error);
  throw error;
};
