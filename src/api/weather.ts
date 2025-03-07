import { API_CONFIG } from "./api-config";
import {
  AirPollutionData,
  Coordinates,
  ForecastData,
  getGeocodingData,
  WeatherData,
} from "./weather.type";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`weather api error: ${res.statusText}`);
    }

    return res.json();
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });

    return this.fetchData<WeatherData>(url);
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });

    return this.fetchData<ForecastData>(url);
  }

  async getGeoData({ lat, lon }: Coordinates): Promise<getGeocodingData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return this.fetchData<getGeocodingData[]>(url);
  }

  async searchLocation(query: string): Promise<getGeocodingData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5,
    });

    return this.fetchData<getGeocodingData[]>(url);
  }

  async airPollution({ lat, lon }: Coordinates): Promise<AirPollutionData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/air_pollution`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });

    return await this.fetchData<AirPollutionData>(url);
  }
}

export const weatherAPI = new WeatherAPI();
