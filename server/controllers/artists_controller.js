const artists = require('express').Router()
const db = require('../models')
const { Artists } = db

artists.get('/', async (req, res) => {
    try {
        const foundArtists = await Artists.findAll()
        res.status(200).json(foundArtists)
    } catch (error) {
        res.status(500).send('Server Error')
        console.log(error)
    }
})

module.exports = artists