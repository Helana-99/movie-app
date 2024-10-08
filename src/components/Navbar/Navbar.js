import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAfrica, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageContext from '../../context/languageContext';
import './Navbar.css';

function Navbar({ wishlistCount, onSearch }) {
  const [query, setQuery] = useState('');
  const {lang, toggleLanguage} = useContext (LanguageContext)

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
        <i className="fa-solid fa-film"></i> {lang === 'en' ? 'Movies' : 'الأفلام'}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <form className="d-flex w-50 justify-content-center" value={query} onChange={handleInputChange}>

          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <FontAwesomeIcon icon={faHeart} className="text-danger" />
                {wishlistCount > 0 && <span className="badge bg-danger ms-2">{wishlistCount}</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </Link>
            </li>
            <li className='nav-item' onClick={toggleLanguage} style={{cursor : 'pointer'}}>
              <span className='nav-link'>
                <FontAwesomeIcon icon={faEarthAfrica}/>
                {lang === 'en' ? 'English' : 'عربي'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
