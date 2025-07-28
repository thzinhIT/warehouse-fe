"use client";

import { useState, useEffect } from 'react';
import { weatherService, WeatherData } from '@/services/weather.service';

export function useWeather(city: string = 'Hanoi,VN', refreshInterval: number = 600000) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      console.log('Starting weather fetch for:', city);
      setIsLoading(true);
      setError(null);
      
      const weatherData = await weatherService.getCurrentWeather(city);
      
      if (weatherData) {
        setData(weatherData);
        console.log('Weather data set successfully');
      } else {
        setError('Không thể tải dữ liệu thời tiết');
      }
    } catch (err) {
      console.error('Weather fetch error in hook:', err);
      
      let errorMessage = 'Lỗi khi tải dữ liệu thời tiết';
      
      if (err instanceof Error) {
        if (err.message.includes('API key')) {
          errorMessage = 'Lỗi API key. Vui lòng kiểm tra cấu hình.';
        } else if (err.message.includes('401')) {
          errorMessage = 'API key không hợp lệ';
        } else if (err.message.includes('404')) {
          errorMessage = 'Không tìm thấy thành phố';
        } else if (err.message.includes('429')) {
          errorMessage = 'Đã vượt quá giới hạn API';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Set up auto-refresh
    const interval = setInterval(fetchWeather, refreshInterval);
    
    return () => clearInterval(interval);
  }, [city, refreshInterval]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchWeather,
  };
}