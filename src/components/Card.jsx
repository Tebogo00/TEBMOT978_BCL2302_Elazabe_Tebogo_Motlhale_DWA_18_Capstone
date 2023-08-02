import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

export default function Card(props) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // Filter the data when searchInput or props change
    if (!searchInput) {
      setFilteredData(null); // Reset the filtered data if the search input is empty
      return;
    }

    const filteredShows = props.data.filter((show) =>
      show.titles.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredData(filteredShows);
  }, [searchInput, props.data]);

  const toggleShowMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <Grid item xs={4} className="card">
    

      {filteredData ? (
        filteredData.map((show) => (
          // Render the cards for each filtered show
          <div key={show.id}>
            <p>{show.id}</p>
            <h3>{show.titles}</h3>
            <img src={show.images} className="card--image"></img>
            <h4 className="seasons">Seasons: {show.seasons}</h4>
            <p className="updated">
              Updated:{formatDate(new Date(show.updated).toLocaleDateString())}
            </p>
            <p className="genre">Genre: {show.genres}</p>

            {showFullDescription ? (
              <h4>{show.descriptions}</h4>
            ) : (
              <h4 className="description">{show.descriptions.substring(0, 100)}</h4>
            )}

            <Button variant="contained" onClick={toggleShowMore}>
              {showFullDescription ? "View Less" : "View More"}
            </Button>
          </div>
        ))
      ) : (
        // If no search input or no matching data, render the original props data
        <React.Fragment>
          <p>{props.id}</p>
          <h3>{props.titles}</h3>
          <img src={props.images} className="card--image"></img>
          <h4 className="seasons">Seasons: {props.seasons}</h4>
          <p className="updated">
            Updated:{formatDate(new Date(props.updated).toLocaleDateString())}
          </p>
          <p className="genre">Genre: {props.genres}</p>

          {showFullDescription ? (
            <h4>{props.descriptions}</h4>
          ) : (
            <h4 className="description">{props.descriptions.substring(0, 100)}</h4>
          )}

          <Button variant="contained" onClick={toggleShowMore}>
            {showFullDescription ? "view Less" : "View More"}
          </Button>
        </React.Fragment>
      )}
    </Grid>
  );
}
