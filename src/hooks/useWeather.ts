import { useState, useEffect, useCallback } from "react";
import {
  weatherService,
  WeatherData,
  AirQualityData,
} from "@/services/weather.service";

export interface UseWeatherOptions {
  city?: string;
  useGeolocation?: boolean;
  units?: "metric" | "imperial";
  refreshInterval?: number; // in milliseconds
}

export interface UseWeatherReturn {
  weather: WeatherData | null;
  airQuality: AirQualityData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
  setCity: (city: string) => void;
}

export const useWeather = (
  options: UseWeatherOptions = {}
): UseWeatherReturn => {
  const {
    city: initialCity = "Ho Chi Minh City",
    useGeolocation = true,
    units = "metric",
    refreshInterval = 600000, // 10 minutes
  } = options;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string>(initialCity);

  const fetchWeatherByLocation = useCallback(async () => {
    if (!useGeolocation) return false;

    try {
      const { lat, lon } = await weatherService.getCurrentLocation();
      const [weatherData, airQualityData] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(lat, lon, units),
        weatherService.getAirQuality(lat, lon),
      ]);
      setWeather(weatherData);
      setAirQuality(airQualityData);
      setCurrentCity(weatherData.name);
      setError(null);
      return true;
    } catch (err) {
      console.warn("Failed to get location-based weather:", err);
      return false;
    }
  }, [useGeolocation, units]);

  const fetchWeatherByCity = useCallback(
    async (cityName: string) => {
      try {
        const weatherData = await weatherService.getCurrentWeatherByCity(
          cityName,
          units
        );
        // Get air quality using coordinates from weather data
        const airQualityData = await weatherService.getAirQuality(
          weatherData.coord.lat,
          weatherData.coord.lon
        );
        setWeather(weatherData);
        setAirQuality(airQualityData);
        setCurrentCity(weatherData.name);
        setError(null);
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch weather data";
        setError(errorMessage);
        console.error("Weather fetch error:", err);
        return false;
      }
    },
    [units]
  );

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try location first if enabled, fallback to city
      const locationSuccess = await fetchWeatherByLocation();
      if (!locationSuccess) {
        await fetchWeatherByCity(currentCity);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchWeatherByLocation, fetchWeatherByCity, currentCity]);

  const refresh = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  const setCity = useCallback(
    (city: string) => {
      setCurrentCity(city);
      setLoading(true);
      fetchWeatherByCity(city).finally(() => setLoading(false));
    },
    [fetchWeatherByCity]
  );

  // Initial fetch
  useEffect(() => {
    fetchWeather();
  }, []);

  // Set up auto-refresh interval
  useEffect(() => {
    if (refreshInterval <= 0) return;

    const interval = setInterval(() => {
      fetchWeather();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchWeather, refreshInterval]);

  return {
    weather,
    airQuality,
    loading,
    error,
    refresh,
    setCity,
  };
};
