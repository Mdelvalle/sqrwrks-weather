export type WeatherData = {
  dt: number;
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
};

export type searchWeatherData = {
  search_query: string | undefined;
  search_time: number;
  description: string | undefined;
  temperature: string | undefined;
  humidity: string | undefined;
};

export type NormalizedWeatherData = {
  name: string | undefined;
  description: string | undefined;
  temperature: string | undefined;
  humidity: string | undefined;
};

export type ForecastData = {
  time: string;
  temperature: string;
  icon: string;
  description: string;
};

export type WeatherProps = {
  data: NormalizedWeatherData;
  forecast: ForecastData[];
};
