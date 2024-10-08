import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import Wishlist from './components/WishList/Wishlist';
import LoginPage from './Pages/Login/LoginPage';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { LanguageProvider } from './context/languageContext';
import './App.css';

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleFavoriteToggle = (movie) => {
    if (wishlist.find(m => m.id === movie.id)) {
      setWishlist(wishlist.filter(m => m.id !== movie.id));
    } else {
      setWishlist([...wishlist, movie]);
    }
  };

  return (
    <LanguageProvider>
      <div className="App">
        <Navbar wishlistCount={wishlist.length} onSearch={setSearchQuery} />
        <div className="container mt-5">
          <Routes>
            <Route 
              path="/" 
              element={<MovieList onFavoriteToggle={handleFavoriteToggle} searchQuery={searchQuery} />} 
            />
            <Route 
              path="/wishlist" 
              element={<Wishlist wishlist={wishlist} onFavoriteToggle={handleFavoriteToggle} />} 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/collection/:movieId" element={<MovieDetails />} />
          </Routes>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
