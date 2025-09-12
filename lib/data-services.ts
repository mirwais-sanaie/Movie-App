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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
/*
🔹 Popular Movies
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1

🔹 Search Movies
https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=batman


🔹 Movie Details (by ID)
https://api.themoviedb.org/3/movie/{movie_id}?api_key=YOUR_API_KEY&language=en-US

⚡️ Bonus: If you want images & trailers, you can use:

Movie Images:

https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=YOUR_API_KEY


Movie Videos (trailers, teasers):

https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=YOUR_API_KEY&language=en-US
*/
