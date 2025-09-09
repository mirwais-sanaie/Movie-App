import { getGenres } from "@/lib/data-services";
import { useQuery } from "@tanstack/react-query";

export function useGenres() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  return {
    data,
    isLoading,
    error,
  };
}
