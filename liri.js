var keys = require("./keys.js");

var authKeys = keys;

var input = process.argv;

var command = input[2];
//var arg3 = input[3];

if (command === "my-tweets") {
	getTweets();
} else if (command === "spotify-this-song") {
	getSong();
} else if (command === "movie-this") {
	getMovie();
} else if (command === "do-what-it-says") {
	console.log("do it");
}

function getTweets() {
	var Twitter = require('twitter');

	//var tweetKeys = require('./keys.js')

	var name = process.argv[3];
 
	var client = new Twitter({
	  consumer_key: 'stkJP09lr9o0yAUYJVDyW37WY',
	  consumer_secret: 'f6WluEBBVR43eCyMdnbD6JShrhVv8Bd38hMYAzrsL6jnQ4UPVI',
	  access_token_key: '927986316150738945-hjQ5Lv2oWjgF5BRoosu7dx8I1odh26l',
	  access_token_secret: 'Xy01cbUE3BKW36dVBQXU0JpfKQTEAqBNJzyv0qqcgu3t9'
	});

	//var myClient = client;
	 
	var params = {screen_name: name};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);

	    for (i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].text);
	    }
	  }
	});
}

function getSong() {
	var Spotify = require('node-spotify-api');

	var nodeArgs = process.argv;

	var song = "";

	for (var i = 3; i < nodeArgs.length; i++) {

	  if (i > 2 && i < nodeArgs.length) {

	    song = song + "+" + nodeArgs[i];

	  }

	  else {

	    song += nodeArgs[i];

	  }
	}
 
	var spotify = new Spotify({
	  id: "cb2dbc4303d64dc68bcd166e55c24ec4",
	  secret: "73cd30800e8a459c8aafa7376ea353bc"
	});
	 
	spotify
	  .search({ type: 'track', query: song })
	  .then(function(response) {
	    console.log(response.tracks.items[0].name);
	    console.log(response.tracks.items[0].artists[0].name);
	    console.log(response.tracks.items[0].artists[0].external_urls.spotify);
	    console.log(response.tracks.items[0].album.name);
	  
	  })
	  .catch(function(err) {
	    console.log(err);
	});
	
}

function getMovie() {
	var request = require("request");

	var nodeArgs = process.argv;

	var movieName = "";

	for (var i = 3; i < nodeArgs.length; i++) {

	  if (i > 2 && i < nodeArgs.length) {

	    movieName = movieName + "+" + nodeArgs[i];

	  }

	  else {

	    movieName += nodeArgs[i];

	  }
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	
	//console.log(queryUrl);
	request(queryUrl, function(error, response, body) {

	  	// If the request is successful
		if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
			console.log("Rated: " + JSON.parse(body).Rated);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}
