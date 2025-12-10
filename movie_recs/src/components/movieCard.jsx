import React from 'react'

const MovieCard = ({movie: {id, title, vote_average, poster_path, release_date, original_language, imbd_id}}) => {
  return (
    <div className="movie-card">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/no-movie.svg`} 
            alt={title}
        />
        < div className="mt-4">
            <h3>{title}</h3>
            <a href={`https://www.imdb.com/title/${imbd_id}`}
            target="_blank"
            rel="noopener noreferrer"
            title="View on IMDb">
                🔗
            </a>
            <div className="content">
                <div className="rating">
                    <p>⭐️</p>
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>·</span>
                <p className="lang">{original_language}</p>
                <span>·</span>
                <p className="year">
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
        </div>
        <p key={id} className="text-white">{title}</p>

    </div>
  )
}

export default MovieCard