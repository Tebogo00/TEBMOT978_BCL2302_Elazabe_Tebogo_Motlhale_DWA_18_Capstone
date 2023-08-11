import React from 'react';

// The ShowMoreButton functional component
const ShowMoreButton = ({ onClick }) => {

  return (
    // Button element that triggers the provided onClick function when clicked
    <button onClick={onClick} className="show-more-button">
      Show more
    </button>
  );
};
export default ShowMoreButton;