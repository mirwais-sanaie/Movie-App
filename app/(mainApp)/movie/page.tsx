import type { Metadata } from "next";
import { getMovieDetail } from "@/lib/data-services";
import MovieDetail from "@/components/layout/MovieDetail";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const movieId = searchParams.id;

  if (!movieId) return { title: "Movie App" };

  try {
    const movie = await getMovieDetail(movieId);
    return { title: movie.title || "Movie App" };
  } catch {
    return { title: "Movie App" };
  }
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  return <MovieDetail searchParams={searchParams} />;
}
