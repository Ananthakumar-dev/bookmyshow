import { db } from "@/db";
import { theaters } from "@/db/schema/theaters";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import { movies } from "@/db/schema/movies";
import { movieCasts } from "@/db/schema/movieCasts";
import { randomUUID } from "crypto";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  await db.transaction(async (tx) => {
    await tx.update(movies)
      .set({
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
      })
      .where(eq(movies.id, params.id));

      await tx.delete(movieCasts)
        .where(eq(movieCasts.movie_id, params.id));

      await tx.insert(movieCasts).values(
        body.casts.map((cast: any) => ({
          id: randomUUID(),
          movie_id: params.id,
          name: cast.name,
          role: cast.role,
          image_url: cast.imageUrl,
        }))
      );
  })

  return NextResponse.json({ success: true, id: params.id });
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await db.delete(movies)
    .where(eq(movies.id, params.id));

  return NextResponse.json({ success: true });
}