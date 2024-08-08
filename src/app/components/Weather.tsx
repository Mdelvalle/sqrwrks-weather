import React from "react";
import Image from "next/image";
import { WeatherProps } from "../types/weatherTypes";

function Weather({ data, forecast }: WeatherProps) {
  const { name, description, temperature, humidity } = data;

  return (
    <div className="relative z-[10] mt-20 flex w-full flex-col items-center justify-between rounded-2xl bg-white/10 py-8 backdrop-blur-sm md:w-[500px]">
      <div className="text-center text-3xl font-bold text-white">{name}</div>
      <div className="mt-2 text-lg text-white">{description}</div>
      <div className="mt-10 flex w-80 justify-around">
        <div className="flex flex-col items-center justify-center text-white">
          <div className="text-3xl font-bold">{temperature}&deg;</div>
          <p className="text-md">Temperature</p>
        </div>
        <div className="flex flex-col items-center justify-center text-white">
          <div className="text-3xl font-bold">{humidity}%</div>
          <p className="text-md">Humidity</p>
        </div>
      </div>

      <div className="mt-14 flex w-full items-center space-x-3 overflow-x-auto px-4">
        {forecast.map((f, i) => (
          <div
            key={i}
            className="flex flex-col flex-nowrap items-center justify-center rounded-2xl bg-white/20 p-3 backdrop-blur-sm"
          >
            <p className="w-full text-white">{f.time}</p>
            <Image
              src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
              alt={`${f.description}`}
              width="50"
              height="50"
            />
            <p className="mt-1 text-white">{f.temperature}&deg;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
