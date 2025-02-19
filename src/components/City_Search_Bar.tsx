import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSearchLocation } from "@/hooks/useWeather";
import { Heart, History, LoaderPinwheel, Search, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSearchHistory from "@/hooks/useSearchHistory";
import useFavorite from "@/hooks/useFavorite";

const City_Search_Bar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: location, isLoading } = useSearchLocation(query);

  const { addHistory, clearHistory, history } = useSearchHistory();

  const { favorite } = useFavorite();

  const handelSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        Search Cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="search city weather..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No city found.</CommandEmpty>
          )}

          {favorite.length > 0 && (
            <CommandGroup heading="Favorite">
              {favorite.map((city) => (
                <CommandItem
                  key={city.id}
                  value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                  onSelect={handelSelect}
                >
                  <Heart className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{city.name}</span>
                  {city.state && (
                    <span className="text-sm text-muted-foreground">
                      , {city.state}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    , {city.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">
                    Recent Searches
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearHistory.mutate()}
                  >
                    <XCircle className="h-4 w-4" />
                    clear
                  </Button>
                </div>

                {history.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handelSelect}
                  >
                    <History className="mr-2 h-4 w-4" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        📍 {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      📍 {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />

          {location && location.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <LoaderPinwheel className="h-4 w-4 animate-spin" />
                </div>
              )}
              {location.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handelSelect}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{location.name}</span>
                  {location.state && (
                    <span className="text-sm text-muted-foreground">
                      📍 {location.state}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    📍 {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default City_Search_Bar;
