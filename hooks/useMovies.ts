import {
  getMovieDetail,
  getMoviesByGenres,
  getMoviesPage,
  getRecommendedMovies,
  searchMovies,
} from "@/lib/data-services";
import { DiscoverResponse } from "@/types/type";
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
  return useQuery<DiscoverResponse>({
    queryKey: ["movies", "discover", discover, page],
    queryFn: () => getMoviesPage(discover, page),
  });
}

export function useGetMovieDetail(movieId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: !!movieId,
  });

  return { data, isLoading, error };
}

export function useRecommendedMovies(movieId: string, page: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", "recommendations", movieId, page],
    queryFn: () => getRecommendedMovies(movieId, page),
    enabled: !!movieId,
  });

  return {
    recommendedMovies: data?.results ?? [],
    totalPages: data?.total_pages ?? 1,
    isLoading,
    error,
  };
}

export function useMovies(query: string, page: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
  });

  return { data, isLoading, error };
}
