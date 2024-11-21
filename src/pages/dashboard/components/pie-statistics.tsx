import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { StatisticsProps } from "@/types/dashboard";

interface PieStatisticsProps {
  data: StatisticsProps | undefined;
}

export function PieStatistics({ data }: PieStatisticsProps) {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const categories = useMemo(() => {
    if (!data) return [];
    return data.categories.map((c, i) => ({
      name: c.name,
      count: c.count,
      fill: colors[i % colors.length],
    }));
  }, [data]);

  const chartConfig = {
    // count: {
    //   label: "Count",
    // },
    chrome: {
      label: "Boshqa",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Bank",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Logistika",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Energetika",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Bojxona",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Complaints and Appeals</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[40vh] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
            <Pie data={categories} dataKey="count">
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
