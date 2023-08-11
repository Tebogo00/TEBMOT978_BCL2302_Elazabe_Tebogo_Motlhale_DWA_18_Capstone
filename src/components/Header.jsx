// Importing React and necessary components/modules
import React from 'react';
import '../App.css';
import SearchSort from './Searchsort';

// The Header functional component that displays the application header
const Header = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
  return (
    <header>
      <div className="logo"></div>
      <nav>

        {/* Rendering the SearchSort component */}
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
