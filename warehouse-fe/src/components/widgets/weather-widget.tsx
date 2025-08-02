"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const WeatherWidget: React.FC = () => {
  const t = useTranslations('weather');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for Ho Chi Minh City weather
    const fetchWeather = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data for Ho Chi Minh City
      const mockWeather: WeatherData = {
        location: "Ho Chi Minh City",
        temperature: 32,
        condition: "sunny",
        humidity: 75,
        windSpeed: 12,
        icon: "☀️"
      };
      
      setWeather(mockWeather);
      setLoading(false);
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-4 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-8 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-4 shadow-lg">
        <p className="text-gray-500 dark:text-gray-400">{t('errorLoading')}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-white">
            {t('title')}
          </h3>
        </div>
        <span className="text-2xl">{weather.icon}</span>
      </div>

      {/* Location */}
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
        📍 {weather.location}
      </p>

      {/* Temperature */}
      <div className="text-center mb-3">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {weather.temperature}°C
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 capitalize">
          {t(`conditions.${weather.condition}`)}
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
          <div className="text-gray-500 dark:text-gray-400">{t('humidity')}</div>
          <div className="font-semibold text-gray-900 dark:text-white">{weather.humidity}%</div>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-2">
          <div className="text-gray-500 dark:text-gray-400">{t('windSpeed')}</div>
          <div className="font-semibold text-gray-900 dark:text-white">{weather.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
