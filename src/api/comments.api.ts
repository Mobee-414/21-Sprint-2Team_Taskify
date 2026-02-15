import axios from "./axios";
import { CommentCreateType } from "@/types/comment.type";

export const getComments = async (
  cardId: number,
  size: number,
  cursorId: number | null,
) => {
  return await axios.get("/comments", {
    params: {
      cardId,
      size: size,
      cursorId: cursorId === null ? undefined : cursorId,
    },
  });
};

export const postComments = async (data: CommentCreateType) => {
  const response = await axios.post("/comments", data);

  return response.data;
};

export const putComments = async (commentId: number, content: string) => {
  const response = await axios.put(`/comments/${commentId}`, { content });

  return response.data;
};

export const deleteComments = async (commentId: number) => {
  const response = await axios.delete(`/comments/${commentId}`);

  return response;
};
