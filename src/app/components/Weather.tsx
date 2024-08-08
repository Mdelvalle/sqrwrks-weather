import React from 'react';
import Image from "next/image";

interface WeatherProps {
    data: {
      day: string;
      name: string | undefined;
      description: string | undefined;
      temperature: string | undefined;
      humidity: string | undefined;
    };
    forecast: {
        time: string;
        temperature: string;
        icon: string;
        description: string;
    }[];
}

function Weather({ data, forecast }: WeatherProps) {
    const {day, name, description, temperature, humidity} = data;

    return (
        <div className="relative flex flex-col justify-between items-center w-full md:w-[500px] mt-20 py-8 z-[10] backdrop-blur-sm bg-white/10 rounded-2xl">
            <div className="text-white text-3xl text-center font-bold">{name}</div>
            <div className="text-white text-lg mt-2">{description}</div>
            <div className="flex justify-around w-80 mt-10">
              <div className="flex flex-col justify-center items-center text-white">
                <div className="text-3xl font-bold">{temperature}&deg;</div>
                <p className="text-md">Temperature</p>
              </div>
              <div className="flex flex-col justify-center items-center text-white">
                <div className="text-3xl font-bold">{humidity}%</div>
                <p className="text-md">Humidity</p>
              </div>
            </div>

            <div className='flex items-center space-x-3 mt-14 w-full overflow-x-auto px-4'>
                {forecast.map((f, i) => (
                    <div key={i} className='flex flex-col flex-nowrap justify-center items-center backdrop-blur-sm bg-white/20 rounded-2xl p-3'>
                        <p className=' text-white w-full'>{f.time.split(' ')[0]}</p>
                        <Image
                            src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
                            alt={`${f.description}`}
                            width='50'
                            height='50'
                        />
                        <p className='mt-1 text-white'>{f.temperature}&deg;</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Weather;