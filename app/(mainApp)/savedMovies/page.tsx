import MovieCard from "@/components/layout/MovieCard";
import { auth } from "@/lib/auth";
import {
  getFavoriteMovieIdsByEmail,
  getMoviesByIds,
} from "@/lib/data-services";
import { Movie } from "@/types/type";

async function SavedMovies() {
  const session = await auth();
  const movieIds = await getFavoriteMovieIdsByEmail(
    session?.user?.email || "guest"
  );
  const movies = await getMoviesByIds(movieIds || []);
  return (
    <div className="flex flex-col  mt-11 mb-5 lg:mt-0 lg:mb-0">
      <h1 className="flex flex-col uppercase">
        <span
          className="text-3xl
          "
        >
          Favorite Movies
        </span>
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
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {movies.length === 0 && (
        <div className="text-center">
          <h2 className="text-xl text-muted-foreground">
            No favorite movies found.
          </h2>
        </div>
      )}
    </div>
  );
}

export default SavedMovies;
