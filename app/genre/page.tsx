"use client";

import MovieCard from "@/components/layout/MovieCard";
import { getMoviesByGenres } from "@/lib/data-services";
import { Movie } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Genre() {
  const [movies, setMovies] = useState<Movie[] | null>(null);

  const searchParams = useSearchParams();
  const discover = (
    searchParams.get("category") || "Popular"
  ).toLocaleLowerCase();
  const page = searchParams.get("page") || "1";
  const genreId = searchParams.get("id") || "null";
  const genreName = searchParams.get("name");

  useEffect(() => {
    async function getMovies() {
      const result = await getMoviesByGenres(page, genreId);
      setMovies(result.results);
    }
    getMovies();
  }, [discover, page, genreId]);

  return (
    <div>
      <h1 className="flex flex-col uppercase">
        <span className="text-3xl">{genreName}</span>
        <span className="text-sm text-secondary-foreground">movies</span>
      </h1>

      <div
        className="
                m-3
                mx-auto
                lg:m-10 
                grid gap-14 
                [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]
              "
      >
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Genre;
