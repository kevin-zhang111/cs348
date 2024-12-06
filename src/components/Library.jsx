import { useState, useEffect } from "react"

export default function Library() {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:4005/api/Artists')
            const json = await response.json()
            setArtists(json)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Library</h1>
            <ul>
                {artists.map((artist, index) => (
                    <li key={index} style={{paddingBottom: '25px'}}>
                        <div>{artist.artist_name}</div>
                        <div>{artist.genre}</div>
                        <div>{artist.popularity_score}</div>
                    </li>
                ))}
            </ul> 
        </div>
    )
}