function DigitalPal(hungry, sleepy, bored, age) {
	this.hungry = hungry;
	this.sleepy = sleepy;
	this.bored = bored;
	this.age = age;

	this.sleep = function(){
		if(this.sleepy) {
			console.log("Zzzzzzz");
		this.sleepy = false;
		this.bored = true;
		this.increaseAge()
		} else {
			console.log("I'm not tired!!!!");

		}

	};

	this.feed = function() {
		if(this.hungry){
			console.log("That was yummy");
			this.hungry = false;
			this.sleepy = true;
		} else {
			console.log("No thank I'm full");
		}
	};

	this.play = function() {
		if (this.bored) {
			console.log("Lets play!!");
			this.bored = false;
			this.hungry = true;
		} else {
			console.log("Not right now. later?");
		}
	};

	this.increaseAge = function() {
		this.age += 1;
		console.log("Happy birthday to me! I am " + this.age + " old.");

	};
};

var dog = new DigitalPal(true, true, true, 3);

dog.outside = false;
dog.bark = function() {
	console.log("Woof woof Motherfucker!!!");
}

dog.goOutside = function() {
	if (!this.outside) {
		console.log("Yay I love outdoors!");
		this.outside = true;
		dog.bark();
	} else {
		console.log("We are already outside!");
		// return;
	}
}

dog.goInside = function() {
	if(this.outside) {
		console.log("Do we have to? FINE!!!");
		this.outside = false;
	} else {
		console.log("I'm already inside!");
		// return;
	}
}

var cat = new DigitalPal(false, false, false, 113);

cat.houseCondition = 100;

cat.meow = function() {
	console.log("Meow Meow Bitch!!!");
}

cat.destroyFurniture = function() {
	if (this.houseCondition > 0) {
		this.houseCondition -= 10;
		console.log("Take that furniture!");
		this.bored = false;
		this.sleepy = true;
	} else {
		return;
	}
}

cat.buyNewFurniture = function() {
	this.houseCondition += 50;
	console.log("Are you sure about that?");
}





