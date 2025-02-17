import type { WeatherData } from "@/api/weather.type";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Weather_Deatils_Props {
  data: WeatherData;
}

const Weather_Deatils = ({ data }: Weather_Deatils_Props) => {
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm:a");
  };

  const windDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "W", "NW"];

    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;

    return directions[index];
  };
  const weatherDetails = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${windDirection(wind.deg)}(${wind.speed})`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hpa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          {weatherDetails.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Weather_Deatils;
