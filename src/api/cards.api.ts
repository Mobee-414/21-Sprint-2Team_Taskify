import axios from "./axios";

export const getCard = async (cardId: number) => {
  return await axios.get(`/cards/${cardId}`);
};
