import { getCastDetail, getPersonMovies } from "@/lib/data-services";
import { useQuery } from "@tanstack/react-query";

export function usePerson(personId: string) {
  const {
    data: person,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["person", personId],
    queryFn: () => getCastDetail(personId),
    enabled: !!personId,
  });

  return { person, isLoading, error };
}

export function usePersonMovies(personId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["person", "movies", personId],
    queryFn: () => getPersonMovies(personId),
    enabled: !!personId,
  });

  return { data, isLoading, error };
}
