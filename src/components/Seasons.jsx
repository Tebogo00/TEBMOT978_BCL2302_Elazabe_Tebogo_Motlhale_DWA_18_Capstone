import { useEffect, useState } from "react";

export default function Seasons(prop) {

  const [showSeasons, setShowSeasons] = useState(null)

  useEffect(() => {
    if (prop.id) {
      fetch(`https://podcast-api.netlify.app/id/${prop.id}`)
        .then(response => response.json())
        .then(data => {
          const seasons = data.seasons
          const seasonsdata = seasons.map((item) => {
            return (
              <>
                <p className="text-color">{item.title}</p>
                <img className="image-item" src={item.image}></img>
                <dev>
                        {item.episodes.map((episode, episodeIndex) => {
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
                        )}
                    </dev>
              </>
            )
          })
          setShowSeasons(seasonsdata)
        })
    }
  }, [prop.id])
  return (
    <div className="card-container">
      {showSeasons && showSeasons.map((season, index) => (
        <div key={index} className="card">
          {season}
        </div>
      ))}
    </div>
  );
}