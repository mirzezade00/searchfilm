import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Films from './Components/Films';
import List from './Components/List';
import './App.css'
const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [locked, setLocked] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [currentListName, setCurrentListName] = useState("List adı");

  const addToFavorites = (film) => {
    setFavorites((prev) =>
      prev.find((favorite) => favorite.imdbID === film.imdbID) ? prev : [...prev, film]
    );
  };

  const removeFromFavorites = (filmId) => {
    setFavorites(favorites.filter((film) => film.imdbID !== filmId));
  };

  const sendList = (listName) => {
    setLocked(true);
    setListVisible(true);
    setCurrentListName(listName);
  };

  return (
    <div className='App'>
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Films 
              addToFavorites={addToFavorites} 
              isLocked={locked} 
              favorites={favorites} 
            />
            <List 
              favorites={favorites} 
              isLocked={locked} 
              removeFromFavorites={removeFromFavorites} 
              sendList={sendList} 
            />

            {listVisible && (
              <Link to="/list">
                <button className='see-list-button'>Siyahıya bax</button>
              </Link>
            )}
          </>
        }
      />
      <Route 
        path='/list'
        element={<ListPage favorites={favorites} listName={currentListName} />}
      />
    </Routes>
    </div>
  );
};

const ListPage = ({ favorites, listName }) => {
  const redirectToIMDb = (imdbID) => {
    window.location.href = `https://www.imdb.com/title/${imdbID}/`;
  };

  return (
    <div className='list-page'>
      <h2>{listName}</h2>
      {favorites.map((film, i) => (
        <div key={i} className='favorite-item'>
          <img src={film.Poster} alt={film.Title} />
          <h3>{film.Title}</h3>
          <p className='film-year'>İl: {film.Year}</p>
          <button className='movie-details' onClick={() => redirectToIMDb(film.imdbID)}>
            Film Detallarına bax
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
