import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/apis/dashboard/statistics";
import { QUERY_KEYS } from "@/constants/query-keys";
import { DashboardStatistics } from "./components";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const { data: statistics, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_DASHBOARD_STATISTICS],
    queryFn: getStatistics,
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex gap-5">
          <Skeleton className="w-1/2 md:w-56 h-20" />
          <Skeleton className="w-1/2 md:w-56 h-20" />
        </div>
        <Skeleton className="h-[50vh] md:h-[70vh]" />
      </div>
    );
  } else
    return (
      <div className="p-4">
        <DashboardStatistics statistics={statistics} />
      </div>
    );
};

export default Page;
