import { request } from "@/configs/requests";
import { StatisticsProps } from "@/types/dashboard";

export const getStatistics = async () => {
  const response = await request.get<StatisticsProps>("dashboard/statistics/");
  return response?.data;
};
