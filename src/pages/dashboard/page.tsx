import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/apis/dashboard/statistics";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PieStatistics } from "./components";

export const description = "An interactive bar chart";

const Page = () => {
  const { data: statistics } = useQuery({
    queryKey: [QUERY_KEYS.GET_DASHBOARD_STATISTICS],
    queryFn: getStatistics,
  });

  return (
    <div className="p-4">
      <PieStatistics data={statistics} />
    </div>
  );
};

export default Page;
