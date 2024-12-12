const users = require('express').Router()
const db = require('../models')
const { Users } = db

users.get('/', async (req, res) => {
    try {
        const foundSongs = await Users.findAll()
        res.status(200).json(foundSongs)
    } catch (error) {
        res.status(500).send('Server Error')
        console.log(error)
    }
})

module.exports = users