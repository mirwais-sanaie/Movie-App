"use client";

import Image from "next/image";
import { Star, ArrowLeft, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Genre } from "@/types/type";
import Link from "next/link";
import { FaImdb, FaRegCircleDot } from "react-icons/fa6";
import movieImg from "@/public/moviePng.jpg";

export default function MovieDetail() {
  const movie = {
    title: "STOCKHOLM BLOODBATH",
    tagline: "OLD GRUDGES NEVER DIE.",
    rating: 6.3,
    runtime: 145,
    year: 2024,
    language: "ENGLISH",
    poster: "/stockholm.jpg", // replace with TMDB poster
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
    ],
    synopsis: `In 1520, the notorious and power-hungry Danish King Christian II is determined to seize the Swedish crown...`,
    cast: [
      { id: 1, img: "/actors/a1.jpg" },
      { id: 2, img: "/actors/a2.jpg" },
      { id: 3, img: "/actors/a3.jpg" },
      { id: 4, img: "/actors/a4.jpg" },
    ],
  };

  const vote_average = 6.3;
  const stars = (vote_average / 10) * 5;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars - fullStars >= 0.5;
  return (
    <div className="min-h-screen text-foreground p-6 md:p-10 lg:mx-10">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        {/* Poster */}
        <div className="relative w-full aspect-[2/3]">
          {/* {loading && <SmallSpinner />} */}
          <Image
            src={movieImg}
            alt={movie.title}
            width={360}
            height={500}
            // fill
            className="object-cover"
            // onLoadingComplete={() => setLoading(false)}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-col space-y-6">
          {/* Title & Tagline */}
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-muted-foreground mt-1">{movie.tagline}</p>
          </div>

          {/* Rating + Runtime */}
          <div className="flex items-center justify-between gap-6 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                if (i < fullStars) {
                  return (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  );
                } else if (i === fullStars && hasHalfStar) {
                  return (
                    <div key={i} className="relative w-4 h-4">
                      <Star className="absolute w-4 h-4 fill-yellow-400 text-yellow-400 [clip-path:inset(0_50%_0_0)]" />
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
              <div>{vote_average}</div>
            </div>
            <span className="text-yellow-400 font-medium">
              {movie.language} / {movie.runtime} MIN. / {movie.year}
            </span>
          </div>

          {/* Genres */}
          <ul className="flex flex-wrap  ">
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
          </ul>

          {/* Synopsis */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">
              {movie.synopsis}
            </p>
          </div>

          {/* Cast */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Cast</h2>
            <div className="flex gap-3">
              {movie.cast.map((actor) => (
                <Image
                  key={actor.id}
                  src={actor.img}
                  alt="Actor"
                  width={60}
                  height={60}
                  className="rounded-full border border-border object-cover"
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-between">
            <div className="space-x-4">
              <Button
                size={"lg"}
                variant={"outline"}
                className="cursor-pointer py-6"
              >
                IMDB
                <FaImdb className="w-4 h-4" />
              </Button>
              <Button
                size={"lg"}
                variant={"outline"}
                className="cursor-pointer py-6"
              >
                Trailer
                <Video className="w-4 h-4" />
              </Button>
            </div>
            <Button
              size={"lg"}
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
