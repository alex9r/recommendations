import React, { useState, useEffect } from 'react'
import Search from './components/search.jsx'


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application.json',
    Authorizations: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);


    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies. Please try again.`);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])
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
          <h2>
            All Movies
          </h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}

export default App