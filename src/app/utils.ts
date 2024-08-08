import { WeatherData } from "./types/weatherTypes";

function capitalize(words: string | undefined) {
  if (words) {
    return words
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
}

function getWeatherInfo(data: WeatherData | null) {
  if (!data) return null;

  const name = data.name;
  const description = capitalize(data.weather[0].description);
  const temperature = data.main.temp.toFixed(0);
  const humidity = data.main.humidity.toFixed(0);

  return { name, description, temperature, humidity };
}

const utils = {
  getWeatherInfo,
};

export default utils;
