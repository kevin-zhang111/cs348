const songs = require('express').Router();
const db = require('../models');
const { Songs } = db;

// GET: Retrieve all songs
songs.get('/', async (req, res) => {
    try {
        const foundSongs = await Songs.findAll();
        res.status(200).json(foundSongs);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// POST: Add a new song
songs.post('/', async (req, res) => {
    try {
        const { song_name, track_length, total_plays, artist_id } = req.body;

        // Validate request body
        if (!song_name || !track_length || !total_plays || !artist_id) {
            return res.status(400).json({ 
                error: 'All fields are required: song_name, track_length, total_plays, artist_id' 
            });
        }

        // Create new song
        const newSong = await Songs.create({
            song_name,
            track_length,
            total_plays,
            artist_id
        });

        // Respond with the newly created song
        res.status(201).json(newSong);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// PUT: Update a song by name
songs.put('/:songName', async (req, res) => {
    try {
        const { songName } = req.params;
        const { track_length, total_plays, artist_id } = req.body;

        // Find the song by name
        const song = await Songs.findOne({
            where: { song_name: songName }
        });

        // Check if song exists
        if (!song) {
            return res.status(404).json({ 
                error: 'Song not found' 
            });
        }

        // Validate at least one field is being updated
        if (!track_length && !total_plays && !artist_id) {
            return res.status(400).json({ 
                error: 'At least one field must be updated' 
            });
        }

        // Prepare update object with only provided fields
        const updateData = {};
        if (track_length) updateData.track_length = track_length;
        if (total_plays) updateData.total_plays = total_plays;
        if (artist_id) updateData.artist_id = artist_id;

        // Update the song
        const [updatedRowsCount] = await Songs.update(updateData, {
            where: { song_name: songName }
        });

        // Fetch the updated song to return
        const updatedSong = await Songs.findOne({
            where: { song_name: songName }
        });

        // Respond with the updated song
        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// DELETE: Remove a song by name
songs.delete('/:songName', async (req, res) => {
    try {
        const { songName } = req.params;

        // Find the song first to confirm it exists
        const song = await Songs.findOne({
            where: { song_name: songName }
        });

        // Check if song exists
        if (!song) {
            return res.status(404).json({ 
                error: 'Song not found' 
            });
        }

        // Delete the song
        const deletedCount = await Songs.destroy({
            where: { song_name: songName }
        });

        // Respond with success message
        res.status(200).json({ 
            message: 'Song deleted successfully',
            deletedSong: song
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// GET: Average total plays
songs.get('/average-total-plays', async (req, res) => {
    try {
        // Call the database function
        const result = await db.sequelize.query('SELECT get_average_total_plays() AS average_total_plays', {
            type: db.Sequelize.QueryTypes.SELECT
        });

        if (result.length > 0) {
            res.status(200).json({ average_total_plays: result[0].average_total_plays });
        } else {
            res.status(404).json({ error: 'No data available' });
        }
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

module.exports = songs;
