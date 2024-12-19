import React, { useState, useEffect } from 'react';
import './Films.css';

const Films = ({ addToFavorites, isLocked, favorites }) => {
  const [filmsData, setFilmsData] = useState([]); 
  const [query, setQuery] = useState(''); 

  useEffect(() => {
    fetchFilms('phineas');
  }, []);

  const fetchFilms = (searchTerm) => {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=fe5e5cd9`)
      .then((res) => res.json())
      .then((data) => {
        setFilmsData(data.Search ? data.Search.slice(0, 10) : []);
      });
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchFilms(query);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);

    if (e.target.value.trim() === "") {
      fetchFilms('phineas');
    }
  };

  return (
    <div className='films-container'>
      <div className='films-search-bar'>
        <input 
          type='text'
          placeholder='Axtarış'
          value={query}
          onChange={handleChange}
        />
        <button onClick={handleSearch} disabled={!query.trim()}>
          Axtar
        </button>
      </div>
      {filmsData.length > 0 ? (
        filmsData.map((film, i) => (
          <div key={i} className='film-item'>
            <img src={film.Poster} alt={film.Title} className='film-poster' />
            <h3 className='film-title'>{film.Title}</h3>
            <p className='film-year'>İl:{film.Year}</p>
            <button
              onClick={() => addToFavorites(film)}
              disabled={isLocked || favorites.some((fav) => fav.imdbID === film.imdbID)}
            >
              {favorites.some((fav) => fav.imdbID === film.imdbID) ? "Əlavə olundu" : "Əlavə et"}
            </button>
          </div>
        ))
      ) : (
        <p>Film tapılmadı</p>
      )}
    </div>
  );
};

export default Films;
