/**Class that dictates the behavior of the Hangman game.**/
var gameManager = {
	wins: 0,
	guesses: 10,
	winFlag: false,
	setFlag: false,
	selection: "",
	words: ["Samus", "Sonic", "Mario", "Pikachu", 
			"Tracer", "Link", "Zelda", "Luigi", 
			"Megaman", "Waluigi", "Cloud", "Ryu",
			"Dante", "Bowser", "Snake", "Kratos",
			"Glados", "Sephiroth"],
	word: [],
	displayed_word: [],
	letters_guessed: [],
	images:  { "samus": "assets/images/me.jpg",
			   "sonic": "assets/images/me.jpg",
			   "mario": "assets/images/me.jpg",
			   "pikachu": "assets/images/me.jpg",
			   "tracer":"assets/images/me.jpg",
			   "link": "assets/images/me.jpg",
			   "zelda": "assets/images/me.jpg",
			   "luigi": "assets/images/me.jpg",
			   "megaman": "assets/images/me.jpg",
			   "waluigi": "assets/images/me.jpg",
			   "cloud": "assets/images/me.jpg",
			   "ryu": "assets/images/me.jpg",
			   "dante": "assets/images/me.jpg",
			   "bowser": "assets/images/me.jpg",
			   "snake": "assets/images/me.jpg",
			   "kratos": "assets/images/me.jpg",
			   "glados": "assets/images/me.jpg",
			   "sephiroth": "assets/images/me.jpg"},



	setUp: function(){

		if(this.setFlag == false){
			this.chooseWord();
			this.winFlag = false;

			document.getElementById("instructions").innerHTML = "Press any letter key to play! Press Escape to restart game!";

			var newDiv = document.createElement("div");
	        newDiv.innerHTML = "Wins: " + this.wins;
	        newDiv.id = "wins";
	        document.getElementById("game").appendChild(newDiv);

	        newDiv = document.createElement("div");
	        newDiv.innerHTML = "Word: ";
	        newDiv.id = "word";
	        document.getElementById("game").appendChild(newDiv);

	        newDiv = document.createElement("div");
	        newDiv.innerHTML = "Guesses: " + this.guesses;
	        newDiv.id = "guesses";
	        document.getElementById("game").appendChild(newDiv);

        	newDiv = document.createElement("div");
        	newDiv.innerHTML = "Letters Guessed: ";
        	newDiv.id = "letters_guessed";
        	document.getElementById("game").appendChild(newDiv);
        	this.setFlag = true;

    	}
    	console.log(this.word);


     


	},

	guess: function(letter){

		if(this.word.indexOf(letter) == -1){
			if(this.letters_guessed.indexOf(" " + letter) == -1){
				this.letters_guessed.push(" " + letter);
			}
			this.guesses = this.guesses - 1;
			this.displayInfo();
			if(this.guesses == 0){
				this.lose();
			}
		}
		else if(this.word.indexOf(letter) != -1){
			this.correctGuess(letter);
			if(this.winFlag == true){
				this.victory();
			}
		}

	},

	chooseWord: function (){

		var choice = this.words[Math.floor(Math.random() * 10)];
		selection = choice.toLowerCase();
		choice = choice.split("");
		for(i = 0; i < choice.length; i++){
			this.word.push(choice[i].toLowerCase());
			this.displayed_word.push("- ");
		}

	},

	displayInfo: function(){

		document.getElementById("wins").innerHTML = "Wins: " + this.wins;
		document.getElementById("word").innerHTML = "Word: " + this.displayed_word.join();
		document.getElementById("guesses").innerHTML = "Guesses Left: " + this.guesses;
		document.getElementById("letters_guessed").innerHTML = "Letters Guessed: " + this.letters_guessed.join();

	},

	correctGuess: function(letter){
		if(this.word.lastIndexOf(letter) != this.word.indexOf(letter)){

		}

		for(i = 0; i < this.word.length; i++){
			if(this.word[i] == letter){
				this.displayed_word[i] = letter;
			}
		}

		if(this.displayed_word.indexOf("- ") == -1){
			this.winFlag = true;
			this.wins = this.wins + 1;
		}

		this.displayInfo();
		

	},

	restart: function(){

		this.displayed_word = [];
		this.word = [];
		this.letters_guessed = [];
		this.guesses = 10;

		this.chooseWord();
		this.winFlag = false;
		this.displayInfo();
		document.getElementById("instructions").innerHTML = "Press any letter key to play! Press Escape to restart game!";

	},

	lose: function(){

		document.getElementById("instructions").innerHTML = "YOU LOST! Press the space key to restart.";
		this.restart();
		
	},

	victory: function(){
		document.getElementById("instructions").innerHTML = "YOU WON! Press the space key to restart.";
		newDiv = document.createElement("div");
		newDiv.innerHTML = '<img src="' + this.images[selection] + '"></img>'; 
		newDiv.id = "character_image";
		document.getElementById("game").appendChild(newDiv);
	}


}


document.onkeyup = function (event){

	if(event.keyCode == 32 && gameManager.setFlag == false){
		gameManager.setUp();
		document.getElementById("word").innerHTML = "Word: " + gameManager.displayed_word.join();
		return;
	}
	else if ((event.keyCode == 32 && gameManager.winFlag == true) || (event.keyCode == 27)){
		gameManager.restart();
		return;
	}
	else if(gameManager.winFlag == false){
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		gameManager.guess(letter);
	}

}