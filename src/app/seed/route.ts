import { db } from "@vercel/postgres";
import { searches } from "../lib/placeholder-data";

const client = await db.connect();

async function seedWeatherSearch() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS searches (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      search_query TEXT NOT NULL,
      search_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      description TEXT NOT NULL,
      temperature INT,
      humidity INT
    );
  `;

  const insertedSearches = await Promise.all(
    searches.map(
      (search: any) => client.sql`
        INSERT INTO searches (search_query, search_time, description, temperature, humidity)
        VALUES (${search.search_query}, TO_TIMESTAMP(${search.search_time}), ${search.description}, ${search.temperature}, ${search.humidity})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedSearches;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedWeatherSearch();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
