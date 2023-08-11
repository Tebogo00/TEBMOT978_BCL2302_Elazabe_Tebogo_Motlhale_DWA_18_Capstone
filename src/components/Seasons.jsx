import { useEffect, useState } from "react";

// The Seasons functional component
export default function Seasons(prop) {

  // State variables to manage seasons and episodes
  const [showSeasons, setShowSeasons] = useState(null)
  const [episodesStore, setepisodesStore] = useState(null)

  // Function to scroll to episodes section
  function scroll() {
    const episodesDiv = document.getElementById("to-episodes")
    if (episodesDiv) {
      episodesDiv.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (prop.id) {
      // Fetch data for the given ID
      fetch(`https://podcast-api.netlify.app/id/${prop.id}`)
        .then(response => response.json())
        .then(data => {
          const seasons = data.seasons
          const seasonsdata = seasons.map((item) => {

            return (
              // Create a clickable season card
              <div onClick={() => {
                episodes(item.episodes) // Call the episodes function
                scroll() // Scroll to episodes section
              }}>
                <p className="text-color">{item.title}</p>
                <img className="image-item" src={item.image}></img>
                <p className="episode-count">{item.episodes.length} episodes</p>
              </div>
            )
          })
          setShowSeasons(seasonsdata)
        })
    }
  }, [prop.id])

  // Function to handle episodes rendering
  function episodes(episodee) {

    const episodemap = episodee.map((episode, episodeIndex) => {
      return (
        <main className="text-color" key={episodeIndex}>
          <h2>{episode.title}</h2>
          <p>{episode.description}</p>
          <audio controls>
            <source src={episode.file} type='audio/mpeg' />
          </audio>
        </main>
      )
    }

    )

    setepisodesStore(episodemap)
  }

  // JSX for rendering seasons and episodes
  return (
    <>

      <div className="card-container">
        {showSeasons && showSeasons.map((season, index) => (
          <div key={index} className="card">
            {season}
          </div>
        ))}
      </div>

      <div id="to-episodes">
        {episodesStore}

      </div>

    </>
  );
}