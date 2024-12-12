import { useState, useEffect } from "react";

export default function Songs() {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState({}); // Maps artist_name to artist_id
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [sortedSongs, setSortedSongs] = useState([]);
    const [sortOption, setSortOption] = useState("A-Z");
    const [newSong, setNewSong] = useState({
        song_name: "",
        track_length: "",
        total_plays: "",
        artist_name: "",
    });
    const [updateSong, setUpdateSong] = useState({
        song_name: "",
        track_length: "",
        total_plays: "",
        artist_name: "",
    });
    const [deleteSong, setDeleteSong] = useState({
        song_name: "",
        track_length: "",
        total_plays: "",
        artist_name: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const songsResponse = await fetch('http://localhost:4005/api/Songs');
                const songsJson = await songsResponse.json();

                const artistsResponse = await fetch('http://localhost:4005/api/Artists');
                const artistsJson = await artistsResponse.json();

                const artistMap = artistsJson.reduce((map, artist) => {
                    map[artist.artist_id] = artist.artist_name;
                    return map;
                }, {});

                const artistNameToIdMap = artistsJson.reduce((map, artist) => {
                    map[artist.artist_name] = artist.artist_id;
                    return map;
                }, {});

                setArtists(artistNameToIdMap);

                const processedSongs = songsJson.map(song => ({
                    ...song,
                    artist_name: artistMap[song.artist_id] || "Unknown Artist",
                    formatted_track_length: formatTrackLength(song.track_length),
                }));

                setSongs(processedSongs);
                setSortedSongs(processedSongs)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let sortedData = [...songs];

        switch (sortOption) {
            case "A-Z":
                sortedData.sort((a, b) => a.song_name.localeCompare(b.song_name));
                break;
            case "Z-A":
                sortedData.sort((a, b) => b.song_name.localeCompare(a.song_name));
                break;
            case "Total Plays: Increasing":
                sortedData.sort((a, b) => a.total_plays - b.total_plays);
                break;
            case "Total Plays: Decreasing":
                sortedData.sort((a, b) => b.total_plays - a.total_plays);
                break;
            default:
                break;
        }

        setSortedSongs(sortedData);
    }, [sortOption, songs]);

    const formatTrackLength = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleInputChange = (e, setState) => {
        const { name, value } = e.target;
        setState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddSong = async () => {
        try {
            const [minutes, seconds] = newSong.track_length.split(":").map(Number);
            const trackLengthInSeconds = minutes * 60 + seconds;

            const artistId = artists[newSong.artist_name];
            if (!artistId) {
                alert("Artist name is invalid. Please select a valid artist.");
                return;
            }

            const songData = {
                song_name: newSong.song_name,
                track_length: trackLengthInSeconds,
                total_plays: parseInt(newSong.total_plays, 10),
                artist_id: artistId,
            };

            const response = await fetch('http://localhost:4005/api/Songs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songData),
            });

            if (!response.ok) {
                console.error("Failed to add song:", await response.text());
                return;
            }

            const addedSong = await response.json();
            setSongs([
                ...songs,
                {
                    ...addedSong,
                    artist_name: newSong.artist_name,
                    formatted_track_length: formatTrackLength(addedSong.track_length),
                },
            ]);

            setShowForm(false);
            setNewSong({
                song_name: "",
                track_length: "",
                total_plays: "",
                artist_name: "",
            });
        } catch (error) {
            console.error("Error during song submission:", error);
        }
    };

    const handleUpdateSongSelect = (e) => {
        const selectedSongName = e.target.value;
        
        // Find the song by name
        const selectedSong = songs.find(song => song.song_name === selectedSongName);

        if (selectedSong) {
            setUpdateSong({
                song_name: selectedSong.song_name,
                track_length: selectedSong.formatted_track_length,
                total_plays: selectedSong.total_plays.toString(),
                artist_name: selectedSong.artist_name,
            });
        } else {
            console.error("No song found with name:", selectedSongName);
        }
    };

    const handleDeleteSongSelect = (e) => {
        const selectedSongName = e.target.value;
        
        // Find the song by name
        const selectedSong = songs.find(song => song.song_name === selectedSongName);

        if (selectedSong) {
            setDeleteSong({
                song_name: selectedSong.song_name,
                track_length: selectedSong.formatted_track_length,
                total_plays: selectedSong.total_plays.toString(),
                artist_name: selectedSong.artist_name,
            });
        } else {
            console.error("No song found with name:", selectedSongName);
        }
    };

    const handleUpdateSong = async () => {
        try {
            // Convert minute:second format to total seconds
            const [minutes, seconds] = updateSong.track_length.split(":").map(Number);
            const trackLengthInSeconds = minutes * 60 + seconds;

            // Get artist_id from artist_name
            const artistId = artists[updateSong.artist_name];
            if (!artistId) {
                alert("Artist name is invalid. Please select a valid artist.");
                return;
            }

            const songData = {
                song_name: updateSong.song_name,
                track_length: trackLengthInSeconds,
                total_plays: parseInt(updateSong.total_plays, 10),
                artist_id: artistId,
            };

            const response = await fetch(`http://localhost:4005/api/Songs/${encodeURIComponent(updateSong.song_name)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songData),
            });

            if (!response.ok) {
                console.error("Failed to update song:", await response.text());
                return;
            }

            // Update the songs list
            const updatedSongs = songs.map(song => 
                song.song_name === updateSong.song_name 
                    ? {
                        ...song,
                        track_length: trackLengthInSeconds,
                        total_plays: parseInt(updateSong.total_plays, 10),
                        artist_name: updateSong.artist_name,
                        formatted_track_length: formatTrackLength(trackLengthInSeconds)
                    } 
                    : song
            );

            setSongs(updatedSongs);

            // Reset update form
            setShowUpdateForm(false);
            setUpdateSong({
                song_name: "",
                track_length: "",
                total_plays: "",
                artist_name: "",
            });
        } catch (error) {
            console.error("Error during song update:", error);
        }
    };

    const handleDeleteSong = async () => {
        try {
            const response = await fetch(`http://localhost:4005/api/Songs/${encodeURIComponent(deleteSong.song_name)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                console.error("Failed to delete song:", await response.text());
                return;
            }
    
            // Update the songs list by filtering out the deleted song
            const updatedSongs = songs.filter(song => song.song_name !== deleteSong.song_name);
            setSongs(updatedSongs);
    
            // Reset delete form
            setShowDeleteForm(false);
            setDeleteSong({
                song_name: "",
                track_length: "",
                total_plays: "",
                artist_name: "",
            });
    
            console.log(`Song "${deleteSong.song_name}" successfully deleted.`);
        } catch (error) {
            console.error("Error during song delete:", error);
        }
    };
    
    const getAverage = () => {
        if (songs.length === 0) return 0;
        const totalPlaysSum = songs.reduce((sum, song) => sum + song.total_plays, 0);
        return (totalPlaysSum / songs.length).toFixed(0); // Rounded to 2 decimal places
    };

    return (
        <div>
            <h1>Songs</h1>

            <div style={{ marginTop: "20px" }}>
                <h3>Average Total Plays: {getAverage()}</h3>
            </div>

            <div>
                <label htmlFor="sort">Sort By: </label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="A-Z">Song Name (A-Z)</option>
                    <option value="Z-A">Song Name (Z-A)</option>
                    <option value="Total Plays: Increasing">Total Plays (Increasing)</option>
                    <option value="Total Plays: Decreasing">Total Plays (Decreasing)</option>
                </select>
            </div>

            <ul>
                {sortedSongs.map((song, index) => (
                    <li key={index} style={{ paddingBottom: '25px' }}>
                        <div>Song Name: {song.song_name}</div>
                        <div>Artist: {song.artist_name}</div>
                        <div>Track Length: {song.formatted_track_length}</div>
                        <div>Total Plays: {song.total_plays}</div>
                    </li>
                ))}
            </ul>

            {/* Button to toggle the add song form */}
            <button onClick={() => {
                setShowForm(!showForm);
                setShowUpdateForm(false);
                setShowDeleteForm(false);
            }}>
                {showForm ? "Cancel Add" : "Add Song"}
            </button>

            {/* Button to toggle the update song form */}
            <button onClick={() => {
                setShowUpdateForm(!showUpdateForm);
                setShowForm(false);
                setShowDeleteForm(false);
            }}>
                {showUpdateForm ? "Cancel Update" : "Update Song"}
            </button>

            <button onClick={() => {
                setShowUpdateForm(false);
                setShowForm(false);
                setShowDeleteForm(!showDeleteForm);
            }}>
                {showDeleteForm ? "Cancel Delete" : "Delete Song"}
            </button>

            {/* Add Song Form */}
            {showForm && (
                <div style={{ marginTop: "20px" }}>
                    <div>
                        <label>
                            Song Name:
                            <input
                                type="text"
                                name="song_name"
                                value={newSong.song_name}
                                onChange={(e) => handleInputChange(e, setNewSong)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Track Length (minute:second):
                            <input
                                type="text"
                                name="track_length"
                                value={newSong.track_length}
                                onChange={(e) => handleInputChange(e, setNewSong)}
                                placeholder="e.g., 3:45"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Total Plays:
                            <input
                                type="number"
                                name="total_plays"
                                value={newSong.total_plays}
                                onChange={(e) => handleInputChange(e, setNewSong)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Artist Name:
                            <input
                                type="text"
                                name="artist_name"
                                value={newSong.artist_name}
                                onChange={(e) => handleInputChange(e, setNewSong)}
                                list="artist-options"
                            />
                            <datalist id="artist-options">
                                {Object.keys(artists).map((artistName) => (
                                    <option key={artistName} value={artistName} />
                                ))}
                            </datalist>
                        </label>
                    </div>
                    <button onClick={handleAddSong}>Submit</button>
                </div>
            )}

            {/* Update Song Form */}
            {showUpdateForm && (
                <div style={{ marginTop: "20px" }}>
                    <div>
                        <label>
                            Select Song to Update:
                            <select 
                                name="song_name" 
                                onChange={handleUpdateSongSelect}
                                value={updateSong.song_name}
                            >
                                <option value="">Select a song</option>
                                {songs.map((song) => (
                                    <option 
                                        key={song.song_name} 
                                        value={song.song_name}
                                    >
                                        {song.song_name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    
                    {updateSong.song_name && (
                        <>
                            <div>
                                <label>
                                    Song Name (read-only):
                                    <input
                                        type="text"
                                        name="song_name"
                                        value={updateSong.song_name}
                                        readOnly
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Track Length (minute:second):
                                    <input
                                        type="text"
                                        name="track_length"
                                        value={updateSong.track_length}
                                        onChange={(e) => handleInputChange(e, setUpdateSong)}
                                        placeholder="e.g., 3:45"
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Total Plays:
                                    <input
                                        type="number"
                                        name="total_plays"
                                        value={updateSong.total_plays}
                                        onChange={(e) => handleInputChange(e, setUpdateSong)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Artist Name:
                                    <input
                                        type="text"
                                        name="artist_name"
                                        value={updateSong.artist_name}
                                        onChange={(e) => handleInputChange(e, setUpdateSong)}
                                        list="artist-options"
                                    />
                                    <datalist id="artist-options">
                                        {Object.keys(artists).map((artistName) => (
                                            <option key={artistName} value={artistName} />
                                        ))}
                                    </datalist>
                                </label>
                            </div>
                            <button onClick={handleUpdateSong}>Update Song</button>
                        </>
                    )}
                </div>
            )}

            {/* Delete Song Form */}
            {showDeleteForm && (
                <div style={{ marginTop: "20px" }}>
                    <div>
                        <label>
                            Select Song to Delete:
                            <select 
                                name="song_name" 
                                onChange={handleDeleteSongSelect}
                                value={deleteSong.song_name}
                            >
                                <option value="">Select a song</option>
                                {songs.map((song) => (
                                    <option 
                                        key={song.song_name} 
                                        value={song.song_name}
                                    >
                                        {song.song_name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    
                    {deleteSong.song_name && (
                        <>
                            <button onClick={handleDeleteSong}>Delete Song</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}