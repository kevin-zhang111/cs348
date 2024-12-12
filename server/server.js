// Dependencies
const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');
const path = require('path');
const cors = require('cors');

// Config
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../client/build')));


// Controllers
const artistsController = require('./controllers/artists_controller');
app.use('/api/artists', artistsController);
const songsController = require('./controllers/songs_controller');
app.use('/api/songs', songsController);
const usersController = require('./controllers/users_controller');
app.use('/api/users', usersController);

//Server 
app.listen(4005, () => {
    console.log('Server is running on port 4005');
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})