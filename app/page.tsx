"use client";
import MovieCard from "@/components/layout/MovieCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/?category=Popular&page=1");
  }, [router]);
  return (
    <div>
      <MovieCard
        poster="/war-of-the-worlds.png" // place your image in /public folder
        title="War of the Worlds"
        rating={2} // 2 out of 5 stars
      />
    </div>
  );
}
