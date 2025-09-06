import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import img from "@/public/moviePng.jpg";

interface MovieCardProps {
  poster: string;
  title: string;
  rating: number;
}

export default function MovieCard({ poster, title, rating }: MovieCardProps) {
  return (
    <Card className="w-[240px] rounded-none bg-muted border-none shadow-none overflow-hidden hover:bg-input hover:scale-103 duration-100 p-0">
      {/* Poster */}
      <div className="relative w-full h-[350px]">
        <Image src={img} alt={title} fill className="object-cover" />

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted/90 to-transparent" />
      </div>

      {/* Content */}
      <CardContent className="px-4 py-2 text-center border-none">
        <h2 className="text-sm font-medium">{title}</h2>

        {/* Rating */}
        <div className="flex items-center justify-center mt-4 pb-6">
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
