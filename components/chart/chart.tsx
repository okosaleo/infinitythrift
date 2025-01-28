"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", savings: 186, loans: 80, revenue: 30 },
  { month: "February", savings: 305, loans: 200, revenue: 120 },
  { month: "March", savings: 237, loans: 120, revenue: 200 },
  { month: "April", savings: 73, loans: 190, revenue: 453 },
  { month: "May", savings: 209, loans: 130, revenue: 500 },
  { month: "June", savings: 214, loans: 140, revenue: 200 },
]

const chartConfig = {
  savings: {
    label: "savings",
    color: "hsl(var(--chart-1))",
  },
  loans: {
    label: "loans",
    color: "#2563eb",
  },
  revenue: {
    label: "revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card className="border-0 bg-text-button h-[70vh]">
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="savings"
              type="monotone"
              stroke="#55371B"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="loans"
              type="monotone"
              stroke="#FDCA28"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="#06C33B"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
