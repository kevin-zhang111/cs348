import { useState, useEffect } from "react"

export default function Artists() {
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
            <h1>Artists</h1>
            <ul>
                {artists.map((artist, index) => (
                    <li key={index} style={{ paddingBottom: '25px' }}>
                        <div>Artist Name: {artist.artist_name}</div>
                        <div>Genre: {artist.genre}</div>
                        <div>Popularity Score: {artist.popularity_score}</div>
                    </li>
                ))}
            </ul> 
        </div>
    );
}