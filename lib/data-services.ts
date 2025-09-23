import { ID, Query } from "appwrite";
import { databases } from "@/configs/appwrite";
import toast from "react-hot-toast";

export async function getGenres() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&language=en-US`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch genres");
    throw error;
  }
}

export async function getMoviesPage(discover: string, page: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${discover}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&language=en-US&page=${page}`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch movies");
    throw error;
  }
}

export async function getMoviesByGenres(page: string, genreId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&with_genres=${genreId}&page=${page}`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch movies by genre");
    throw error;
  }
}

export async function getMovieDetail(movieId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&append_to_response=credits,videos`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch movie details");
    throw error;
  }
}

export async function getCastDetail(castId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${castId}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch cast details");
    throw error;
  }
}

export async function getRecommendedMovies(movieId: string, page: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&page=${page}`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch recommended movies");
    throw error;
  }
}

export async function getPersonMovies(personId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_TMDB}`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to fetch person movies");
    throw error;
  }
}

export async function searchMovies(query: string, page: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&query=${query}&page=${page}`
    );
    return await res.json();
  } catch (error) {
    toast.error("Failed to search movies");
    throw error;
  }
}

// lib/data-services.ts

export async function addMovieToFavorites({
  movieId,
  userEmail,
}: {
  movieId: string;
  userEmail: string;
}) {
  try {
    return await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      { movieId, userEmail }
    );
  } catch (error) {
    toast.error("Failed to add movie to favorites");
    throw error;
  }
}

export async function getFavoriteMovieIdsByEmail(userEmail: string) {
  try {
    const res = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      [Query.equal("userEmail", userEmail)]
    );
    return res.documents.map((doc) => doc.movieId);
  } catch (error) {
    toast.error("Failed to fetch favorite movies");
    throw error;
  }
}

export async function getMoviesByIds(ids: number[]) {
  try {
    return await Promise.all(
      ids.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&language=en-US`
        ).then((res) => res.json())
      )
    );
  } catch (error) {
    toast.error("Failed to fetch movies by IDs");
    throw error;
  }
}
