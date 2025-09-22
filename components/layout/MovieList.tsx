import { Movie } from "@/types/type";
import MovieCard from "./MovieCard";

export interface MovieListProps {
  movies: Movie[] | null;
  discover: string;
}

function MovieList({ movies, discover = "None" }: MovieListProps) {
  return (
    <div className="flex flex-col">
      <h1 className="flex flex-col uppercase">
        <span className="text-3xl">{discover}</span>
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
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
