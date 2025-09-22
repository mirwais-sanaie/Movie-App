"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Sun, Moon, LogIn, Bookmark, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useFavorites } from "@/hooks/useFavorites";
import { signOutAction } from "@/lib/actions";

export default function HeaderRight() {
  const { theme, setTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const userEmail = session?.user?.email || "guest";

  const { data: favorites = [], isLoading: favLoading } =
    useFavorites(userEmail);

  const isDark = theme === "dark";

  // Close search input when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/search?searchTerm=${query}&page=1`);
  }

  return (
    <div className="flex items-center gap-4">
      {/* Search Toggle */}
      <form onSubmit={handleSubmit}>
        {showSearch ? (
          <div
            ref={searchRef}
            className="flex items-center bg-primary rounded-full px-3 py-1"
          >
            <Search className="h-4 w-4 text-primary-foreground mr-2" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="
    flex-1 
     !bg-transparent 
    border-none h-8 shadow-none 
    focus-visible:ring-0 
    text-primary-foreground 
    placeholder:text-primary-foreground/70
  "
            />
          </div>
        ) : (
          <Button
            className="rounded-full w-11 h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
      </form>

      <div title="Saved Movies" className="relative hidden md:flex">
        <Link href={"/savedMovies"}>
          <Bookmark className="cursor-pointer hover:opacity-55 duration-200" />
          {session?.user && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>

      {/* Theme Toggle */}
      <div className="items-center gap-2 hidden md:flex">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="data-[state=checked]:bg-primary py-2"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Logout */}
      {session?.user ? (
        <>
          <div className="flex items-center space-x-2">
            <Image
              width={30}
              height={30}
              src={session?.user.image || ""}
              alt={session?.user.name || "User Avatar"}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm mr-2">{session.user.name}</span>
          </div>
          <form action={signOutAction}>
            <Button
              size="icon"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
        </>
      ) : (
        <Button
          size="icon"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10 rounded-lg"
        >
          <Link href="/login">
            <LogIn className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </div>
  );
}
