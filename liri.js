var keys = require("./keys.js");

var authKeys = keys;

var input = process.argv;

var command = input[2];

var arg3 = input[3];

checkCommand();

function checkCommand() {

	if (command === "my-tweets") {
		getTweets();
	} else if (command === "spotify-this-song") {
		concatArgs();
	} else if (command === "movie-this") {
		concatArgs();
	} else if (command === "do-what-it-says") {
		doIt();
	}
}

function getTweets() {
	var Twitter = require('twitter');

	var name = process.argv[3];
 
	var client = new Twitter({
	  consumer_key: 'stkJP09lr9o0yAUYJVDyW37WY',
	  consumer_secret: 'f6WluEBBVR43eCyMdnbD6JShrhVv8Bd38hMYAzrsL6jnQ4UPVI',
	  access_token_key: '927986316150738945-hjQ5Lv2oWjgF5BRoosu7dx8I1odh26l',
	  access_token_secret: 'Xy01cbUE3BKW36dVBQXU0JpfKQTEAqBNJzyv0qqcgu3t9'
	});
	 
	var params = {screen_name: name};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);

	    for (i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    }
	  }
	});
}

function getSong(songTitle) {
	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify({
	  id: "cb2dbc4303d64dc68bcd166e55c24ec4",
	  secret: "73cd30800e8a459c8aafa7376ea353bc"
	});

	if (!process.argv[3]) {
	  		songTitle = "The Sign";
	  	}
	 
	spotify
	  .search({ type: 'track', query: songTitle })
	  .then(function(response) {

		    console.log("Song Title: " + response.tracks.items[0].name);
		    console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
		    console.log("Spotify Link: " + response.tracks.items[0].artists[0].external_urls.spotify);
		    console.log("Album Title: " + response.tracks.items[0].album.name);
	  
	  })
	  .catch(function(err) {
	    console.log(err);
	});
	
}

function getMovie(movieTitle) {
	var request = require("request");

	if (!process.argv[3]){
		movieTitle = "Mr Nobody";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";
	
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


function doIt() {

	var fs = require("fs");

	fs.readFile("random.txt", "utf-8", function(err, data) {
		if(err) {
			return console.log(err);
		}
		
		var command2 = data.split(",")[0];
		var userParam = data.split(",")[1];

		if (command2 === "spotify-this-song") {
			getSong(userParam);
		} else if (command2 === "movie-this"){
			getMovie(userParam);
		}
		
	});

}

function concatArgs(userInput) {
	
	var command = process.argv[2]
	
	var nodeArgs = process.argv;

	var userInput = "";

	for (var i = 3; i < nodeArgs.length; i++) {

	  if (i > 2 && i < nodeArgs.length) {

	    userInput = userInput + "+" + nodeArgs[i];
	  }

	  else {
	    userInput += nodeArgs[i];
	  }
	}

	if (command === "spotify-this-song") {
		getSong(userInput);

	} else if (command === "movie-this") {
		getMovie(userInput);
	}
}
