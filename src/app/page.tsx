"use client";

import { useState } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Weather from "./components/Weather";
import {
  WeatherData,
  ForecastData,
  searchWeatherData,
} from "./types/weatherTypes";
import utils from "./utils";
import { updateWeatherSearches } from "./lib/data";
import Link from "next/link";

export default function Home() {
  const [searchError, setsearchError] = useState<string | null>(null);
  const [weatherToday, setWeatherToday] = useState<WeatherData | null>(null);
  const [weatherTomorrow, setWeatherTomorrow] = useState<ForecastData[] | null>(
    null,
  );

  async function fetchWeather(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const city = formJson.weatherInput.toString();

    if (city) {
      await fetchToday(city);
      await fetchTomorrow(city);
    } else {
      setsearchError("City cannot be empty.");
    }
  }

  async function fetchToday(city: string) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! ${response.statusText}`);
      }
      const data: WeatherData = await response.json();
      setWeatherToday(data);
      setsearchError(null);

      // Save user action to DB
      const { name, description, temperature, humidity } =
        utils.getWeatherInfo(data) || {};
      const searchInfo: searchWeatherData = {
        search_query: name,
        search_time: data.dt,
        description,
        temperature,
        humidity,
      };
      await updateWeatherSearches(searchInfo);
    } catch (error) {
      console.error("Error fetching today's data:", error);
      setsearchError("City not found. Check the spelling.");
    }
  }

  async function fetchTomorrow(city: string) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${city}&cnt=${8}&appid=${
        process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY
      }`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const forecast: ForecastData[] = utils.getWeatherForecast(data.list);
      setWeatherTomorrow(forecast);
    } catch (error) {
      console.error("Error fetching tomorrow's data:", error);
    }
  }

  const weatherNow = utils.getWeatherInfo(weatherToday);

  return (
    <main className="z-[10] flex h-screen w-full flex-col items-center justify-start px-8 py-16">
      {/* overlay */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[1] bg-black/60" />
      <Image
        src="https://plus.unsplash.com/premium_photo-1675344576121-81e305536fd3?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Canopy of trees changing color"
        fill
        style={{ objectFit: "cover" }}
        className="object-cover"
      />

      {/* link to analytics */}
      <div className="absolute left-0 top-0 z-[10] ml-2 mt-3">
        <Link
          href="/analytics"
          className="rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 px-2 py-1"
        >
          Analytics
        </Link>
      </div>

      {/* search */}
      <div className="relative z-[10] mt-4 flex flex-col items-center justify-between">
        <form
          onSubmit={fetchWeather}
          className="flex w-full items-center justify-between rounded-2xl border border-gray-300 bg-transparent p-3 text-white"
        >
          <input
            className="w-full border-none bg-transparent text-2xl text-white focus:outline-none"
            type="text"
            placeholder="Search City"
            name="weatherInput"
          ></input>
          <button type="submit">
            <BsSearch size={24} />
          </button>
        </form>

        {/* error */}
        {searchError && (
          <p className="p-y1 mt-2 px-3 text-lg text-red-500">{searchError}</p>
        )}
      </div>

      {weatherNow && weatherTomorrow && (
        <Weather data={weatherNow} forecast={weatherTomorrow} />
      )}
    </main>
  );
}
