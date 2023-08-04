import { useEffect, useState } from "react"

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
                    <ul>
                        {item.episodes.map((episode, episodeIndex) => {
                            return (
                                <li key={episodeIndex} className="episodes">
                                    {episode.title}
                                    {episode.description}
                                    <audio controls>
                                        <source src={episode.file} type='audio/mpeg' />
                                    </audio>
                                </li>
                            )
                        }
                        
                        )}
                    </ul>

                
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