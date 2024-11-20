import { request } from "@/configs/requests";

export const getSuggestions = async (userId: string | number | undefined) => {
  return await request.get(`suggestions/${userId}/`);
};

export const answerSuggestion = async (suggestionId: number | string, body: { text: string }) => {
  return await request.post(`suggestions/${suggestionId}/answer/`, body);
};
