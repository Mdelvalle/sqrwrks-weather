import React from "react";
import { fetchMostPopular, fetchMostActiveTimes } from "../lib/data";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import utils from "../utils";

export default async function page() {
  const mostPopular = await fetchMostPopular();
  const mostActiveTimes = await fetchMostActiveTimes();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-8 text-center">
      <div className="absolute left-0 top-0 z-[10] ml-3 mt-2">
        <Link href="/" className="text-3xl">
          <BsArrowLeft />
        </Link>
      </div>
      <h1 className="mb-20 text-5xl font-bold">Analytics</h1>

      <div className="space-y-6">
        <div className="space-y-1 rounded-2xl border border-white bg-black/80 p-3 text-start text-white shadow-2xl md:p-6">
          <div className="mb-5 text-xl font-bold">Most Searched Cities</div>
          {mostPopular.map(({ search_query, search_count }, i) => {
            return (
              <div key={`${search_query}-${i}`}>
                ({search_count}) {search_query}
              </div>
            );
          })}
        </div>

        <div className="space-y-1 rounded-2xl border border-white bg-black/80 p-3 text-start text-white shadow-2xl md:p-6">
          <div className="mb-5 text-xl font-bold">Most Active Search Times</div>
          {mostActiveTimes.map(
            (
              {
                hour_of_day,
                search_count,
                common_temperature,
                common_humidity,
                common_weather_description,
              },
              i,
            ) => {
              return (
                <div key={`${hour_of_day}-${i}`}>
                  ({search_count}) {utils.formatHour(hour_of_day)} &middot;{" "}
                  {common_temperature}&deg; &middot; {common_humidity}% &middot;{" "}
                  {common_weather_description}
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
