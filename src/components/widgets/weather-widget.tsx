"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Zap,
  Eye,
  Wind,
  Droplets,
  Thermometer,
  RefreshCw,
  MapPin,
  Sunrise,
  Sunset,
  Gauge,
} from "lucide-react";
import { useWeather } from "@/hooks/useWeather";
import { weatherService } from "@/services/weather.service";
import { cn } from "@/lib/utils";

interface WeatherWidgetProps {
  className?: string;
  city?: string;
  units?: "metric" | "imperial";
  showForecast?: boolean;
  compact?: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  className,
  city = "Ho Chi Minh City",
  units = "metric",
  showForecast = false,
  compact = false,
}) => {
  const t = useTranslations("weather");
  const { weather, airQuality, loading, error, refresh } = useWeather({
    city,
    units,
    useGeolocation: true,
  });

  const getWeatherIcon = (iconCode: string, size: number = 24) => {
    const iconMap: Record<string, React.ReactNode> = {
      "01d": <Sun className={`h-${size / 4} w-${size / 4} text-yellow-500`} />, // clear sky day
      "01n": <Sun className={`h-${size / 4} w-${size / 4} text-gray-400`} />, // clear sky night
      "02d": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-500`} />, // few clouds day
      "02n": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-600`} />, // few clouds night
      "03d": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-500`} />, // scattered clouds
      "03n": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-600`} />,
      "04d": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-600`} />, // broken clouds
      "04n": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-700`} />,
      "09d": (
        <CloudRain className={`h-${size / 4} w-${size / 4} text-blue-500`} />
      ), // shower rain
      "09n": (
        <CloudRain className={`h-${size / 4} w-${size / 4} text-blue-600`} />
      ),
      "10d": (
        <CloudRain className={`h-${size / 4} w-${size / 4} text-blue-500`} />
      ), // rain
      "10n": (
        <CloudRain className={`h-${size / 4} w-${size / 4} text-blue-600`} />
      ),
      "11d": <Zap className={`h-${size / 4} w-${size / 4} text-purple-500`} />, // thunderstorm
      "11n": <Zap className={`h-${size / 4} w-${size / 4} text-purple-600`} />,
      "13d": (
        <CloudSnow className={`h-${size / 4} w-${size / 4} text-blue-200`} />
      ), // snow
      "13n": (
        <CloudSnow className={`h-${size / 4} w-${size / 4} text-blue-300`} />
      ),
      "50d": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-400`} />, // mist
      "50n": <Cloud className={`h-${size / 4} w-${size / 4} text-gray-500`} />,
    };

    return (
      iconMap[iconCode] || (
        <Cloud className={`h-${size / 4} w-${size / 4} text-gray-500`} />
      )
    );
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTemperatureUnit = () => (units === "metric" ? "°C" : "°F");
  const getSpeedUnit = () => (units === "metric" ? "m/s" : "mph");

  if (loading) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">
              {t("loading")}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-32 space-y-3">
            <p className="text-sm text-destructive text-center">{error}</p>
            <Button
              onClick={refresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              {t("retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">{t("noData")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const mainWeather = weather.weather[0];

  // Compact version for smaller spaces
  if (compact) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              {t("title")}
            </CardTitle>
            <Button
              onClick={refresh}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{weather.name}</span>
          </div>

          {/* Main Weather Info */}
          <div className="flex items-center gap-2">
            {getWeatherIcon(mainWeather.icon, 20)}
            <div className="flex-1">
              <p className="text-xl font-bold">
                {Math.round(weather.main.temp)}
                {getTemperatureUnit()}
              </p>
              <p className="text-xs text-muted-foreground capitalize truncate">
                {mainWeather.description}
              </p>
            </div>
          </div>

          {/* Essential Details - 2x3 grid with air quality */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <Droplets className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs">{weather.main.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs">
                {weather.wind.speed} {getSpeedUnit()}
              </span>
            </div>
            {airQuality && airQuality.list[0] && (
              <>
                <div className="flex items-center gap-1">
                  <Gauge className="h-3 w-3 text-muted-foreground" />
                  <span
                    className={`text-xs ${
                      weatherService.getAQIDescription(
                        airQuality.list[0].main.aqi
                      ).color
                    }`}
                  >
                    {(() => {
                      const aqiLevel = weatherService
                        .getAQIDescription(airQuality.list[0].main.aqi)
                        .level.toLowerCase();
                      const translationKey = aqiLevel.replace(" ", ""); // Remove spaces: "very poor" -> "verypoor"
                      return t(`airQuality.${translationKey}`);
                    })()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {t("airQuality.pm25")}:
                  </span>
                  <span className="text-xs">
                    {Math.round(airQuality.list[0].components.pm2_5)}μg/m³
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full version
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            {t("title")}
          </CardTitle>
          <Button
            onClick={refresh}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
            {weather.name}, {weather.sys.country}
          </span>
        </div>

        {/* Main Weather Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(mainWeather.icon, 32)}
            <div>
              <p className="text-2xl font-bold">
                {Math.round(weather.main.temp)}
                {getTemperatureUnit()}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {mainWeather.description}
              </p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-muted-foreground">{t("feelsLike")}</p>
            <p className="font-medium">
              {Math.round(weather.main.feels_like)}
              {getTemperatureUnit()}
            </p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="text-muted-foreground">{t("humidity")}</p>
              <p className="font-medium">{weather.main.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="text-muted-foreground">{t("wind")}</p>
              <p className="font-medium">
                {weather.wind.speed} {getSpeedUnit()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="text-muted-foreground">{t("visibility")}</p>
              <p className="font-medium">
                {(weather.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <p className="text-muted-foreground">{t("pressure")}</p>
              <p className="font-medium">{weather.main.pressure} hPa</p>
            </div>
          </div>

          {/* Air Quality Section */}
          {airQuality && airQuality.list[0] && (
            <>
              <div className="flex items-center gap-2">
                <Gauge
                  className={`h-4 w-4 ${
                    weatherService.getAQIDescription(
                      airQuality.list[0].main.aqi
                    ).color
                  }`}
                />
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    {t("airQuality.title")}
                  </p>
                  <p
                    className={`font-medium ${
                      weatherService.getAQIDescription(
                        airQuality.list[0].main.aqi
                      ).color
                    }`}
                  >
                    {(() => {
                      const aqiLevel = weatherService
                        .getAQIDescription(airQuality.list[0].main.aqi)
                        .level.toLowerCase();
                      const translationKey = aqiLevel.replace(" ", "");
                      return t(`airQuality.${translationKey}`);
                    })()}{" "}
                    (AQI {airQuality.list[0].main.aqi})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-4 w-4 flex items-center justify-center text-xs text-muted-foreground">
                  PM
                </span>
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    {t("airQuality.pm25")}
                  </p>
                  <p className="font-medium">
                    {Math.round(airQuality.list[0].components.pm2_5)} μg/m³
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sunrise/Sunset */}
        <div className="flex items-center justify-between pt-4 border-t text-sm">
          <div className="flex items-center gap-2">
            <Sunrise className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-muted-foreground">{t("sunrise")}</p>
              <p className="font-medium">{formatTime(weather.sys.sunrise)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sunset className="h-4 w-4 text-orange-600" />
            <div>
              <p className="text-muted-foreground">{t("sunset")}</p>
              <p className="font-medium">{formatTime(weather.sys.sunset)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
