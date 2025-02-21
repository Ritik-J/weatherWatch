import { useWeatherMapQuery } from "@/hooks/useWeather";

const Weather_Map = () => {
  const layer = "clouds_new";
  const z = 2; // Subcontinental area zoom level
  const x = 1; // Example x coordinate for subcontinental area
  const y = 3; // Example y coordinate for subcontinental area

  const params = { layer, x, y, z };
  const { data: mapUrl, isLoading, error } = useWeatherMapQuery(params);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching map</div>;

  return (
    <div>
      <h1>Weather Map</h1>
      {mapUrl && <img src={mapUrl} alt="Weather Map" />}
    </div>
  );
};

export default Weather_Map;
