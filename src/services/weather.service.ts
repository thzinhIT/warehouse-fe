import axios from "axios";

// OpenWeather API types
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Air Quality API types
export interface AirQualityData {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number; // Air Quality Index (1-5)
    };
    components: {
      co: number; // Carbon monoxide
      no: number; // Nitric oxide
      no2: number; // Nitrogen dioxide
      o3: number; // Ozone
      so2: number; // Sulphur dioxide
      pm2_5: number; // Fine particles matter
      pm10: number; // Coarse particulate matter
      nh3: number; // Ammonia
    };
    dt: number;
  }>;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

class WeatherService {
  private readonly API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  private readonly BASE_URL = "https://api.openweathermap.org/data/2.5";

  constructor() {
    if (!this.API_KEY) {
      console.warn(
        "OpenWeather API key is not configured. Set NEXT_PUBLIC_OPENWEATHER_API_KEY in your environment variables."
      );
    }
  }

  /**
   * Get current weather by city name
   */
  async getCurrentWeatherByCity(
    city: string,
    units: "metric" | "imperial" = "metric"
  ): Promise<WeatherData> {
    if (!this.API_KEY) {
      throw new Error("OpenWeather API key is not configured");
    }

    try {
      const response = await axios.get<WeatherData>(
        `${this.BASE_URL}/weather`,
        {
          params: {
            q: city,
            appid: this.API_KEY,
            units,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Weather API Error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Get current weather by coordinates
   */
  async getCurrentWeatherByCoords(
    lat: number,
    lon: number,
    units: "metric" | "imperial" = "metric"
  ): Promise<WeatherData> {
    if (!this.API_KEY) {
      throw new Error("OpenWeather API key is not configured");
    }

    try {
      const response = await axios.get<WeatherData>(
        `${this.BASE_URL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: this.API_KEY,
            units,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Weather API Error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Get 5-day weather forecast by city name
   */
  async getForecastByCity(
    city: string,
    units: "metric" | "imperial" = "metric"
  ): Promise<ForecastData> {
    if (!this.API_KEY) {
      throw new Error("OpenWeather API key is not configured");
    }

    try {
      const response = await axios.get<ForecastData>(
        `${this.BASE_URL}/forecast`,
        {
          params: {
            q: city,
            appid: this.API_KEY,
            units,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Weather API Error: ${error.response?.data?.message || error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Get weather icon URL
   */
  getIconUrl(iconCode: string, size: "2x" | "4x" = "2x"): string {
    return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
  }

  /**
   * Get user's current location using geolocation API
   */
  getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000, // 10 minutes
        }
      );
    });
  }

  /**
   * Get current air quality by coordinates
   */
  async getAirQuality(lat: number, lon: number): Promise<AirQualityData> {
    if (!this.API_KEY) {
      throw new Error("OpenWeather API key is not configured");
    }

    try {
      const response = await axios.get<AirQualityData>(
        `${this.BASE_URL}/air_pollution`,
        {
          params: {
            lat,
            lon,
            appid: this.API_KEY,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Air Quality API Error: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /**
   * Get air quality index description
   */
  getAQIDescription(aqi: number): {
    level: string;
    description: string;
    color: string;
  } {
    switch (aqi) {
      case 1:
        return {
          level: "Good",
          description: "Air quality is considered satisfactory",
          color: "text-green-600",
        };
      case 2:
        return {
          level: "Fair",
          description: "Air quality is acceptable",
          color: "text-yellow-600",
        };
      case 3:
        return {
          level: "Moderate",
          description: "Sensitive people may experience minor issues",
          color: "text-orange-600",
        };
      case 4:
        return {
          level: "Poor",
          description: "Health warnings of emergency conditions",
          color: "text-red-600",
        };
      case 5:
        return {
          level: "Very Poor",
          description: "Health warnings for everyone",
          color: "text-purple-600",
        };
      default:
        return {
          level: "Unknown",
          description: "Air quality data unavailable",
          color: "text-gray-600",
        };
    }
  }
}

export const weatherService = new WeatherService();
