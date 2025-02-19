import type { ForecastData } from "@/api/weather.type";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowBigDown, ArrowBigUp, Droplets, Wind } from "lucide-react";

interface Weather_Forecast_Props {
  data: ForecastData;
}

interface dailyForecast {
  temp_min: number;
  temp_max: number;
  humidtiy: number;
  wind: number;
  date: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}
const Weather_Forecast = ({ data }: Weather_Forecast_Props) => {
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  const dailyForecast = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidtiy: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, dailyForecast>);

  const nextDays = Object.values(dailyForecast).slice(0, 6);
  return (
    <Card>
      <CardHeader>
        <CardTitle> Five Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 rounded-lg border p-4"
            >
              <div className="flex flex-col items-center md:none">
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM, d")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>
              <div className="flex justify-center gap-4">
                <span className="flex items-center text-green-600">
                  <ArrowBigDown className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowBigUp className="mr-1 h-4 w-4" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>
              <div className="flex justify-center gap-4">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4 text-[#b6a28e]" />
                  <span className="text-sm">{day.humidtiy}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-[#D1F1F9]" />
                  <span className="text-sm">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather_Forecast;
