// to read and set any environment variables with the dotenv package:
require("dotenv").config();

//Grab data from keys.js -- npm require
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

//Stored argument's array
var input = process.argv;
var command = process.argv[2];





