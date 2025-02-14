import { Button } from "@/components/ui/button";
import useGeoLocation from "@/hooks/useGeoLocation";
import { AlertOctagon, MapPin, RefreshCcwDotIcon } from "lucide-react";
import Loading_Skeleton from "../components/Loading_Skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: loadingLocation,
  } = useGeoLocation();

  console.log(coordinates);

  const handelRefresh = () => {
    getLocation();
    if (coordinates) {
      // reload weather data
      //edge case check if same corinate are same use catch data
    }
  };

  if (loadingLocation) {
    return <Loading_Skeleton />;
  }

  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertOctagon className="h-4 w-4" />
        <AlertTitle>Location error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button
            className="w-fit text-red-400"
            onClick={getLocation}
            variant={"outline"}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <section className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handelRefresh}
          // disabled={}
        >
          <RefreshCcwDotIcon className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
};

export default Dashboard;
