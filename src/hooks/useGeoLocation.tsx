import { Coordinates } from "@/api/weather.type";
import { useEffect, useState } from "react";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {};

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
};

export default useGeoLocation;
