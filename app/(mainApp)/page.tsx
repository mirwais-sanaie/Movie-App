"use client";

import MovieList from "@/components/layout/MovieList";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetMoviesByDiscover } from "@/hooks/useMovies";
import Spinner from "@/components/layout/Spinner";

import PageToggler from "@/components/layout/PageToggler";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const discover = (
    searchParams.get("category") || "Popular"
  ).toLocaleLowerCase();
  const page = Number(searchParams.get("page") || "1");

  // Redirect if missing params
  useEffect(() => {
    if (!searchParams.get("category") || !searchParams.get("page")) {
      router.replace("/?category=Popular&page=1");
    }
  }, [router, searchParams]);

  // React Query
  const { data, isLoading, isError } = useGetMoviesByDiscover(
    discover,
    String(page)
  );

  if (isLoading) return <Spinner />;
  if (isError) return <p>Something went wrong!</p>;

  const handlePageChange = (newPage: number) => {
    router.push(`/?category=${discover}&page=${newPage}`);
  };

  return (
    <div>
      <MovieList discover={discover} movies={data?.results || []} />

      <PageToggler
        totalPages={0}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
