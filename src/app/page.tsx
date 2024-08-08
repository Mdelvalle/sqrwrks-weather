'use client'

import { useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Weather from './components/Weather';
import { WeatherData, ForecastData } from './types/weatherTypes';

export default function Home() {
  const [weatherToday, setWeatherToday] = useState<WeatherData | null>(null);
  const [weatherTomorrow, setWeatherTomorrow] = useState<ForecastData[] | null>(null);

  async function fetchWeather(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const city = formJson.weatherInput.toString();

    await fetchToday(city);
    await fetchTomorrow(city);
  }

  async function fetchToday(city: string) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      setWeatherToday(data);

      // TODO: save user action to DB
    } catch (error) {
      console.error("Error fetching today's data:", error);
    }
  }

  async function fetchTomorrow(city: string) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&cnt=${8}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const forecast: ForecastData[] = data.list.map((l: WeatherData) => {
        const date = new Date(l.dt * 1000);
        const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const time = date.toLocaleTimeString([], options).split(' ')[0];
        const temperature = l.main.temp.toFixed(0);
        const { icon, description } = l.weather[0];

        return { time, temperature, icon, description, };
      });
      setWeatherTomorrow(forecast);
    } catch (error) {
      console.error("Error fetching tomorrow's data:", error);
    }
  }

  function capitalize(words: string | undefined) {
    if (words) {
      return words.split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  function getWeatherInfo(data: WeatherData | null) {
    if (!data) return null;

    const name = data.name;
    const description = capitalize(data.weather[0].description);
    const temperature = data.main.temp.toFixed(0);
    const humidity = data.main.humidity.toFixed(0);

    return { name, description, temperature, humidity, }
  }

  const weatherNow = getWeatherInfo(weatherToday);

  return (
    <main className="flex flex-col justify-between items-center w-full px-8 py-16 z-[10] h-full">
      {/* overlay */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/60 z-[1]" />
      <Image
        src="https://plus.unsplash.com/premium_photo-1675344576121-81e305536fd3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Canopy of trees changing color"
        fill
        style={{objectFit:"cover"}}
        className="object-cover"
      />

      {/* search */}
      <div className="relative flex justify-between items-center z-[10] mt-4">
        <form onSubmit={fetchWeather} className="flex justify-between items-center w-full p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
          <input className="w-full bg-transparent border-none text-white focus:outline-none text-2xl" type="text" placeholder="Search City" name="weatherInput"></input>
          <button type="submit">
            <BsSearch size={24} />
          </button>
        </form>
      </div>

      {weatherNow && weatherTomorrow && (
        <Weather data={weatherNow} forecast={weatherTomorrow} />
      )}
    </main>
  );
}
