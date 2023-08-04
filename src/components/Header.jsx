//Header.jsx

import React from 'react';
import '../App.css';
import SearchSort from './searchsort';

const Header = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
  return (
    <header>
      <div className="logo"></div>
      <nav>
        <SearchSort
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />

      </nav>
    </header>
  );
};

export default Header;
