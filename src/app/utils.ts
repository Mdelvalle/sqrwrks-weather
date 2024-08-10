import { WeatherData } from "./types/weatherTypes";

function capitalize(words: string | undefined) {
  if (words) {
    return words
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
}

function getWeatherForecast(list: WeatherData[]) {
  return list.map((l: WeatherData) => {
    const date = new Date(l.dt * 1000);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const time = date.toLocaleTimeString([], options).split(" ")[0];
    const temperature = l.main.temp.toFixed(0);
    const { icon, description } = l.weather[0];

    return { time, temperature, icon, description };
  });
}

function getWeatherInfo(data: WeatherData | null) {
  if (!data) return null;

  const name = data.name;
  const description = capitalize(data.weather[0].description);
  const temperature = data.main.temp.toFixed(0);
  const humidity = data.main.humidity.toFixed(0);

  return { name, description, temperature, humidity };
}

function formatHour(hour: number): string {
  const ampm = hour >= 12 ? "PM" : "AM";
  const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
  return `${hourFormatted}:00 ${ampm}`;
}

const utils = {
  capitalize,
  getWeatherInfo,
  getWeatherForecast,
  formatHour,
};

export default utils;
