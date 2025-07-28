export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  visibility: number;
  uvIndex?: number;
  dustPM25?: number;
  dustPM10?: number;
  airQuality?: string;
  lastUpdated: string;
  icon: string;
}

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  name: string;
  dt: number;
  coord: {
    lat: number;
    lon: number;
  };
}

interface AirPollutionResponse {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      pm2_5: number;
      pm10: number;
    };
  }>;
}

interface UVResponse {
  value: number;
}

class WeatherService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";
    this.baseUrl = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5";

    if (!this.apiKey) {
      console.warn("OpenWeather API key not found in environment variables");
    }
  }

  async getCurrentWeather(city: string = "Hanoi,VN"): Promise<WeatherData | null> {
    try {
      if (!this.apiKey) {
        throw new Error("API key không tồn tại");
      }

      console.log("Fetching weather for:", city);
      console.log("API Key exists:", !!this.apiKey);

      // Method 1: Try direct weather API with city name (simpler approach)
      try {
        const weatherResponse = await fetch(
          `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric&lang=vi`
        );

        console.log("Weather API response status:", weatherResponse.status);

        if (!weatherResponse.ok) {
          const errorText = await weatherResponse.text();
          console.error("Weather API error:", errorText);
          throw new Error(`Weather API error: ${weatherResponse.status}`);
        }

        const weatherData: OpenWeatherResponse = await weatherResponse.json();
        console.log("Weather data received:", weatherData);

        const { lat, lon } = weatherData.coord;

        // Get air pollution data (optional)
        let airPollutionData: AirPollutionResponse | null = null;
        try {
          const airResponse = await fetch(
            `${this.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
          );

          if (airResponse.ok) {
            airPollutionData = await airResponse.json();
            console.log("Air pollution data received");
          }
        } catch (error) {
          console.warn("Không thể lấy dữ liệu chất lượng không khí:", error);
        }

        // Get UV Index (optional)
        let uvData: UVResponse | null = null;
        try {
          const uvResponse = await fetch(
            `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
          );

          if (uvResponse.ok) {
            uvData = await uvResponse.json();
            console.log("UV data received");
          }
        } catch (error) {
          console.warn("Không thể lấy dữ liệu UV:", error);
        }

        // Transform data
        const transformedData: WeatherData = {
          location: `${weatherData.name}, Việt Nam`,
          temperature: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].description,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
          visibility: Math.round(weatherData.visibility / 1000), // Convert meters to km
          uvIndex: uvData?.value || undefined,
          dustPM25: airPollutionData?.list[0]?.components?.pm2_5 || undefined,
          dustPM10: airPollutionData?.list[0]?.components?.pm10 || undefined,
          airQuality: this.getAirQualityText(airPollutionData?.list[0]?.main?.aqi),
          lastUpdated: new Date().toLocaleString("vi-VN"),
          icon: weatherData.weather[0].icon,
        };

        console.log("Transformed weather data:", transformedData);
        return transformedData;
      } catch (directError) {
        console.error("Direct weather API failed:", directError);
        throw directError;
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thời tiết:", error);
      throw error;
    }
  }

  private getAirQualityText(aqi?: number): string {
    if (!aqi) return "";

    switch (aqi) {
      case 1:
        return "Tốt";
      case 2:
        return "Khá tốt";
      case 3:
        return "Trung bình";
      case 4:
        return "Kém";
      case 5:
        return "Rất kém";
      default:
        return "Không xác định";
    }
  }
}

export const weatherService = new WeatherService();
