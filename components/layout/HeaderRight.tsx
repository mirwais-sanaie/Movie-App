"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Sun, Moon, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeaderRight() {
  const { theme, setTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
    setQuery("");
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

      {/* Theme Toggle */}
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="data-[state=checked]:bg-primary py-2"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Logout */}
      <Button
        size="icon"
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10 rounded-lg"
      >
        <Link href="/login">
          <LogIn className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
