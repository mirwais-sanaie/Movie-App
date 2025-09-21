"use client";

import Image from "next/image";
import { Star, ArrowLeft, Video, Link2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Genre, MovieCast } from "@/types/type";
import Link from "next/link";
import { FaHeart, FaImdb, FaRegCircleDot, FaSpinner } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useGetMovieDetail, useRecommendedMovies } from "@/hooks/useMovies";
import Spinner from "@/components/layout/Spinner";
import SmallSpinner from "@/components/layout/SmallSpinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TrailerModal from "@/components/layout/TrailerModal";
import type { Movie, MovieVideo } from "@/types/type";
import MovieCard from "@/components/layout/MovieCard";
import PageToggler from "@/components/layout/PageToggler";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "@/hooks/useFavorites";
import { useSession } from "next-auth/react";

export default function MovieDetail() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movieId = searchParams.get("id");
  const page = searchParams.get("page");

  const { data: movie, error, isLoading } = useGetMovieDetail(movieId || "");

  const { data: session } = useSession();

  const userEmail = session?.user?.email || "guest";

  const { data: favorites = [], isLoading: favLoading } =
    useFavorites(userEmail);
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: removing } = useRemoveFavorite();

  // check if this movie is already in favorites
  const favoriteDoc = favorites.find(
    (f) => f.movieId === movie?.id?.toString()
  );
  const isFavorite = !!favoriteDoc;

  const handleToggleFavorite = (movieId: string) => {
    if (!isFavorite) {
      addFavorite({
        movieId,
        userEmail: session?.user?.email || "guest",
      });
    } else if (favoriteDoc) {
      removeFavorite({ docId: favoriteDoc.$id, userEmail });
    }
  };

  const {
    recommendedMovies,
    isLoading: recLoading,
    error: recError,
  } = useRecommendedMovies(movieId || "", page || "1");

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error loading movie details.</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/ImageNotFound.png";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : "/ImageNotFound.png";

  const stars = (movie.vote_average / 10) * 5;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars - fullStars >= 0.5;

  const trailer = movie.videos?.results?.find(
    (v: MovieVideo) => v.type === "Trailer" && v.site === "YouTube"
  );
  const trailerKey = trailer?.key;

  function handlePersonDetail(personId: number) {
    router.push(`/person?id=${personId}&page=1`);
  }

  const handlePageChange = (newPage: number) => {
    router.push(`/movie/?id=${movieId}&page=${newPage}`);
  };

  const NAV_STACK_KEY = "app_nav_stack_v1";
  const handleBack = () => {
    try {
      const raw = sessionStorage.getItem(NAV_STACK_KEY);
      const stack: string[] = raw ? JSON.parse(raw) : [];

      if (stack.length >= 2) {
        // previous page is second-last entry
        const prev = stack[stack.length - 2];
        // remove the last entry (current page)
        stack.pop();
        // update storage
        sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(stack));
        router.push(prev);
      } else {
        // nothing in stack -> fallback home
        router.push("/");
      }
    } catch (e) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="min-h-screen text-foreground md:p-10 lg:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="relative w-full aspect-[2/3] text-center mx-auto">
            {loading && <SmallSpinner />}
            <Image
              src={posterUrl || backdropUrl}
              alt={movie.title}
              width={360}
              height={500}
              // fill
              className="object-cover"
              onLoadingComplete={() => setLoading(false)}
            />

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted/90 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-6">
            {/* Title & Tagline */}
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-3">
                {movie.title}
              </h1>
              <p className="text-muted-foreground mt-1 font-bold uppercase text-sm">
                {movie.tagline}
              </p>
            </div>

            {/* Rating + Runtime */}
            <div className="flex items-center justify-between gap-6 text-sm">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  if (i < fullStars) {
                    return (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-600 text-yellow-600"
                      />
                    );
                  } else if (i === fullStars && hasHalfStar) {
                    return (
                      <div key={i} className="relative w-4 h-4">
                        <Star className="absolute w-4 h-4 fill-yellow-600 text-yellow-600 [clip-path:inset(0_50%_0_0)]" />
                        <Star className="w-4 h-4 fill-gray-500 text-gray-500" />
                      </div>
                    );
                  } else {
                    return (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-gray-500 text-gray-500"
                      />
                    );
                  }
                })}
                <div className="text-yellow-600 text-[1rem] font-medium ml-1">
                  {movie.vote_average}
                </div>
              </div>
              <span className="text-yellow-600 font-medium text-[0.9rem]">
                <span className="uppercase ">{movie.original_language}</span> /{" "}
                {movie.runtime} MIN. / {movie.release_date.split("-")[0]}
              </span>
            </div>

            {/* Genres */}
            <ul className="flex flex-col">
              <h1 className="uppercase text-base mt-5">The Genres</h1>
              <div className="flex flex-wrap">
                {movie.genres?.map((genre: Genre) => (
                  <Button variant={"link"} className="p-0 me-4" key={genre.id}>
                    <Link
                      href={{
                        pathname: "/genre",
                        query: { id: genre.id, name: genre.name, page: 1 },
                      }}
                      className={`flex items-center gap-1 rounded-lg text-xs transition-colors`}
                    >
                      <FaRegCircleDot className="!w-3 !h-3" />
                      <span>{genre.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </ul>

            {/* Synopsis */}
            <div>
              <h1 className="uppercase text-base mb-2">The Synopsis</h1>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {movie.overview || "No details available."}
              </p>
            </div>

            {/* Cast */}
            <div>
              <h1 className="uppercase text-base mb-2">The Cast</h1>
              <div className="flex gap-3">
                {movie.credits.cast.slice(0, 5).map((actor: MovieCast) => (
                  <div
                    key={actor.id}
                    className="w-[60px] h-[60px] rounded-full overflow-hidden border border-border"
                  >
                    <Image
                      onClick={() => handlePersonDetail(actor.id)}
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                          : "/ImageNotFound.png"
                      }
                      alt={actor.name}
                      width={60}
                      height={60}
                      className="object-cover cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-between">
              <div className="space-x-1 lg:space-x-4 flex items-center ">
                {movie.homepage && (
                  <Link
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant={"outline"}
                      className="cursor-pointer lg:py-6 w-20 h-10 lg:w-auto"
                    >
                      Website
                      <Link2 className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Link
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size={"lg"}
                    variant={"outline"}
                    className="cursor-pointer lg:py-6 w-20 h-10 lg:w-auto"
                  >
                    IMDB
                    <FaImdb className="w-4 h-4" />
                  </Button>
                </Link>

                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="cursor-pointer lg:py-6 w-20 h-10 lg:w-auto mt-2 lg:mt-0"
                  onClick={() => setIsModalOpen(true)}
                >
                  Trailer
                  <Video className="w-4 h-4" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  title={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                  className="cursor-pointer lg:py-6 w-20 h-10 lg:w-auto mt-2 lg:mt-0"
                  onClick={
                    session?.user
                      ? () => handleToggleFavorite(movie.id.toString())
                      : () => setOpen(true)
                  }
                >
                  {isAdding || removing ? (
                    <FaSpinner className="animate-spin" />
                  ) : isFavorite ? (
                    <FaHeart color="red" className="w-4 h-4" />
                  ) : (
                    <Heart className="w-4 h-4 text-red-600" />
                  )}
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Login Required</DialogTitle>
                      <DialogDescription>
                        You need to login first to add movies to your favorites.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          setOpen(false);
                          window.location.href = "/login";
                        }}
                      >
                        Login
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <TrailerModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  trailerKey={trailerKey}
                />
              </div>
              <Button
                onClick={handleBack}
                className="bg-primary lg:py-6 w-20 h-10 lg:w-auto flex items-center cursor-pointer gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  mt-11 mb-5 lg:mt-0 lg:mb-0">
        <h1 className="flex flex-col uppercase">
          <span
            className="text-3xl
          "
          >
            Recommended
          </span>
          <span className="text-sm text-secondary-foreground mb-2">movies</span>
        </h1>

        <div
          className="
             lg:m-10
               grid
               gap-3  
               lg:gap-9         
               sm:gap-6
               grid-cols-2        
               sm:grid-cols-3
               md:grid-cols-4
                2xl:grid-cols-5
                3xl:grid-cols-6
             "
        >
          {recError && <div>Error loading recommended movies.</div>}
          {recLoading ? (
            <Spinner />
          ) : (
            recommendedMovies?.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>

        <PageToggler
          totalPages={0}
          page={Number(page)}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
