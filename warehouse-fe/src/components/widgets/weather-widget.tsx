"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/useWeather";
import { useTranslations } from "next-intl";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiHumidity,
  WiBarometer,
  WiStrongWind,
} from "react-icons/wi";
import { MdAir, MdVisibility, MdRefresh, MdError } from "react-icons/md";
import { TbUvIndex } from "react-icons/tb";

const getWeatherIcon = (condition: string, iconCode?: string) => {
  const iconClass = "w-12 h-12 text-blue-500";

  // Use OpenWeather icon code if available
  if (iconCode) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={condition}
        className="w-12 h-12"
      />
    );
  }

  // Fallback to react-icons
  const conditionLower = condition?.toLowerCase();

  if (conditionLower?.includes("clear") || conditionLower?.includes("sunny")) {
    return <WiDaySunny className={iconClass} />;
  } else if (conditionLower?.includes("cloud")) {
    return <WiCloudy className={iconClass} />;
  } else if (
    conditionLower?.includes("rain") ||
    conditionLower?.includes("drizzle")
  ) {
    return <WiRain className={iconClass} />;
  } else if (conditionLower?.includes("snow")) {
    return <WiSnow className={iconClass} />;
  } else if (conditionLower?.includes("thunder")) {
    return <WiThunderstorm className={iconClass} />;
  }
  return <WiDaySunny className={iconClass} />;
};

const getAirQualityColor = (quality: string) => {
  const qualityLower = quality?.toLowerCase();

  if (qualityLower?.includes("good") || qualityLower?.includes("tốt")) {
    return "bg-green-500 text-white";
  } else if (qualityLower?.includes("fair") || qualityLower?.includes("khá")) {
    return "bg-green-400 text-white";
  } else if (
    qualityLower?.includes("moderate") ||
    qualityLower?.includes("trung bình")
  ) {
    return "bg-yellow-500 text-white";
  } else if (qualityLower?.includes("poor") || qualityLower?.includes("kém")) {
    return "bg-orange-500 text-white";
  } else if (
    qualityLower?.includes("very poor") ||
    qualityLower?.includes("rất kém")
  ) {
    return "bg-red-500 text-white";
  }
  return "bg-gray-500 text-white";
};

// Function to map air quality values to translation keys
const getAirQualityTranslationKey = (quality: string) => {
  const qualityLower = quality?.toLowerCase();

  if (qualityLower?.includes("good") || qualityLower?.includes("tốt")) {
    return "good";
  } else if (qualityLower?.includes("fair") || qualityLower?.includes("khá")) {
    return "fair";
  } else if (
    qualityLower?.includes("moderate") ||
    qualityLower?.includes("trung bình")
  ) {
    return "moderate";
  } else if (
    qualityLower?.includes("poor") &&
    !qualityLower?.includes("very")
  ) {
    return "poor";
  } else if (
    qualityLower?.includes("very poor") ||
    qualityLower?.includes("rất kém")
  ) {
    return "veryPoor";
  }
  return null; // Return null if no match found
};

export default function WeatherWidget() {
  const { data, isLoading, error, refetch } = useWeather("Ho Chi Minh City,VN");
  const t = useTranslations("weather");

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MdError className="w-5 h-5 text-red-500" />
              {t("title")}
            </span>
            <Button variant="ghost" size="sm" onClick={refetch}>
              <MdRefresh className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MdError className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <p className="text-red-600 mb-2">{t("errorLoading")}</p>
            <Button variant="outline" onClick={refetch} className="mt-2">
              {t("retry")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WiDaySunny className="w-5 h-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            {t("noData")}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <WiDaySunny className="w-5 h-5" />
            {t("title")}
          </span>
          <Button variant="ghost" size="sm" onClick={refetch}>
            <MdRefresh className="w-4 h-4" />
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{data.location}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Weather Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getWeatherIcon(data.condition, data.icon)}
            <div>
              <div className="text-3xl font-bold">{data.temperature}°C</div>
              <div className="text-sm text-muted-foreground capitalize">
                {data.condition}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <WiHumidity className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium">{t("humidity")}</div>
              <div className="text-sm text-muted-foreground">
                {data.humidity}%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WiBarometer className="w-5 h-5 text-gray-500" />
            <div>
              <div className="text-sm font-medium">{t("pressure")}</div>
              <div className="text-sm text-muted-foreground">
                {data.pressure} hPa
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <WiStrongWind className="w-5 h-5 text-green-500" />
            <div>
              <div className="text-sm font-medium">{t("windSpeed")}</div>
              <div className="text-sm text-muted-foreground">
                {data.windSpeed} km/h
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MdVisibility className="w-5 h-5 text-purple-500" />
            <div>
              <div className="text-sm font-medium">{t("visibility")}</div>
              <div className="text-sm text-muted-foreground">
                {data.visibility} km
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Section */}
        {(data.dustPM25 || data.dustPM10 || data.airQuality) && (
          <>
            <div className="border-t border-gray-200 my-4"></div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium flex items-center gap-2">
                  <MdAir className="w-4 h-4" />
                  {t("airQuality")}
                </h4>
                {data.airQuality && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getAirQualityColor(
                      data.airQuality
                    )}`}
                  >
                    {(() => {
                      const translationKey = getAirQualityTranslationKey(
                        data.airQuality
                      );
                      return translationKey
                        ? t(`qualities.${translationKey}`)
                        : data.airQuality;
                    })()}
                  </span>
                )}
              </div>

              {(data.dustPM25 || data.dustPM10) && (
                <div className="grid grid-cols-2 gap-4">
                  {data.dustPM25 && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">PM2.5</div>
                      <div className="font-medium">
                        {data.dustPM25.toFixed(1)} µg/m³
                      </div>
                    </div>
                  )}

                  {data.dustPM10 && (
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="text-xs text-gray-600">PM10</div>
                      <div className="font-medium">
                        {data.dustPM10.toFixed(1)} µg/m³
                      </div>
                    </div>
                  )}
                </div>
              )}

              {data.uvIndex && (
                <div className="flex items-center gap-2">
                  <TbUvIndex className="w-4 h-4 text-orange-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{t("uvIndex")}</div>
                    <div className="text-sm text-muted-foreground">
                      {data.uvIndex}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Last Updated */}
        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
          {t("lastUpdated")}: {data.lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}
