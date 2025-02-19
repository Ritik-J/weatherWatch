import { Button } from "@/components/ui/button";
import useGeoLocation from "@/hooks/useGeoLocation";
import { MapPin, RefreshCcw, RefreshCcwDotIcon } from "lucide-react";
import Loading_Skeleton from "../components/Loading_Skeleton";
import {
  useForecastQuery,
  useReversegeoQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import Alert_Error from "@/components/Alert_Error";
import Current_Weather from "@/components/Current_Weather";
import Hourly_Tempreature from "@/components/Hourly_Tempreature";
import Weather_Deatils from "@/components/Weather_Deatils";
import Weather_Forecast from "@/components/Weather_Forecast";
import { FavoriteCities } from "@/components/Favorite_City";
import Weather_news from "@/components/Weather_news";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: loadingLocation,
  } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReversegeoQuery(coordinates);

  const handelRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (loadingLocation) {
    return <Loading_Skeleton />;
  }

  if (locationError) {
    return (
      <Alert_Error
        alertTitle="Location error"
        alertDescription={locationError}
        onClickHandler={getLocation}
        icon={MapPin}
        iconMessage="Enable location"
      />
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert_Error
        alertTitle="service error"
        alertDescription="failed to fetch weather data, check your network or try again later"
        onClickHandler={getLocation}
        icon={RefreshCcw}
        iconMessage="Retry"
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <Loading_Skeleton />;
  }

  return (
    <div className="space-y-4">
      <FavoriteCities />
      <section className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handelRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcwDotIcon
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </section>

      <div className="grid gap-6">
        <section className="flex flex-col md:flex-row gap-3">
          <Current_Weather data={weatherQuery.data} location={locationName} />
          <Hourly_Tempreature data={forecastQuery.data} />
        </section>
        <section className="grid gap-6 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-1">
            <Weather_Deatils data={weatherQuery.data} />
            <Weather_news />
          </div>
          <Weather_Forecast data={forecastQuery.data} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
