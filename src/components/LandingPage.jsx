import React, { useState, useEffect } from 'react';
import { MoviesFetch, fetchTrailer } from './MoviesAPI/APIdata.js';
import TrailerModal from './TrailerModal.jsx';
import './LandingPage.css';
import './Category.css';
import './Favorites.css';

const LandingPage = () => {
  
  const storedFavorites = JSON.parse(localStorage.getItem('setFavorites')) || [];
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState(storedFavorites);
  const [showFavorites, setShowFavorites] = useState(false);
  const [load, setLoad] = useState(1);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // loads more movies when user clicks the button  

  
  const PageLoader = () => {
    setLoad((prevLoad) => {
      console.log(`Incrementing load from ${prevLoad} to ${prevLoad + 1}`);
      return prevLoad + 1;
    });
  };
  
  //get movies

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovieData = await MoviesFetch(load); 
      setMovies((prevMovies) => {
        const prevMovieIds = new Set(prevMovies.map((movie) => movie.id));
        const uniqueNewMovies = newMovieData.filter((movie) => !prevMovieIds.has(movie.id));
        return [...prevMovies, ...uniqueNewMovies];
      });
    };
    fetchMovies();
  }, [load]);
  

  // change selected category filter
  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
  };

  // adds/removes a movie from favorites
  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === movie.id)
        ? prevFavorites.filter((fav) => fav.id !== movie.id)
        : [...prevFavorites, movie]
    );
  };

  // toggle visibility of the favorites window
  const toggleFavoritesWindow = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  // filters movies based on search term and selected category
  const filteredMovies = movies.filter((movie) => {
    const matchesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? movie.genre_ids.includes(selectedCategory) : true;
    return matchesSearchTerm && matchesCategory;
  });

  // update search term based on user input
  const inputHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  // shorten the description text if it's too long
  function descCut(overview, maxLength = 100) {
    if (overview.length > maxLength) {
      return overview.slice(0, maxLength) + '...';
    }
    return overview;
  }

  //trailer
  const handleWatchTrailer = async (movieId) => {
    const key = await fetchTrailer(movieId);
    if (key) {
      setTrailerKey(key);
      setIsModalOpen(true);
    } else {
      alert('Trailer not available');
    }
  };

  // Close the modal
  const closeModal = () => {
    setTrailerKey(null);
    setIsModalOpen(false);
  };




  // 
  return (
    <div>
      <div className="navbar">
        <div className="title">
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <h1>TMDB API</h1>
          </a>
        </div>
        <div className="favorites" onClick={toggleFavoritesWindow}>
          View Favorites
        </div>
        <input onChange={inputHandler} type="text" id="search-bar" placeholder="Search for movies here" />
      </div>

      {/* category buttons */}
      <div className="category-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
        </svg>
        <div className="container-seperator">
          <article className="cat-buttons">
            <button onClick={() => handleCategoryChange(28)}>Action</button>
            <button onClick={() => handleCategoryChange(12)}>Fantasy</button>
            <button onClick={() => handleCategoryChange(16)}>Animation</button>
            <button onClick={() => handleCategoryChange(35)}>Comedy</button>
            <button onClick={() => handleCategoryChange(80)}>Crime</button>
            <button onClick={() => handleCategoryChange(99)}>Documentary</button>
            <button onClick={() => handleCategoryChange(18)}>Drama</button>
            <button onClick={() => handleCategoryChange(10751)}>Family</button>
            <button onClick={() => handleCategoryChange(14)}>Fantasy</button>
            <button onClick={() => handleCategoryChange(36)}>History</button>
            <button onClick={() => handleCategoryChange(27)}>Horror</button>
            <button onClick={() => handleCategoryChange(10402)}>Music</button>
            <button onClick={() => handleCategoryChange(9648)}>Mystery</button>
            <button onClick={() => handleCategoryChange(10749)}>Romance</button>
            <button onClick={() => handleCategoryChange(878)}>Science Fiction</button>
            <button onClick={() => handleCategoryChange(10752)}>War</button>
            <button onClick={() => handleCategoryChange(53)}>Thriller</button>
            <button onClick={() => handleCategoryChange(37)}>Western</button>
          
          </article>
        </div>
      </div>

      {/* movie list */}
      <h1 className='top-title'>Most Watched Movies</h1>
      <p className='classic'>(Data taken from TMDB)</p>
      <ul>

        
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <img onClick={() => handleWatchTrailer(movie.id)} loading="lazy" width="502" height="752" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}  />
           

            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p className="desc">Overview: {descCut(movie.overview, 100)}</p>
            <button className="favorite-button" onClick={() => toggleFavorite(movie)}>
              {favorites.some((fav) => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>


      <button onClick={PageLoader}  className="LoadMoreBtn">Load more</button>
      {isModalOpen && <TrailerModal trailerKey={trailerKey} onClose={closeModal} />}


      {showFavorites && (
        <div className={`favorites-window ${showFavorites ? 'active' : ''}`}>
          <h2>Your Favorite Movies</h2>
          <ul>
            {favorites.length > 0 ? (
              favorites.map((movie) => (
                <li key={movie.id}>
                  <img onClick={() => handleWatchTrailer(movie.id)}  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  
                  <div>
                    <h3>{movie.title}</h3>
                    <button className="favorite-button" onClick={() => toggleFavorite(movie)}>
                      {favorites.some((fav) => fav.id === movie.id) ? 'Remove' : 'Add to Favorites'}
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>No favorites added.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
