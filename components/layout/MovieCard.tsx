"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Movie } from "@/types/type";
import { useState } from "react";
import SmallSpinner from "./SmallSpinner";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { poster_path, title, backdrop_path, vote_average } = movie;
  const [loading, setLoading] = useState(true);

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/ImageNotFound.png";

  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
    : "/ImageNotFound.png";

  const stars = (vote_average / 10) * 5;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars - fullStars >= 0.5;

  return (
    <Card className="w-full hover:scale-[1.03] transition-transform rounded-none bg-muted border-none shadow-none overflow-hidden hover:bg-input duration-100 p-0">
      {/* Poster */}
      <div className="relative w-full aspect-[2/3]">
        {loading && <SmallSpinner />}
        <Image
          src={posterUrl || backdropUrl}
          alt={title}
          fill
          className="object-cover"
          onLoadingComplete={() => setLoading(false)}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted/90 to-transparent" />
      </div>

      {/* Content */}
      <CardContent className="px-3 py-2 pb-7 text-center border-none">
        <h2 className="text-sm font-medium line-clamp-1">{title}</h2>

        {/* Rating */}
        <div className="flex items-center justify-center mt-2">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
