import { db } from "@/db";
import { movies } from "@/db/schema/movies";
import { movieCasts } from "@/db/schema/movieCasts";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  const movieId = randomUUID();

  await db.transaction(async (tx) => {
    await tx.insert(movies).values({
      id: movieId,
      title: body.title,
      description: body.description,
      duration: body.duration,
      release_date: new Date(body.release_date),
      genre: body.genre.join(','),
      language: body.language,
      language_versions: body.language_versions.join(','),
      poster_url: body.poster_url,
      trailer_url: body.trailer_url,
      certification: body.certification,
      status: body.status,
    });

    await tx.insert(movieCasts).values(
      body.casts.map((cast: any) => ({
        id: randomUUID(),
        movie_id: movieId,
        name: cast.name,
        role: cast.role,
        image_url: cast.imageUrl,
      }))
    );
  });

  return NextResponse.json({ success: true, id: movieId });
}
