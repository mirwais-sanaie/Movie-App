"use client";
import MovieList from "@/components/layout/MovieList";
import { getMoviesPage } from "@/lib/data-services";
import { Movie } from "@/types/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[] | null>(null);

  const discover = (
    searchParams.get("category") || "Popular"
  ).toLocaleLowerCase();
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (!searchParams.get("category") || !searchParams.get("page")) {
      router.replace("/?category=Popular&page=1");
    }
  }, [router, searchParams]);

  useEffect(() => {
    async function getMovies() {
      const result = await getMoviesPage(discover, page);
      console.log(result.results);
      setMovies(result.results);
    }
    getMovies();
  }, [discover, page]);

  console.log(movies);

  return <MovieList discover={discover} movies={movies} />;
}
