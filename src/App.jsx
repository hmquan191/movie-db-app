import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    // what kind of data is accepted
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // initial is blank string

  const [errorMessage, setErrorMessage] = useState(""); // initial blank string

  const [movieList, setMovieList] = useState([]); // initial blank array

  const [trendingMovies, setTrendingMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // initial status is false;

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // debounce the search term to preven making too many API request
  // waiting for the user to stop typing for 500ms
  // optimize search solution
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true); // start the countdown
    setErrorMessage("");

    try {
      // neu co query trong search thi dung cai dau tien, cai thu hai la mac dinh
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      // if the reponse is not right
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      // if okay
      const data = await response.json();
      console.log("The data", data);

      if (data.Response == "False") {
        setErrorMessage(data.Error || `Failed to fetch movies`);
        setMovieList([]); // set the movie list to blank
        return;
      }

      // if success set movie list
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
    } finally {
      // no matter what happens
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching trending movies ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]); // whenever it changes, fetch movies will be called

  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="hero banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Watching
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt="movie.title" />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {/* call the array by using map */}
                {movieList.map((movie) => (
                  // remember to give each one an id so that it wont get confusing
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
