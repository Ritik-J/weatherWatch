import Current_Weather from "@/components/Current_Weather";
import { FavoriteButton } from "@/components/Favorite_Button";
import Hourly_Tempreature from "@/components/Hourly_Tempreature";
import Loading_Skeleton from "@/components/Loading_Skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Weather_Deatils from "@/components/Weather_Deatils";
import Weather_Forecast from "@/components/Weather_Forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertOctagon } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const City = () => {
  const [SearchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(SearchParams.get("lat") || "0");
  const lon = parseFloat(SearchParams.get("lon") || "0");

  const coordinate = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinate);
  const forecastQuery = useForecastQuery(coordinate);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert>
        <AlertOctagon className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <Loading_Skeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
        <div className="flex gap-2">
          <FavoriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <Current_Weather data={weatherQuery.data} />
        <Hourly_Tempreature data={forecastQuery.data} />
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <Weather_Deatils data={weatherQuery.data} />
          <Weather_Forecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};
export default City;
