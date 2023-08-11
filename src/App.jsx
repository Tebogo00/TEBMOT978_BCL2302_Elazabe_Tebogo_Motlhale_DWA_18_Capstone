// Importing necessary modules and components from various files.
import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Grid from '@mui/material/Grid';
import Header from "./components/Header";
import Lebase from './components/Lebase';
import { supabase } from './components/Lebase';
import Seasons from './components/Seasons';
import Carousel from './components/Carousel';
import CircularProgress from '@mui/material/CircularProgress';

// Mapping of genre IDs to genre names.
const genreMapping = {
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

// The main function component of the React app.
function App() {
  const [showPreviews, setShowPreviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showEpisodes, setShowEpisodes] = useState([])
  const [theSeason, setTheSeason] = useState(null)
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')
  const [loading, setLoading] = useState(true);
  const [showss, setShowss] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');

  // useEffect hook to handle user authentication changes using Supabase.
  React.useEffect(() => {
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.email);
        setThrowSignUp('PreviewPhase')
      }
    });
    return () => {
      authListener.unsubscribe; // Cleanup function to unsubscribe from the listener.
    };
  }, []);

  // Function to handle changes in the search query input field.
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle changes in the sorting criteria.
  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    let sortedShows = [...showPreviews];
    // Sorting the shows based on the selected criteria.
    switch (criteria) {
      case 'titleAZ':
        sortedShows.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleZA':
        sortedShows.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateUpdatedAscending':
        sortedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case 'dateUpdatedDescending':
        sortedShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      default:
        break;
    }

    setShowPreviews(sortedShows);
    setShowss(sortedShows);
  };

  // Function to set the currently selected season.
  function ApiId(id) {
    setTheSeason(id)
    // setShowPreviews(null)
    document.querySelector('.card-list').style.display = 'none'
  }

  // useEffect hook to fetch data from an API endpoint when the component mounts.
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {

      fetch(`https://podcast-api.netlify.app/shows`)
        .then((response) => response.json())
        .then((data) => {
          setShowPreviews(data);
          setLoading(false);
        });
    }, 2000);
  }, []);


  if (showEpisodes) console.log(showEpisodes)

  // Filtering the list of shows based on the selected genre.
  const genreFilteredFeature = selectedGenre
    ? showPreviews.filter((datamapping) =>
      datamapping.props.genres.includes(genreMapping[selectedGenre])
    )
    : showPreviews;

  // Filter the shows based on the search query
  const filteredShows = showPreviews.filter((show) =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Rendering loading screen while data is being fetched.
  if (loading) {
    return (

      <div className="loading-container">
        <CircularProgress size={60} />
        <h2 className='text-color'>Loading...</h2>
      </div>
    );
  }

  function handleChange(id) {
    setSelectedGenre(id)
  }

  return (

    <>
      {/* Conditional rendering based on the sign-up phase */}
      {throwSignUp === 'signUpPhase' && <Lebase />}
      {throwSignUp === 'PreviewPhase' &&
        <>
          {/* Display the Header component with search and sort functionality */}
          <Header
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            sortBy={sortBy}
            handleSortChange={handleSortChange}
          />

          <Carousel />

          <div className="Card-Box">
            <h3>Filter by Genre:</h3>
            {Object.entries(genreMapping).map(([genreId, genreTitle]) => (
              /* Genre filter button */
              <button
                key={genreId}
                onClick={() => handleChange(genreId)}
                style={{
                  backgroundColor:
                    selectedGenre === parseInt(genreId) ? 'blue' : 'lightblue',
                  color: selectedGenre === parseInt(genreId) ? 'white' : 'black',
                  border: '1px solid blue',
                  padding: '5px',
                  margin: '2px',
                  cursor: 'pointer',
                }}
              >
                {genreTitle}
              </button>
            ))}
          </div>

          {/* Grid container for displaying the list of filtered shows */}
          <Grid container spacing={4} className='card-list'>

            {/* Map through filteredShows and render Card components */}
            {filteredShows.map((datamapping) => (
              <Card
                key={datamapping.id}
                titles={datamapping.title}
                descriptions={datamapping.description}
                seasons={datamapping.seasons}
                genres={datamapping.genres.map((genresID) => genreMapping[genresID])}
                images={datamapping.image}
                updated={datamapping.updated}
                click={() => ApiId(datamapping.id)}
              />
            ))}

          </Grid>

          {/* Button to navigate back to shows */}
          <button onClick={() => window.location.href = 'http://localhost:5174/'} className='backbutton'>Back to Shows</button>
        </>
      }

      <>
        <Seasons
          id={theSeason}
        />

      </>
    </>

  );
}

export default App;