import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const AQI = ({ n }: { n: number }) => {
  let bgColor, text;

  switch (n) {
    case 1:
      bgColor = "bg-green-700";
      text = "Excellent";
      break;
    case 2:
      bgColor = "bg-lime-500";
      text = "Good";
      break;
    case 3:
      bgColor = "bg-orange-500";
      text = "Moderate";
      break;
    case 4:
      bgColor = "bg-red-500";
      text = "Bad";
      break;
    case 5:
      bgColor = "bg-red-800";
      text = "Hazardous";
      break;
    default:
      bgColor = "bg-gray-500";
      text = "Unknown";
      break;
  }

  return (
    <div
      className={`h-32 w-32 flex items-center justify-center rounded-full border-2 ${bgColor} shadow-lg shadow-muted-foreground`}
    >
      <h4 className="text-white text-2xl font-bold">{text}</h4>
    </div>
  );
};

const Air_Pollution = ({ data }) => {
  if (!data || !data.list) {
    return <p>Data is not available</p>;
  }
  const airIndex = data.list;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality Index</CardTitle>
      </CardHeader>
      <CardContent>
        {airIndex.map((item, index: number) => (
          <section key={index} className="h-full mb-4">
            <div className="flex items-center justify-center mb-4">
              <AQI n={item.main.aqi} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-lg p-3 md:p-2 text-xl font-semibold">
                CO: {item.components.co}
              </div>
              <div className="border rounded-lg p-3 md:p-2 text-xl font-semibold">
                PM2.5: {item.components.pm2_5}
              </div>
              <div className="border rounded-lg p-3 md:p-2 text-xl font-semibold">
                PM10: {item.components.pm10}
              </div>
              <div className="border rounded-lg p-3 md:p-2 text-xl font-semibold">
                O3: {item.components.o3}
              </div>
            </div>
          </section>
        ))}
      </CardContent>
    </Card>
  );
};

export default Air_Pollution;
