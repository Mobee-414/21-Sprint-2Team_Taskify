import axios from "./axios";
import { CardCreateType, CardUpdateType } from "@/types/card.type";

export const getCard = async (cardId: number) => {
  return await axios.get(`/cards/${cardId}`);
};

export const postCardImage = async (image: File, columnId: number) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post(
    `/columns/${columnId}/card-image`,
    formData,
  );

  return response.data;
};

export const postCards = async (data: CardCreateType) => {
  const response = await axios.post("/cards", data);

  return response.data;
};

export const putCards = async (cardId: number, data: CardUpdateType) => {
  const response = await axios.put(`/cards/${cardId}`, data);

  return response.data;
};

export const deleteCard = async (cardId: number) => {
  const response = await axios.delete(`/cards/${cardId}`);

  return response;
};
