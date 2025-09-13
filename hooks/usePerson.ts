import { getCastDetail } from "@/lib/data-services";
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
