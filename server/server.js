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

// Controllers
const artistsController = require('./controllers/artists_controller');
app.use('/api/artists', artistsController);

//Server 
app.listen(4005, () => {
    console.log('Server is running on port 4005');
})