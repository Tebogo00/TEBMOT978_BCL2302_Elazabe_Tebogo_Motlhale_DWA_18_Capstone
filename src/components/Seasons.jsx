import { useEffect, useState } from "react"
import "../App";


export default function Seasons(prop) {

    const [showSeasons, setShowSeasons] = useState(null)
  useEffect(() => {
    if(prop.id){
        fetch(`https://podcast-api.netlify.app/id/${prop.id}`)
        .then(response => response.json())
        .then(data => {
            const seasons = data.seasons
        const seasonsdata =seasons.map((item) => {
            return (
                <>
               
                    <p className="title">{item.title}</p>
                    <img  className ="image-item" src={item.image}></img>
                    <button onClick={handleOpen}>click</button>
                    <div className="episodes">
                        {item.episodes.map((episode, episodeIndex) => {
                            return (
                                <div key={episodeIndex} className="episodes">
                                    <h2>{episode.title}</h2>
                                    <p>{episode.description}</p>
                                    <audio controls>
                                        <source src={episode.file} type='audio/mpeg' />
                                    </audio>

                                 
                                </div>
                            )
                        }
                        
                        )}
                    </div>

                
                </>
            )
        })
        setShowSeasons(seasonsdata)

        })
    }
}, [prop.id]) 

return(
    <>
    {showSeasons}
    </>
)

}