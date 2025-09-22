"use client";
import Link from "next/link";
import { Heart, Star, Calendar } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { FaRegCircleDot } from "react-icons/fa6";
import type { Genre } from "@/types/type";
import { useGenres } from "@/hooks/useGenres";
import SmallSpinner from "./SmallSpinner";
import { useSearchParams } from "next/navigation";
import { Sun, Moon, Bookmark } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/hooks/useFavorites";

const discoverLinks = [
  {
    name: "Popular",
    query: { category: "Popular", page: 1 },
    icon: <Heart className="w-4 h-4" />,
  },
  {
    name: "Top Rated",
    query: { category: "top_rated", page: 1 },
    icon: <Star className="w-4 h-4" />,
  },
  {
    name: "Upcoming",
    query: { category: "Upcoming", page: 1 },
    icon: <Calendar className="w-4 h-4" />,
  },
];

export default function Sidebar({
  closeSidebar,
}: {
  closeSidebar?: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useGenres();
  const genres = data?.genres ?? [];

  const genreName = searchParams?.get("name");
  const discoverName = searchParams?.get("category");

  const { data: session } = useSession();

  const userEmail = session?.user?.email || "guest";

  const { data: favorites = [] } = useFavorites(userEmail);

  return (
    <aside className="relative w-64 h-screen flex flex-col pb-12 overflow-auto lg:overflow-visible">
      {/* Logo */}
      <div className=" items-center justify-center h-20 hidden md:flex">
        <Link
          href={{
            pathname: "/",
            query: { category: "Popular", page: 1 },
          }}
          className="flex items-center gap-2"
          onClick={closeSidebar}
        >
          <Logo />
        </Link>
      </div>

      <div
        className="items-center gap-2 flex md:hidden ms-5 mt-2
      "
      >
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="data-[state=checked]:bg-primary py-2"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>

      <div title="Saved Movies" className="relative md:hidden ms-1 my-5 ">
        <Button variant={"link"}>
          <Link href={"/savedMovies"} className=" flex items-center space-x-1">
            <Bookmark className="cursor-pointer hover:opacity-55 duration-200" />
            {session?.user && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {favorites.length}
              </span>
            )}
            <p>Favorite movies</p>
          </Link>
        </Button>
      </div>

      {/* Discover & Genres */}
      <nav className="flex-1 px-4 py-3 text-sidebar-primary">
        {/* Discover */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-foreground">
            Discover
          </h3>
          <ul className="space-y-1">
            {discoverLinks.map((item) => (
              <Button
                variant={"link"}
                className={`list-none ${
                  discoverName === item.query.category
                    ? "text-destructive"
                    : "text-sidebar-primary"
                }`}
                key={item.name}
              >
                <Link
                  href={{
                    pathname: "/",
                    query: item.query,
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </ul>
        </div>

        {/* Genres */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2 text-foreground">Genres</h3>
          {isLoading ? (
            <SmallSpinner />
          ) : (
            <ul className="space-y-1 flex flex-col text-start">
              {genres?.map((genre: Genre) => (
                <Button
                  variant={"link"}
                  className={`${
                    genreName === genre.name
                      ? "text-destructive"
                      : "text-sidebar-primary"
                  } flex justify-start`}
                  key={genre.id}
                >
                  <Link
                    href={{
                      pathname: "/genre",
                      query: { id: genre.id, name: genre.name, page: 1 },
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors`}
                    onClick={closeSidebar}
                  >
                    <FaRegCircleDot className="!w-3 !h-3" />
                    <span>{genre.name}</span>
                  </Link>
                </Button>
              ))}
            </ul>
          )}
          {error && "Error while fetching genres"}
        </div>
      </nav>

      {/* Thin right “border” */}
      <div className="absolute top-0 right-0 h-full w-[0.1px] bg-gray-700" />
    </aside>
  );
}
