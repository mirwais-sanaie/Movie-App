import MovieCard from "@/components/layout/MovieCard";

export default function Home() {
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
