import React from 'react';
import '../static/search.css'

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="search-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-5.2-5.2"
    />
    <circle cx="10" cy="10" r="8" />
  </svg>
);

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        className="search-input border-b-2"
        type="text"
        placeholder="Search..."
        aria-label="Search"
      />
      <div className="search-icon-container">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
