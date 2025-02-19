import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFavorite from "@/hooks/useFavorite";
import { Coordinates, WeatherData } from "@/api/weather.type";

interface FavoriteButtonProps {
  data: WeatherData;
  coord: Coordinates;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  console.log("FavoriteButton received data:", data);

  // Check if data is defined
  if (!data) {
    console.error("data is undefined");
    return null;
  }

  // Check if data.coordinate is defined
  if (!data.coordinate) {
    console.error("data.coordinate is undefined", data);
    return null;
  }

  console.log("data.coordinate:", data.coordinate);

  const isCurrentlyFavorite = isFavorite(
    data.coordinate.lat,
    data.coordinate.lon
  );

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coordinate.lat}-${data.coordinate.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coordinate.lat,
        lon: data.coordinate.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}
