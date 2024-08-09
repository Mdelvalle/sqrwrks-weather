"use server";

import { db } from "@vercel/postgres";
import { searchWeatherData } from "../types/weatherTypes";

export async function updateWeatherSearches(search: searchWeatherData) {
  try {
    console.log("POSTGRES_URL", process.env.POSTGRES_URL);
    const client = await db.connect();

    await client.sql`
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
