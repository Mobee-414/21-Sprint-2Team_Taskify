import axios from "./axios";

export const getComments = async (
  cardId: number,
  size: number,
  cursorId: number | null,
) => {
  return await axios.get("/comments", {
    params: {
      cardId,
      size: size ?? 10,
      cursorId: cursorId === null ? undefined : cursorId,
    },
  });
};
