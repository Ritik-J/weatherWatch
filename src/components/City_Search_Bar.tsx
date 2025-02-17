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
import { LoaderPinwheel } from "lucide-react";
import { useNavigate } from "react-router-dom";

const City_Search_Bar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: location, isLoading } = useSearchLocation(query);

  const handelSelect = (cityData: string) => {
    const { lat, lon, name, country } = cityData.split("|");
    navigate(`/city/${name}??lat=${lat}&${lon}`);
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
          <CommandGroup heading="Favorite">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
          <CommandSeparator />

          <CommandGroup heading="Recent Search">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
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
