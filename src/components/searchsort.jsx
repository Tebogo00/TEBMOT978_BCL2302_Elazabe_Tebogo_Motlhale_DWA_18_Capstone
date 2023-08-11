// Importing useState hook from React
import { useState } from 'react';

// Mapping of genre IDs to genre titles
const genreTitleMapping = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

// The SearchSort functional component for handling search and sorting options
const SearchSort = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
  const [sortState, setSortState] = useState(sortBy); // State variable to track the current sorting state

  // Function to handle sorting based on selected criteria
  const sortShows = (criteria) => {
    setSortState(criteria); // Update the sorting state
    handleSortChange(criteria); // Call the provided sorting change handler
  };

  // Comparison function for sorting titles alphabetically
  const compareTitles = (a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    if (sortState === 'titleAZ') {
      return titleA.localeCompare(titleB);
    } else if (sortState === 'titleZA') {
      return titleB.localeCompare(titleA);
    }

    return 0;
  };

  // Comparison function for sorting dates
  const compareDates = (a, b) => {
    const dateA = new Date(a.dateUpdated);
    const dateB = new Date(b.dateUpdated);

    if (sortState === 'dateUpdatedAscending') {
      return dateA - dateB;
    } else if (sortState === 'dateUpdatedDescending') {
      return dateB - dateA;
    }

    return 0;
  };

  // Function to determine which comparison function to use based on the sorting criteria
  const sortFunction = (a, b) => {
    if (sortState.startsWith('title')) {
      return compareTitles(a, b);
    } else if (sortState.startsWith('date')) {
      return compareDates(a, b);
    }

    return 0;
  };

  // JSX for the SearchSort component
  return (
    <div className="search-sort-container">
      <input type="text" placeholder="Search shows" value={searchQuery} onChange={handleSearchChange} />
      <select value={sortBy} onChange={(e) => sortShows(e.target.value)}>
        <option value="default">
          Select an option
        </option>
        <option value="titleAZ">Title A-Z</option>
        <option value="titleZA">Title Z-A</option>
        <option value="dateUpdatedAscending">Date Updated (Ascending)</option>
        <option value="dateUpdatedDescending">Date Updated (Descending)</option>
      </select>
    </div>
  );
};

export default SearchSort;