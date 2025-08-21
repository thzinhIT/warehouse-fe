"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Droplets,
  Radiation,
  AlertTriangle,
  CheckCircle,
  Activity,
} from "lucide-react";

// Define the shape of the sensor data
interface SensorData {
  timestamp: string;
  humidity: number;
  dust: number;
  event: string | null;
}

// Initial state for the sensor data
const initialSensorData: SensorData = {
  timestamp: "",
  humidity: 0,
  dust: 0,
  event: null,
};

const SensorDataWidget: React.FC = () => {
  const [normalData, setNormalData] = useState<SensorData>(initialSensorData);

  // Function to format the timestamp
  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "No data";
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  // Function to get status color based on values
  const getHumidityStatus = (humidity: number) => {
    if (humidity < 30) return { color: "text-red-500", status: "Low" };
    if (humidity > 70) return { color: "text-orange-500", status: "High" };
    return { color: "text-green-500", status: "Normal" };
  };

  const getDustStatus = (dust: number) => {
    if (dust > 50) return { color: "text-red-500", status: "High" };
    if (dust > 25) return { color: "text-orange-500", status: "Moderate" };
    return { color: "text-green-500", status: "Good" };
  };

  useEffect(() => {
    // Simulate sensor data for demo purposes
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      const humidity = Math.floor(Math.random() * 40) + 40; // 40-80%
      const dust = Math.floor(Math.random() * 60) + 10; // 10-70

      setNormalData({
        timestamp: now,
        humidity,
        dust,
        event: humidity > 70 || dust > 50 ? "warning" : null,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const humidityStatus = getHumidityStatus(normalData.humidity);
  const dustStatus = getDustStatus(normalData.dust);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Sensor Data
          </CardTitle>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-500">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Humidity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{normalData.humidity}%</div>
            <div className={cn("text-xs", humidityStatus.color)}>
              {humidityStatus.status}
            </div>
          </div>
        </div>

        {/* Dust */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radiation className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Dust</span>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{normalData.dust} μg/m³</div>
            <div className={cn("text-xs", dustStatus.color)}>
              {dustStatus.status}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            {normalData.event ? (
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(normalData.timestamp)}
            </span>
          </div>
          <div
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              normalData.event
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            )}
          >
            {normalData.event ? "Warning" : "Normal"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorDataWidget;
