import { getMoviesByGenres, getMoviesPage } from "@/lib/data-services";
import { Movie } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export function useGetMoviesByGenre(page: string, genreId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", "genre", genreId, page],
    queryFn: () => getMoviesByGenres(page, genreId),
    enabled: !!genreId,
  });

  return { data, isLoading, error };
}

export function useGetMoviesByDiscover(discover: string, page: string) {
  return useQuery<{ results: Movie[] }>({
    queryKey: ["movies", "discover", discover, page],
    queryFn: () => getMoviesPage(discover, page),
  });
}
