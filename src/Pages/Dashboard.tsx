import { Button } from "@/components/ui/button";
import { RefreshCcwDotIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-4">
      <section className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          // onClick={handelRefresh}
          // disabled={}
        >
          <RefreshCcwDotIcon className="h-4 w-4" />
        </Button>
      </section>
    </div>
  );
};

export default Dashboard;
