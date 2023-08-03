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
                    <img src={item.image} className="image-item"></img>
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