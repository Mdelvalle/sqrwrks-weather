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
}
  
export type ForecastData = {
    time: string;
    temperature: number;
    icon: string;
    description: string;
}

export type WeatherProps = {
    data: {
      name: string | undefined;
      description: string | undefined;
      temperature: string | undefined;
      humidity: string | undefined;
    };
    forecast: ForecastData[];
}
