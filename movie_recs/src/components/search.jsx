import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <img src="search.svg" alt="search" />

        <input 
            type="text"
            placeholder='Search through thousands of movies'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
        />
    </div>
  )
}

export default search