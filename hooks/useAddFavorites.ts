import { addMovieToFavorites } from "@/lib/data-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddFavorites() {
  const queryClient = useQueryClient();
  const {
    mutate: addToFavorites,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["favoritesMovies"],
    mutationFn: addMovieToFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritesMovies"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { addToFavorites, isPending, error };
}
