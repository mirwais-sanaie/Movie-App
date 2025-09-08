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

export default MovieList;
