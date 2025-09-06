// app/components/MovieCard.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import img from "@/public/moviePng.jpg";

interface MovieCardProps {
  poster: string;
  title: string;
  rating: number; // out of 5
}

export default function MovieCard({ poster, title, rating }: MovieCardProps) {
  return (
    <Card className="w-[260px] bg-[#2a2a2a] border-none shadow-lg overflow-hidden rounded-xl">
      {/* Poster */}
      <div className="relative w-full h-[370px]">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <CardContent className="p-4 text-center">
        <h2 className="text-white text-sm font-medium">{title}</h2>

        {/* Rating */}
        <div className="flex items-center justify-center mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-500 text-gray-500"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
