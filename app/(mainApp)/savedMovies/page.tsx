import PageToggler from "@/components/layout/PageToggler";

function SavedMovies() {
  //   const router = useRouter();
  const handlePageChange = (newPage: number) => {
    // router.push(`/movie/?id=${movieId}&page=${newPage}`);
  };
  return (
    <div className="flex flex-col  mt-11 mb-5 lg:mt-0 lg:mb-0">
      <h1 className="flex flex-col uppercase">
        <span
          className="text-3xl
          "
        >
          Favorite Movies
        </span>
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
        {/* {recError && <div>Error loading recommended movies.</div>} */}
        {/* {recLoading ? (
            <Spinner />
          ) : (
            recommendedMovies?.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )} */}
      </div>

      {/* <PageToggler
        totalPages={0}
        page={Number(1)}
        handlePageChange={handlePageChange}
      /> */}
    </div>
  );
}

export default SavedMovies;
