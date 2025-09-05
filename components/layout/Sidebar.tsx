import Link from "next/link";
import { Heart, Star, Calendar } from "lucide-react";

const discoverLinks = [
  {
    name: "Popular",
    href: "/discover/popular",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    name: "Top Rated",
    href: "/discover/top-rated",
    icon: <Star className="w-4 h-4" />,
  },
  {
    name: "Upcoming",
    href: "/discover/upcoming",
    icon: <Calendar className="w-4 h-4" />,
  },
];

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-bold">
            🎟️
          </div>
          <span className="text-lg font-semibold">Movie App</span>
        </div>
      </div>

      {/* Discover Section */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Discover</h3>
          <ul className="space-y-2">
            {discoverLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Genres Section */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Genres</h3>
          <ul className="space-y-2">
            {genres.map((genre) => (
              <li key={genre}>
                <Link
                  href={`/genre/${genre.toLowerCase()}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
