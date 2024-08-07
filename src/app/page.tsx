'use client'

import { useState } from "react";
import Image from "next/image";
import {BsSearch} from "react-icons/bs";

interface WeatherData {
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

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

  async function fetchWeather(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  function capitalize(words: string) {
    return words.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return (
    <main className="flex flex-col justify-between items-center w-full px-8 py-16">
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
        <form className="flex justify-between items-center w-full bg-white p-3 bg-transparent border border-gray-300 text-white rounded-2xl">
          <input className="w-full bg-transparent border-none text-white focus:outline-none text-2xl" type="text" placeholder="Search City" onChange={(e) => setCity(e.target.value)}></input>
          <button onClick={fetchWeather}>
            <BsSearch size={24} />
          </button>
        </form>
      </div>

      {weather && (
        <div className="relative flex flex-col justify-between items-center mt-20 z-[10]">
          <div className="text-white text-6xl text-center font-bold">{weather.name}</div>
          <div className="text-white text-4xl mt-4">{capitalize(weather.weather[0].description)}</div>
          <div className="flex justify-around w-80 mt-20">
            <div className="flex flex-col justify-center items-center text-white">
              <div className="text-5xl font-bold">{weather.main.temp.toFixed(0)}&deg;</div>
              <p className="text-lg">Temperature</p>
            </div>
            <div className="flex flex-col justify-center items-center text-white">
              <div className="text-5xl font-bold">{weather.main.humidity.toFixed(0)}%</div>
              <p className="text-lg">Humidity</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
