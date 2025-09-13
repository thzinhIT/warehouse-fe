"use client";

import { useEffect, useState } from "react";
import { Droplets, AlertTriangle, Clock } from "lucide-react";
import { GiDustCloud } from "react-icons/gi";

interface SensorData {
  timestamp: string;
  humidity: number;
  dust: number;
  event?: string;
}

export default function IoTDashboard() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [hasAlert, setHasAlert] = useState(false);

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    const pad = (n: number) => n.toString().padStart(2, "0");
    const ss = pad(date.getSeconds());
    const mm = pad(date.getMinutes());
    const hh = pad(date.getHours());
    const dd = pad(date.getDate());
    const MM = pad(date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return `${dd}/${MM}/${yyyy} ${hh}:${mm}:${ss} `;
  };

  useEffect(() => {
    const dataInterval = setInterval(() => {
      const humidity = Math.floor(Math.random() * 60) + 30;
      const dust = Math.floor(Math.random() * 150) + 10;

      const alertCondition = humidity > 65 || dust > 100;
      setHasAlert(alertCondition);
      setSensorData({
        timestamp: new Date().toISOString(),
        humidity,
        dust,
        event: alertCondition ? "ALERT" : "NORMAL",
      });
    }, 5000);

    return () => {
      clearInterval(dataInterval);
    };
  }, []);
  return (
    <div className="max-w-2xl mx-auto pl-2">
      <div className="mb-2">
        {hasAlert ? (
          <div className="bg-gradient-to-br from-red-500/60 to-orange-500/60 backdrop-blur-sm border border-red-500/50 rounded-2xl p-8 shadow-2xl ">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-500/30 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-amber-200" />
              </div>
              <h2 className="text-2xl font-bold text-red-800">
                Giá trị vượt ngưỡng
              </h2>
            </div>

            {sensorData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 h-[70px]">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-600  text-lg">Độ ẩm</span>
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        sensorData.humidity > 65 ? "text-red-400" : "text-white"
                      }`}
                    >
                      {sensorData?.humidity}%
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GiDustCloud className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-600 font-medium">
                        Độ bụi
                      </span>
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        sensorData.dust > 100 ? "text-red-400" : "text-white"
                      }`}
                    >
                      {sensorData?.dust} µg/m³
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-red-500/30">
                  <div className="flex items-center justify-center gap-2 text-red-800">
                    <Clock className="w-4 h-4 text-red-800" />
                    <span className="text-sm">
                      {formatTimestamp(sensorData.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Normal Box
          <div className="bg-gradient-to-br from-blue-500/60 to-purple-500/60 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Mức bình thường</h2>
            </div>

            {sensorData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 h-[70px]">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Droplets className="w-5 h-5 text-blue-100" />
                      <span className="text-slate-300 font-medium">Độ ẩm</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {sensorData?.humidity}%
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GiDustCloud className="w-5 h-5 text-purple-100" />
                      <span className="text-slate-300 font-medium">Độ bụi</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {sensorData?.dust} µg/m³
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-blue-500/30">
                  <div className="flex items-center justify-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {formatTimestamp(sensorData.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-500/20 h-16 rounded"></div>
                  <div className="bg-blue-500/20 h-16 rounded"></div>
                  <div className="bg-blue-500/20 h-16 rounded"></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Status Bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm">System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-slate-300 text-sm">Data Streaming</span>
            </div>
          </div>
          <div className="text-slate-300 text-sm">Last updated: HH/MM/SS</div>
        </div>
      </div>
    </div>
  );
}
