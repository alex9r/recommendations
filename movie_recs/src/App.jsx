import { useState, useEffect } from 'react'
import Search from './components/search.jsx'
import MovieCard from './components/movieCard.jsx';
import Spinner from './components/spinner.jsx'
//import { useDebounce } from 'react-use';


const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');       // search state
  const [errorMessage, setErrorMessage] = useState('');   // error state
  // state fields for the movies
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [deboundedSearchTerm, setDeboundedSearchTerm] = useDebounce('');

  // useDebounce(() => setDeboundedSearchTerm(searchTerm), 500, searchTerm); 

  const fetchIMDbId = async (movieId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}movie/${movieId}/external_ids`,
        API_OPTIONS
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch IMDb ID');
      }
      
      const data = await response.json();
      return data.imdb_id || null;
    } catch (error) {
      console.error(`Error fetching IMDb ID for movie ${movieId}:`, error);
      return null;
    }
  };

  // try to retrieve movie data
  const fetchMovies = async (query = '') => {

    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query 
      ? `${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error(`Failed to fetch movies`);
      }

      const data = await response.json();

      if(data.response == 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovies([]);
        return;
      }

      const moviesWithIMDb = await Promise.all((data.results || []).map(
        async (movie) => {
          const imdb_id = await fetchIMDbId(movie.id);
          return {...movie, imdb_id} 
        }
      ))
      setMovies(moviesWithIMDb);

      // if (query && data.results.length > 0) {
      //   await updateSearchCount(query, data.results[0]);
      // }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          {/* <img src="./hero.png" alt="hero banner"/> */}
          <h1>find enjoyable <span className="text-gradient"> movie recs </span>within seconds</h1>
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <section className="all-movies">
          <h2 className='mt-[40px]'>
            All Movies
          </h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}> 
                  <MovieCard movie={movie} />
                </li>
              ))}
            </ul>
          )
        }
        </section>
      </div>
    </main>
  )
}

export default App