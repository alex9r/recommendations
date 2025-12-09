import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-5 relative">
        <img 
            src="/magnifyingGlass.png" 
            alt="search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"/>
        <input 
            type="text"
            placeholder='Search through thousands of movies'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full bg-light-100/5 rounded-lg py-2 pl-10 pr-4 text-base text-gray-200 placeholder-light-200 outline-none"
        />
    </div>
  )
}

export default Search