"use server";

import { sql } from "@vercel/postgres";
import { searchWeatherData } from "../types/weatherTypes";

export async function updateWeatherSearches(search: searchWeatherData) {
  try {
    await sql`
            INSERT INTO searches (
                search_query,
                search_time,
                description,
                temperature,
                humidity
            )
            VALUES (
                ${search.search_query},
                TO_TIMESTAMP(${search.search_time}),
                ${search.description},
                ${search.temperature},
                ${search.humidity}
            )
            ON CONFLICT (id) DO NOTHING;
        `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update the latest search.");
  }
}

export async function fetchMostPopular() {
  try {
    const result = await sql`
        SELECT
            search_query, COUNT(*) as search_count
        FROM
            searches
        GROUP BY
            search_query
        ORDER BY
            search_count DESC
        LIMIT
            3;
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the most popular searches.");
  }
}

export async function fetchMostActiveTimes() {
  try {
    const result = await sql`
        SELECT
            DATE_PART('hour', search_time) AS hour_of_day,
            COUNT(*) as search_count,
            MODE() WITHIN GROUP (ORDER BY temperature) as common_temperature,
            MODE() WITHIN GROUP (ORDER BY humidity) as common_humidity,
            MODE() WITHIN GROUP (ORDER BY description) as common_weather_description
        FROM
            searches
        GROUP BY
            hour_of_day
        ORDER BY
            search_count DESC
        LIMIT
            3;
    `;

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch most active times to search weather.");
  }
}
