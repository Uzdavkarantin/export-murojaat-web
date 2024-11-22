import { Card } from "@/components/ui/card";
import { StatisticsProps } from "@/types/dashboard";
import { ResponsivePie } from "@nivo/pie";
import { FaUsers } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { SuggestionsModal } from "./suggestions-modal";

interface DashboardStatisticsProps {
  statistics: StatisticsProps | undefined;
}

const colors = [
  "hsl(234, 70%, 50%)",
  "hsl(154, 70%, 50%)",
  "hsl(80, 70%, 50%)",
  "hsl(227, 70%, 50%)",
  "hsl(352, 70%, 50%)",
];

export const DashboardStatistics = ({ statistics }: DashboardStatisticsProps) => {
  const [isOpenSuggestionsModal, setIsOpenSuggestionsModal] = useState(false);
  const [categoryId, setCategoryId] = useState<number>(0);

  const openSuggestionModal = (id: number) => {
    setIsOpenSuggestionsModal(true);
    setCategoryId(id);
  };

  const categories = useMemo(() => {
    if (!statistics) return [];
    return statistics.categories.map((c, i) => {
      return {
        id: c.name,
        label: c.name,
        value: c.count,
        color: colors[i] ? colors[i] : "blue",
        _id: c.id,
      };
    });
  }, [statistics]);

  return (
    <>
      <div className="top flex justify-end mb-5 gap-5">
        <div className="flex flex-col justify-between w-1/2 md:w-56 h-20 border rounded-sm p-2 border-b-4 border-b-green-500">
          <h1 className="text-sm text-muted-foreground uppercase">Total Users</h1>
          <div className="flex items-center gap-3">
            <FaUsers size={24} />
            <p className="text-2xl font-bold">{statistics?.total_users}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between w-1/2 md:w-56 h-20 border rounded-sm p-2 border-b-4 border-b-yellow-500">
          <h1 className="text-sm text-muted-foreground uppercase">Total Suggestions</h1>
          <div className="flex items-center gap-3">
            <BsChatDotsFill size={22} />
            <p className="text-2xl font-bold">{statistics?.total_suggestions}</p>
          </div>
        </div>
      </div>

      <div className="h-[50vh] md:h-[70vh]">
        <Card className="w-full h-full rounded-sm">
          <ResponsivePie
            data={categories}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.3}
            padAngle={1}
            cornerRadius={10}
            activeOuterRadiusOffset={5}
            enableArcLabels={true}
            colors={{ scheme: "category10" }}
            borderColor={{ theme: "background" }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
            arcLinkLabelsOffset={5}
            arcLinkLabelsDiagonalLength={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color", modifiers: [] }}
            arcLabel="value"
            arcLabelsTextColor="black"
            arcLinkLabelsStraightLength={36}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
            onClick={e => openSuggestionModal(e.data._id)}
          />
        </Card>
      </div>

      {isOpenSuggestionsModal && (
        <SuggestionsModal
          isOpenSuggestionsModal={isOpenSuggestionsModal}
          setIsOpenSuggestionsModal={setIsOpenSuggestionsModal}
          categoryId={categoryId}
        />
      )}
    </>
  );
};
