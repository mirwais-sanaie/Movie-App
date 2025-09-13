export async function getGenres() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&language=en-US`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMoviesPage(discover: string, page: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${discover}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&language=en-US&page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMoviesByGenres(page: string, genreId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&with_genres=${genreId}&page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMovieDetail(movieId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&append_to_response=credits,videos
`
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCastDetail(castId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${castId}?api_key=${process.env.NEXT_PUBLIC_API_TMDB}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecommendedMovies(movieId: string, page: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_TMDB}&page=${page}`
    );
    const data = await res.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

export async function getPersonMovies(personId: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_TMDB}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
