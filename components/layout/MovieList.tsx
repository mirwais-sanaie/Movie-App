import { Movie } from "@/types/type";
import MovieCard from "./MovieCard";

export interface MovieListProps {
  movies: Movie[] | null;
  discover: string;
}

function MovieList({ movies, discover }: MovieListProps) {
  return (
    <div className="flex flex-col">
      <h1 className="flex flex-col uppercase">
        <span className="text-3xl">{discover}</span>
        <span className="text-sm text-secondary-foreground">movies</span>
      </h1>

      <div
        className="
        lg:m-10
          grid
          gap-10               /* spacing between cards */
          sm:gap-6
          grid-cols-2          /* small screens */
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
