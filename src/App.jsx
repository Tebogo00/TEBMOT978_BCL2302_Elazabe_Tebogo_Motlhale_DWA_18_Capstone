import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Grid from '@mui/material/Grid';
import Header from "./components/Header";

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

function App() {
  const [showPreviews, setShowPreviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showEpisodes, setShowEpisodes] = useState([])
  // const [showMore, setShowMore] = useState(false);
  // const [numCardsToShow, setNumCardsToShow] = useState(9);




  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    let sortedShows = [...showPreviews];

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

  };

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setShowPreviews(data);
      });
  }, []);

if(showEpisodes)console.log(showEpisodes)



// useEffect(() =>{

//   showPreviews.map( show => {
    
//     const id = show.id

//   fetch(`https://podcast-api.netlify.app/id/${id}`)
//   .then((response) => response.json())
//   .then ((data) => {setShowEpisodes(data)})

// })
 
// },[]) 

// console.log(showEpisodes)

  

  // Filter the shows based on the search query
  const filteredShows = showPreviews.filter((show) =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        sortBy={sortBy}
        handleSortChange={handleSortChange}
      />
      <Grid container spacing={4}>
        {filteredShows.map((datamapping) => (
          <Card
            key={datamapping.id}
            titles={datamapping.title}
            descriptions={datamapping.description}
            seasons={datamapping.seasons}
            genres={datamapping.genres.map((genresID) => genreMapping[genresID])}
            images={datamapping.image}
            updated={datamapping.updated}
            
          />
        ))}
      
      </Grid>
      
    </>

  );
}

export default App;


