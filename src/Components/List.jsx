import React, { useState } from 'react';
import './List.css';

const List = ({ favorites, isLocked, removeFromFavorites, sendList }) => {
  
  const [listName, setListName] = useState('List adı');

  const handleChange = (e) => {
    if (!isLocked) {
      setListName(e.target.value);
    }
  };

  return (
    <div className='list-container'>
      <input 
        type='text'
        disabled={isLocked}
        value={listName}
        onChange={handleChange}
        className='list-input'
      />

      {favorites.length > 0 ? (
        favorites.map((film, i) => (
          <div key={i} className='favorite-item'>
            <img src={film.Poster} alt={film.Title} className='film-poster' />
            <h3 className='film-title'>{film.Title}</h3>
            <p className='film-year'>İl: {film.Year}</p>
            <button className='delete-button' onClick={() => removeFromFavorites(film.imdbID)} disabled={isLocked}>Sil</button>
          </div>
        ))
      ) : (
        <p>Siyahı boşdur.</p>
      )}
      <button onClick={() => sendList(listName)} disabled={isLocked} className='send-button'>Göndər</button>
    </div>
  );
};

export default List;
