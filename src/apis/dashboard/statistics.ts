import { request } from "@/configs/requests";
import { StatisticsProps } from "@/types/dashboard";
import { DashboardSuggestionProps } from "@/types/suggestion";

export const getStatistics = async () => {
  const response = await request.get<StatisticsProps>("dashboard/statistics/");
  return response?.data;
};

export const getSuggestionsByCategoryId = async (categoryId: number, pageNumber: number) => {
  const response = await request.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: DashboardSuggestionProps[];
  }>(`suggestions/category/${categoryId}`, {
    params: {
      page: pageNumber,
    },
  });
  return response?.data;
};
