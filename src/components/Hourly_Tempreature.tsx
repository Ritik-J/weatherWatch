import type { ForecastData } from "@/api/weather.type";

interface Hourly_Tempreature_Props {
  data: ForecastData;
}

const Hourly_Tempreature = ({ data }: Hourly_Tempreature_Props) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return <div>{chartData}</div>;
};

export default Hourly_Tempreature;
