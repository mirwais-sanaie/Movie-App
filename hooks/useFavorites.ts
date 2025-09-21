import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { databases } from "@/configs/appwrite";
import { Favorite } from "@/types/type";
import { ID, Query } from "appwrite";

// Add Favorite
export function useAddFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      movieId,
      userEmail,
    }: {
      movieId: string;
      userEmail: string;
    }) => {
      const doc = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        ID.unique(),
        { movieId, userEmail }
      );
      return doc as unknown as Favorite;
    },
    onSuccess: (newDoc, variables) => {
      queryClient.setQueryData<Favorite[]>(
        ["favoritesMovies", variables.userEmail],
        (old = []) => [...old, newDoc]
      );
    },
  });
}

// Fetch Favorites
export function useFavorites(userEmail?: string) {
  return useQuery<Favorite[]>({
    queryKey: ["favoritesMovies", userEmail],
    queryFn: async () => {
      if (!userEmail) return [];
      const res = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        [Query.equal("userEmail", userEmail)]
      );
      return res.documents as unknown as Favorite[];
    },
    enabled: !!userEmail,
  });
}

// Remove Favorite
export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      docId,
      userEmail,
    }: {
      docId: string;
      userEmail: string;
    }) => {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
        docId
      );
      return { docId, userEmail };
    },
    onSuccess: ({ docId, userEmail }) => {
      queryClient.setQueryData<Favorite[]>(
        ["favoritesMovies", userEmail],
        (old = []) => old.filter((f) => f.$id !== docId)
      );
    },
  });
}
