"use client";
import MovieCard from "@/components/layout/MovieCard";
import PageToggler from "@/components/layout/PageToggler";
import Spinner from "@/components/layout/Spinner";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function SearchedMovie() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") || "1";
  const searchTerm = searchParams.get("searchTerm") || "";
  const { data, isLoading, error } = useMovies(searchTerm, page);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error fetching data</div>;

  const movies = data?.results || [];

  const handlePageChange = (newPage: number) => {
    router.push(`/search?searchTerm=${searchTerm}&page=${newPage}`);
  };

  console.log(data);
  return (
    <div className="flex flex-col  mt-11 mb-5 lg:mt-0 lg:mb-0">
      <h1 className="flex flex-col uppercase">
        <span className="text-3xl">{searchTerm}</span>
        <span className="text-sm text-secondary-foreground mb-2">movies</span>
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
                2xl:grid-cols-5
                3xl:grid-cols-6
             "
      >
        {error && <div>Error loading recommended movies.</div>}
        {isLoading ? (
          <Spinner />
        ) : (
          movies?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>

      <PageToggler
        totalPages={0}
        page={Number(page)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default SearchedMovie;
