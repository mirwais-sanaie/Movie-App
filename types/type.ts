export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieCast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null; // TMDB sometimes returns null
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null; // can be null if no image
};

export type MovieVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string; // YouTube video key
  name: string;
  site: string; // e.g. "YouTube"
  size: number;
  type: string; // e.g. "Trailer", "Teaser"
  official: boolean;
  published_at: string;
};
