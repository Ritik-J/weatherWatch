import type { getGeocodingData, WeatherData } from "@/api/weather.type";

import { Card, CardContent } from "@/components/ui/card";
import { Cloudy, Droplets, TrendingDown, TrendingUp, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  location?: getGeocodingData;
}
const Current_Weather = ({ data, location }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <header className="space-y-2">
              <div className="flex items-end gap-3">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {location?.name}
                </h2>
                {location?.state && (
                  <span className="text-muted-foreground">
                    {location.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {location?.country}
              </p>
            </header>

            <section className="flex items-center gap-2">
              <p className="text-5xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1 ml-2">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Cloudy className="h-3 w-3" /> feels like{" "}
                  {formatTemp(feels_like)}
                </span>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <TrendingDown className="h-3 w-3" />
                    {formatTemp(temp_max)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <TrendingUp className="h-3 w-3" />
                    {formatTemp(temp_min)}
                  </span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind</p>
                  <p className="text-sm text-muted-foreground">{speed}m/s</p>
                </div>
              </div>
            </section>
          </div>

          <section className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium text-center">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default Current_Weather;
