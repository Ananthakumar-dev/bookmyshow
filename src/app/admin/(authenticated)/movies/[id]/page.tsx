import React from "react";
import MovieForm from "@/app/admin/(authenticated)/movies/form";
import { db } from "@/db";
import { movies } from "@/db/schema/movies";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { movieCasts } from "@/db/schema/movieCasts";

type PageProps = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const movie = await db
    .select()
    .from(movies)
    .where(eq(movies.id, params.id))
    .limit(1);

  const casts = await db
    .select()
    .from(movieCasts)
    .where(eq(movieCasts.movie_id, params.id));

  if (!movie.length) {
    notFound();
  }

  const row = movie[0];

  const defaultValues = {
    title: row.title,
    description: row.description ?? "",
    duration: row.duration,

    release_date: row.release_date, // Date object is correct

    genre: row.genre.split(','),
    language: row.language,
    language_versions: row.language_versions.split(','),

    poster_url: row.poster_url,
    trailer_url: row.trailer_url ?? "",

    certification: row.certification,
    status: row.status,

    casts: casts.map((cast) => ({
      name: cast.name,
      role: cast.role,
      image: undefined,
      imageUrl: cast.image_url ?? "",
    })),
  };

  return (
    <div className="container p-4 space-y-4">
      <div>
        <h2>Edit Theater</h2>
        <p> Here edit the theater config </p>
      </div>

      <MovieForm
        defaultValues={defaultValues}
        mode="edit"
        movieId={params.id}
      />
    </div>
  );
};

export default Page;
