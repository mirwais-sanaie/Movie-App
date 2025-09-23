"use client";

import MovieCard from "@/components/layout/MovieCard";
import { useSearchParams } from "next/navigation";
import { useGetMoviesByGenre } from "@/hooks/useMovies";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/type";
import Spinner from "@/components/layout/Spinner";
import PageToggler from "@/components/layout/PageToggler";

function Genre() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const genreId = searchParams.get("id") || "null";
  const genreName = searchParams.get("name");
  const router = useRouter();

  const { data, isLoading, error } = useGetMoviesByGenre(String(page), genreId);

  const handlePageChange = (newPage: number) => {
    router.push(`/genre/?id=${genreId}&name=${genreName}&page=${newPage}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div className="flex flex-col">
      <h1 className="flex flex-col uppercase">
        <span className="text-3xl">{genreName}</span>
        <span className="text-sm text-secondary-foreground mb-5 lg:mb-0">
          movies
        </span>
      </h1>

      <div
        className="
           lg:m-10
          grid
          gap-3  
          lg:gap-9           
          sm:gap-6
          grid-cols-2         
          sm:grid-cols-3
          md:grid-cols-4
          2xl:grid-cols-7
        "
      >
        {data?.results?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <PageToggler
        totalPages={data?.total_pages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Genre;
