import type { ForecastData } from "@/api/weather.type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { format } from "date-fns";

interface Hourly_Tempreature_Props {
  data: ForecastData;
}

const Hourly_Tempreature = ({ data }: Hourly_Tempreature_Props) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temprature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temprature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Feels Like
                          </span>
                          <span className="font-bold">{payload[1].value}°</span>
                        </div>
                      </div>
                    );
                  }
                }}
              />
              <Line
                type={"bump"}
                dataKey={"temp"}
                stroke="#8884d8"
                strokeWidth={2}
                dot={true}
              />

              <Line
                type={"natural"}
                dataKey={"feels_like"}
                stroke="whiteSmoke"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Hourly_Tempreature;
