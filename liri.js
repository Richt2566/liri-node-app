// fetching the keys from keys.js
var keys = require("./keys.js");
var authKeys = keys;

// variables to set up the comman line commands
var input = process.argv;
var command = input[2];
var arg3 = input[3];

//call the function to check what the usr wants to do
checkCommand();

//function that runs based on what user types
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

//function to get my tweets
function getTweets() {
	//using npm package "twitter"
	var Twitter = require('twitter');

	var name = process.argv[3];
 	
 	//fetching keys from keys.js
	var client = new Twitter(authKeys.keys);
	
	//spotify api call
	var params = {screen_name: name};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	//logging data to log.txt
	  	logData(process.argv[2]);
	  	//printing all tweets, since I don't have many...
	    for (i = 0; i < tweets.length; i++) {
	    	console.log("\t Date: " + tweets[i].created_at);
	    	console.log("\t Tweet: " + tweets[i].text);
	    	console.log("\t ---------")

	    }
	  }
	});
}

//function to get song from spotify
function getSong(songTitle) {
	//using npm package
	var Spotify = require('node-spotify-api');
 	
 	//fetching keys from keys.js
	var spotify = new Spotify(authKeys.keys2);

	//if no song typed, this will run
	if (!songTitle) {
	  		songTitle = "The Sign Ace of Base";
	  	}
	
	//spotify api call
	spotify
	  .search({ type: 'track', query: songTitle })
	  .then(function(response) {
	  		//printing all relevent info
		    console.log("\tSong Title: " + response.tracks.items[0].name);
		    console.log("\tArtist Name: " + response.tracks.items[0].artists[0].name);
		    console.log("\tSpotify Link: " + response.tracks.items[0].artists[0].external_urls.spotify);
		    console.log("\tAlbum Title: " + response.tracks.items[0].album.name);
	  	//logging info to log.txt
	  	logData(process.argv[2] + " " + songTitle)
	  })
	  .catch(function(err) {
	    console.log(err);
	});
	
}

//function to get movies from omdb
function getMovie(movieTitle) {
	//using npm package 
	var request = require("request");

	//if no movie typed this will be searched for
	if (!movieTitle){
		movieTitle = "Mr Nobody";
	}

	//omdb api call
	var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + authKeys.keys3.key;
	
	request(queryUrl, function(error, response, body) {

	  	// If the request is successful
		if (!error && response.statusCode === 200) {

		    console.log("\tTitle: " + JSON.parse(body).Title);
		    console.log("\tRelease Year: " + JSON.parse(body).Year);
			console.log("\tRated: " + JSON.parse(body).Rated);
			console.log("\tCountry: " + JSON.parse(body).Country);
			console.log("\tLanguage: " + JSON.parse(body).Language);
			console.log("\tPlot: " + JSON.parse(body).Plot);
			console.log("\tActors: " + JSON.parse(body).Actors);
			//logging info to log.txt
			logData(process.argv[2] + " " + movieTitle);
		}
	});
}

//function to do what it says in random.txt
function doIt() {

	//using built in function fs
	var fs = require("fs");

	//reading what is on random.txt
	fs.readFile("random.txt", "utf-8", function(err, data) {
		if(err) {
			return console.log(err);
		}
		
		var command2 = data.split(",")[0];
		var userParam = data.split(",")[1];

		//checking to see what is written in random.txt
		if (command2 === "spotify-this-song") {
			getSong(userParam);
			logData(process.argv[2] + " " + userParam);
		} else if (command2 === "movie-this"){
			getMovie(userParam);
			logData(process.argv[2] + " " + userParam);
		} else {
			console.log("OOPS! Something might have been typed wrong!");
		}
		
	});

}

//function to make sure titles with more than one word can still be searched
function concatArgs(userInput) {
	
	var command = process.argv[2]
	
	var nodeArgs = process.argv;

	var userInput = "";

	// loop starting at 3rd index and on...
	for (var i = 3; i < nodeArgs.length; i++) {

	// if greater than 2 words, add "+"
	  if (i > 2 && i < nodeArgs.length) {

	    userInput = userInput + "+" + nodeArgs[i];
	  }

	  else {
	    userInput += nodeArgs[i];
	  }
	}

	//check command and run api for whatever user types
	if (command === "spotify-this-song") {
		getSong(userInput);
	} else if (command === "movie-this") {
		getMovie(userInput);
	}
}

//function to log data to log.txt
function logData(data) {

	var fs = require("fs");

	data = data + "\n";

	fs.appendFile("log.txt", data, function (err, data) {
                        
	    if (err) {
	        return console.log(err);
	    }
	});
}
