# Weather Widget Setup

## OpenWeather API Integration

The weather widget uses the OpenWeather API to fetch real-time weather data. Follow these steps to set it up:

### 1. Get OpenWeather API Key

1. Visit [OpenWeatherMap.org](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Go to [API Keys section](https://home.openweathermap.org/api_keys)
4. Copy your API key

### 2. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace `your_openweather_api_key_here` with your actual API key:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 3. Features

The weather widget provides:

- **Current Weather**: Temperature, humidity, wind speed, pressure
- **Location Detection**: Automatically detects user location (with permission)
- **Fallback City**: Defaults to Ho Chi Minh City if location access is denied
- **Multi-language**: Supports English and Vietnamese
- **Auto Refresh**: Updates every 10 minutes
- **Manual Refresh**: Click the refresh button to update manually
- **Weather Icons**: Visual representations of weather conditions
- **Sunrise/Sunset**: Local sunrise and sunset times

### 4. API Limits

The free OpenWeather API plan includes:
- 1,000 API calls per day
- 60 calls per minute
- Current weather data
- 5-day weather forecast

### 5. Customization

You can customize the weather widget by:

- Changing the default city in the component
- Adjusting the refresh interval
- Modifying temperature units (Celsius/Fahrenheit)
- Styling the component appearance

### 6. Error Handling

The widget handles various error scenarios:
- Missing API key
- Network connection issues
- Location access denied
- Invalid city names
- API rate limits

### 7. Privacy

The widget:
- Only requests location when needed
- Stores no personal data
- Uses HTTPS for all API calls
- Respects user location preferences
