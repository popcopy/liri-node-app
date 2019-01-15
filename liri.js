// to read and set any environment variables with the dotenv package:
require("dotenv").config();

// npm require
var fs = require("fs");
var request = require("request");
var axios = require("axios");
var moment = require('moment');
var http = require("http");
var keys = require("./keys.js");

//node-spotify-api
var spotify = new Spotify(keys.spotify);
var Spotify = require("spotify");

// arguments
var nodeArgs = process.argv;

var action = process.argv[2];
var value = process.argv[3];

// variable for holding the movies, artists, songs
var movieName = "";
var artist = "";
var track = "";

// The switch-case will direct which function gets run.
switch (action) {
  case "do-what-it-says":
    doIt();
    break;

  case "concert-this":
    concert();
    break;

  case "movie-this":
    movie();
    break;

  case "spotify-this-song":
    spotify();
    break;

  default:
    console.log("Try again, wrong command has been enter.");
}

// do-what-it-says
function doIt() {

  fs.readFile("random.txt", "utf8", function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("I Want it That Way");
    }
  });
}
// concert-this   
function concert() {
  if (value) {
    artist = nodeArgs.slice(3).join(" ");
  } else {
    console.log('Error occurred.');
  }
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(queryURL)
    .then(function (response) {

      console.log("\r\n");
      console.log("Are you ready to rock out with " + artist + " !!");
      console.log("=================");
      console.log("When you ask? " + moment(response.data[0].datetime).format("MM/DD/YYYY, h:mm a"));
      console.log("Venue:  " + response.data[0].venue.name);
      console.log("City: " + response.data[0].venue.city);
      console.log("Region: " + response.data[0].venue.region);
      console.log("Country: " + response.data[0].venue.country);
      console.log("=================");
      console.log("When you ask? " + moment(response.data[1].datetime).format("MM/DD/YYYY, h:mm a"));
      console.log("Venue:  " + response.data[1].venue.name);
      console.log("City: " + response.data[1].venue.city);
      console.log("Region: " + response.data[1].venue.region);
      console.log("Country: " + response.data[1].venue.country);
      console.log("=================");
      console.log("When you ask? " + moment(response.data[2].datetime).format("MM/DD/YYYY, h:mm a"));
      console.log("Venue:  " + response.data[2].venue.name);
      console.log("City: " + response.data[2].venue.city);
      console.log("Region: " + response.data[2].venue.region);
      console.log("Country: " + response.data[2].venue.country);
      console.log("======Done======");
    });
}
// Movie-this
function movie() {
  if (value) {
    movieName = nodeArgs.slice(3).join("+")
  } else {
    console.log('Error occurred.');
  }
  if (movieName === "Mr. Nobody") {
    console.log("-----------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {
      console.log("\r\n");
      console.log("*********Your Movie Review*********");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMdB Rating: " + response.data.imdbRating);
      console.log("Tomato Meter:  " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("*********End*********");

      //adds text to log.txt
      // fs.appendFile('log.txt', "Title: " + response.data.Title + "Release Year: " + response.data.Year + "IMdB Rating: " + response.data.imdbRating + "Country: " + response.data.Country + "Plot: " + response.data.Plot);
    });
}
function spotify() {
  if (value) {
    track = nodeArgs.slice(3).join("+")
  }
  if (!value) {
    track = 'The Sign';
  }
  spotify.search({
    type: 'track',
    query: tracks
  },
    function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }

      var songInfo = data.tracks.items;
      console.log("Artist(s): " + songInfo[0].artists.name);
      console.log("Song Name: " + songInfo[0].name);
      console.log("Preview Link: " + songInfo[0].preview_url);
      console.log("Album: " + songInfo.album[0].name);
    });
}




