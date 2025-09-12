"use client";

import Image from "next/image";
import { Star, ArrowLeft, Video, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Genre, MovieCast } from "@/types/type";
import Link from "next/link";
import { FaImdb, FaRegCircleDot } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useGetMovieDetail } from "@/hooks/useMovies";
import Spinner from "@/components/layout/Spinner";
import SmallSpinner from "@/components/layout/SmallSpinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TrailerModal from "@/components/layout/TrailerModal";
import type { MovieVideo } from "@/types/type";

export default function MovieDetail() {
  // const movie = {
  //   title: "STOCKHOLM BLOODBATH",
  //   tagline: "OLD GRUDGES NEVER DIE.",
  //   rating: 6.3,
  //   runtime: 145,
  //   year: 2024,
  //   language: "ENGLISH",
  //   poster: "/stockholm.jpg", // replace with TMDB poster
  //   genres: [
  //     { id: 28, name: "Action" },
  //     { id: 12, name: "Adventure" },
  //     { id: 16, name: "Animation" },
  //     { id: 35, name: "Comedy" },
  //     { id: 80, name: "Crime" },
  //   ],
  //   synopsis: `In 1520, the notorious and power-hungry Danish King Christian II is determined to seize the Swedish crown...`,
  //   cast: [
  //     { id: 1, img: "/actors/a1.jpg" },
  //     { id: 2, img: "/actors/a2.jpg" },
  //     { id: 3, img: "/actors/a3.jpg" },
  //     { id: 4, img: "/actors/a4.jpg" },
  //   ],
  // };

  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movieId = searchParams.get("id");
  const page = searchParams.get("page");

  const { data: movie, error, isLoading } = useGetMovieDetail(movieId || "");

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

  console.log(movie.videos);

  const trailer = movie.videos?.results?.find(
    (v: MovieVideo) => v.type === "Trailer" && v.site === "YouTube"
  );
  const trailerKey = trailer?.key;

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
            <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
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
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : "/ImageNotFound.png"
                    }
                    alt={actor.name}
                    width={60}
                    height={60}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-between">
            <div className="space-x-2">
              {movie.homepage && (
                <Link
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size={"lg"}
                    variant={"outline"}
                    className="cursor-pointer py-6"
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
                  className="cursor-pointer py-6"
                >
                  IMDB
                  <FaImdb className="w-4 h-4" />
                </Button>
              </Link>

              <Button
                size={"lg"}
                variant={"outline"}
                className="cursor-pointer py-6"
                onClick={() => setIsModalOpen(true)}
              >
                Trailer
                <Video className="w-4 h-4" />
              </Button>

              <TrailerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                trailerKey={trailerKey}
              />
            </div>
            <Button
              size={"lg"}
              onClick={handleBack}
              className="bg-primary py-6 flex items-center cursor-pointer gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
