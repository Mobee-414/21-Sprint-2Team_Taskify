import axiosInstance from "./axios";


export const getCards = async (columnId: number, cursorId?: number | null) => {

  const response = await axiosInstance.get(`/cards`, {
    params: {
      columnId,
      cursorId,
      size: 10, // 한 번에 가져올 카드 개수
    },
  });
  return response.data;
};
