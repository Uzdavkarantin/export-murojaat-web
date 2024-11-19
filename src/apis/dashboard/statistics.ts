import { request } from "@/configs/requests";

export const getStatistics = async () => {
  return await request.get("dashboard/statistics/");
};
