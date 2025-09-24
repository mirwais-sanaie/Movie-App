"use client";

import MovieCard from "@/components/layout/MovieCard";
import PageToggler from "@/components/layout/PageToggler";
import SmallSpinner from "@/components/layout/SmallSpinner";
import Spinner from "@/components/layout/Spinner";
import { Button } from "@/components/ui/button";
import { usePerson, usePersonMovies } from "@/hooks/usePerson";
import { Movie } from "@/types/type";
import { ArrowLeft, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaImdb } from "react-icons/fa6";

function paginate<T>(array: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  return array.slice(start, start + perPage);
}

function Person() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const personId = searchParams.get("id");
  const page = searchParams.get("page") || "1";

  const { person, isLoading, error } = usePerson(personId || "");
  const {
    data,
    isLoading: entersLoading,
    error: entError,
  } = usePersonMovies(personId || "");

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const posterUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : "/ImageNotFound.png";

  function handlePageChange(newPage: number) {
    router.push(`/person?id=${personId}&page=${newPage}`);
  }

  // paginate cast movies
  const perPage = 20;
  const movies: Movie[] = data?.cast
    ? paginate(data.cast as Movie[], Number(page), perPage)
    : [];

  const totalPages = data?.cast ? Math.ceil(data.cast.length / perPage) : 1;

  return (
    <>
      <div className="min-h-screen text-foreground md:p-10 lg:mx-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="relative w-full aspect-[2/3] text-center mx-auto">
            {loading && <SmallSpinner />}
            <Image
              src={posterUrl}
              alt={person.name}
              width={360}
              height={500}
              // fill
              className="object-cover"
              onLoad={() => setLoading(false)}
            />

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted/90 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-6">
            {/* Title & Tagline */}
            <div>
              <h1 className="text-4xl font-bold mb-3">{person.name}</h1>
              <p className="text-muted-foreground mt-1 font-bold uppercase text-sm">
                {person.birthday}
                {person.deathday ? ` - ${person.deathday}` : ""}
              </p>
            </div>

            {/* Synopsis */}
            <div>
              <h1 className="uppercase text-base mb-2">The Biography</h1>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {person.biography || "No details available."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-between">
              <div className="space-x-2">
                {person.homepage && (
                  <Link
                    href={person.homepage}
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
                  href={`https://www.imdb.com/name/${person.imdb_id}`}
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
              </div>
              <Button
                size="lg"
                onClick={() => router.back()}
                className="bg-primary py-6 flex items-center cursor-pointer gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="flex flex-col uppercase  mt-11 mb-5 lg:mt-0 lg:mb-0">
          <span className="text-3xl">Also Enters in</span>
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
          {entError && <div>Error loading enters movies.</div>}
          {entersLoading ? (
            <Spinner />
          ) : (
            movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>

        <PageToggler
          page={Number(page)}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default Person;
