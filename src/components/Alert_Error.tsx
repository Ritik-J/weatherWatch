import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertOctagon } from "lucide-react";
import { Button } from "./ui/button";
import { FunctionComponent } from "react";

interface Alert {
  alertTitle: string;
  alertDescription: string;
  onClickHandler: VoidFunction;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconMessage: string;
}

const Alert_Error: FunctionComponent<Alert> = ({
  alertTitle,
  alertDescription,
  onClickHandler,
  icon: IconComponent,
  iconMessage,
}) => {
  return (
    <Alert variant={"destructive"}>
      <AlertOctagon className="h-4 w-4" />
      <AlertTitle>{alertTitle}</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{alertDescription}</p>
        <Button
          className="w-fit text-red-400"
          onClick={onClickHandler}
          variant={"outline"}
        >
          <IconComponent className="mr-2 h-4 w-4" />
          {iconMessage}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default Alert_Error;
