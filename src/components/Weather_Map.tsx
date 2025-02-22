import { MapContainer, ImageOverlay } from "react-leaflet";
import { useWeatherMapQuery } from "@/hooks/useWeather";
import "leaflet/dist/leaflet.css";

const Weather_Map = ({ lat, lon }) => {
  const layer = "temp_new";
  const z = 2;
  const x = 1;
  const y = 3;

  const params = { layer, x, y, z };
  const { data: mapUrl, isLoading, error } = useWeatherMapQuery(params);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching map</div>;

  const bounds = [
    [lat - 0.5, lon - 0.5],
    [lat + 0.5, lon + 0.5],
  ];

  return (
    <div>
      <h1>Weather Map</h1>
      <MapContainer
        center={[lat, lon]}
        zoom={z}
        style={{ height: "600px", width: "100%" }}
      >
        <ImageOverlay url={mapUrl} bounds={bounds} />
      </MapContainer>
    </div>
  );
};

export default Weather_Map;
