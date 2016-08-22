var hangmanObject = new Object();

hangmanObject = {
	// words: {
	// 	"countries": ["Romania", "United States", "Hungary", "Georgia","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway"],
	// 	"capitals": ["Abu Dhabi","Abuja","Accra","Adamstown","Algiers","Amman","Amsterdam","Andorra la Vella","Ankara","Antananarivo","Apia","Ashgabat","Asmara","Astana","Asuncion","Athens","Avarua","Baghdad","Baku","Bangkok","Bangui","Banjul","Basseterre","Beijing","Beirut","Belgrade","Belmopan","Berlin","Bern","Bishkek","Bissau","Bogotá","Brasilia","Bratislava","Brazzaville","Bridgetown","Brussels","Bucharest","Budapest","Buenos Aires","Bujumbura","Cairo","Canberra","Caracas","Castries","Cayenne","Charlotte Amalie","Chisinau","Cockburn Town","Conakry","Copenhagen","Dakar","Damascus","Dhaka","Dili","Djibouti","Doha","Douglas","Dublin","Gibraltar","Grytviken","Guatemala City","Gustavia","Hagåtña","Hamilton","Hanga Roa","Hanoi","Harare","Hargeisa","Havana","Helsinki","Honiara","Islamabad","Jakarta","Jamestown","Juba","Kabul","Kampala","Kathmandu","Khartoum","Kiev","Kigali","Kingston","Kingston","Kingstown","Kinshasa","Kuwait City","Libreville","Lilongwe","Lima","Lisbon","Ljubljana","Lome","London","Luanda","Lusaka","Luxembourg","Madrid","Majuro","Malabo","Male","Managua","Manama","Manila","Maputo","Marigot","Maseru","Mexico City","Minsk","Mogadishu","Monaco","Monrovia","Montevideo","Moroni","Moscow","Muscat","Nairobi","Nassau","Naypyidaw","New Delhi","Niamey","Nicosia","Nicosia","Nouakchott","Noumea","Nuuk","Oranjestad","Oslo","Ottawa","Ouagadougou","Pago Pago","Palikir","Panama City","Papeete","Paramaribo","Paris","Philipsburg","Phnom Penh","Port Louis","Port Moresby","Port Vila","Prague","Praia","Pristina","Pyongyang","Quito","Rabat","Reykjavik","Riga","Riyadh","Road Town","Rome","Roseau","Saipan","San Jose","San Juan","San Marino","San Salvador","Santo Domingo","Sao Tome","Sarajevo","Seoul","Singapore","Skopje","Sofia","Stanley","Stepanakert","Stockholm","Sukhumi","Suva","Taipei","Tallinn","Tarawa","Tashkent","Tbilisi","Tehran","Thimphu","Tirana","Tiraspol","Tokyo","Torshavn","Tripoli","Tskhinvali","Tunis","Ulan Bator","Vaduz","Valletta","The Valley","Vatican City","Victoria","Vienna","Vientiane","Vilnius","Warsaw","Washington","Wellington","West Island","Willemstad","Windhoek","Yaounde","Yerevan","Zagreb"],
	// 	"music bands": ["Abba", "Ace of Base", "A Day to Remember", "Arcade Fire", "Arctic Monkeys", "Backstreet Boys", "Bastille", "Coldplay", "Daft Punk", "The Doors", "Eminem", "Foster the People", "Garbage", "Green Day", "HIM", "Iron Maiden", "Led Zeppelin", "Linkin Park", "Marilyn Manson", "Modest Mouse", "Nine Inch Nails", "Nirvana"],
	// 	"movies": ["Harry Potter", "The Shawshank Redemption","The Godfather","The Dark Knight","Pulp Fiction","The Good the Bad and the Ugly","Angry Men","Inception","Fight Club","Forrest Gum","The Matrix","Goodfellas","Seven Samurai","Interstellar","The Usual Suspects","Saving Private Ryan","The Silence of the Lambs","The Intouchables","American History X","Spirited Away","Life Is Beautiful","Casablanca","Once Upon a Time in the West","City Lights","Modern Times","The Dark Knight Rises","The Prestige","The Departed","Whiplash","Django Unchained","Gladiator","Back to the Future", "The Pianist", "Jungle book", "Tarzan"],
	// 	"cars": ["Acura","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Cadillac","Chevrolet","Chrysler","Dodge","Ferrari","Fiat","Ford","Honda","Hummer","Hyundai","Infiniti","Isuzu","Jaguar","Jeep","Kia","Lamborghini","Lancia","Land Rover","Lexus","Lincoln","Lotus","Maserati","Mazda","Mercury","MINI","Mitsubishi","Nissan","Peugeot","Pontiac","Porsche","Renault","Saab","Saturn","Scion","Subaru","Suzuki","Toyota","Volkswagen","Volvo"]
	// },
	words: '',
	usedWords: {},
	currentWord: "",
	currentWordLength: 0,
	currentWordLengthWithoutSpaces: 0,
	correctWordLetters: 0,
	lettersAlreadyGuessed: [],
	correctLetterPosition: [],
	currentStep: 0,

	initialize: function() {
		$.ajax({
			method: "GET",
			url: "words.php",
			dataType: "JSON",
			async: false,
			success: function(data) {
				hangmanObject.words = data;
				hangmanObject.addCategoryButtons();	
			}
		});

		//initializing the dialogs for gave over and success
		$( "#dialog-message" ).dialog({
			autoOpen: false,
            modal: true,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
        });

        $( "#dialog-message-over" ).dialog({
			autoOpen: false,
            modal: true,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
	},

	//adding the category buttons in the beggining of the game
	addCategoryButtons: function() {
		var categoriesContainer = $(".categories");
		for(category in hangmanObject.words) {
			$("<button>",{
				class: "categoryButton",
				text: category,
				dc: category
			}).appendTo(categoriesContainer);
		}
	},

	hideCategories: function() {
		$(".categories").hide();
	},

	hideWordsContainer: function() {
		$("#word").hide();
	},

	hideProgressContainer: function() {
		$("#progress").hide();
	},

	hideInputContainer: function() {
		$('#inputContainer').hide();
	},

	showWordsContainer: function() {
		$("#word").show();
	},

	showProgressContainer: function() {
		$("#progress").show();
	},

	showCategories: function() {
		$(".categories").show();
	},

	showInputContainer: function() {
		$('#inputContainer').show();
	},

	makeHeaderSmaller: function() {
		$(".headerImage").addClass("smallerHeader");
	},

	resetHeaderSize: function() {
		$(".headerImage").removeClass("smallerHeader");
	},

	//generating a random number. The random number represent the index of the value of the array based on the choosen category
	chooseWord: function() {

		$("button[class='categoryButton']").click(function() {
			var category = $(this).attr("dc");

			var randomNumber = hangmanObject.getRandomArbitrary(0,hangmanObject.words[category].length - 1);
			hangmanObject.currentWord = hangmanObject.words[category][randomNumber].toLowerCase();
			hangmanObject.currentWordLength = hangmanObject.currentWord.length;
			hangmanObject.currentWordLengthWithoutSpaces = hangmanObject.currentWord.replace(/\s+/g, '').length;
			
			hangmanObject.buildWordFrontend();
			hangmanObject.showProgressContainer();
			hangmanObject.showInputContainer();
			hangmanObject.hideCategories();
			hangmanObject.makeHeaderSmaller();
		});
	},

	//building the frontend to show the hidden letters of the words
	buildWordFrontend: function() {
		for(var i = 0; i < hangmanObject.currentWordLength; i++) {
			if(hangmanObject.currentWord[i] == " ") {
				$("<br>").appendTo("#word");
			} else {
				$("<span>",{
					class: "wordLetterHide",
					text: hangmanObject.currentWord[i],
					pos: i
				}).appendTo("#word");
			}	
		}
	},

	//needed on the reset of the game
	destroyWordFrontend: function() {
		$("#word").html('');
	},

	//generating the random number
	getRandomArbitrary: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	//shows is the user didn't add anything in the input field
	addErrorInput: function() {
		$('.letterInput').addClass("errorInput");
	},
	//reset the input field after error
	removeErrorInput: function() {
		$('.letterInput').removeClass("errorInput");
	},

	//check is the letter added by the user is in the word (string)
	checkLetter: function(letter) {
		hangmanObject.correctLetterPosition = [];
		for(var i = 0; i< hangmanObject.currentWordLength; i++) {
			if(hangmanObject.currentWord[i] == letter) {
				hangmanObject.correctLetterPosition.push(i);
			}
		}

		if(hangmanObject.correctLetterPosition.length == 0) {
			return false;
		} else {
			return true;
		}
	},

	//add letter to used array. We don't want to count it again as a correct letter in case the user is adding it again
	addLetterToUsedList: function(letter) {
		$(".letterTried").append(letter + ", ");
	},

	//needed in the reset game function
	resetLetterTried: function() {
		$('.letterTried').html('');
	},

	//incrementing the step (when the user reaches 11 it is game over)
	getToNextStep: function() {
		hangmanObject.currentStep++;
		$('.imageProgress').attr("src","images/step"+hangmanObject.currentStep+".png");

		if(hangmanObject.currentStep == 11) {
			hangmanObject.showLetters();

			hangmanObject.gameOver();
		}
	},

	//function triggered in case the input letter is not in the string
	setLetterError: function(letter) {
		hangmanObject.addLetterToUsedList(letter);
		hangmanObject.getToNextStep();
	},

	//shows the letters in the word in case the letter in the input matches one or more of the letters in the string
	showCorrectLetter: function() {
		var correctLetterPositionLength = hangmanObject.correctLetterPosition.length;
		if(correctLetterPositionLength > 0) {
			for(var i = 0; i < correctLetterPositionLength; i++) {
				$("span[pos='" + hangmanObject.correctLetterPosition[i] + "']").addClass('wordLetter');
			}

			hangmanObject.correctWordLetters += hangmanObject.correctLetterPosition.length;
		}

		if(hangmanObject.correctWordLetters >= hangmanObject.currentWordLengthWithoutSpaces) {
			hangmanObject.gameFinished();
		}
	},

	//checks if the letter is in the string or not
	getLetterResult: function(letter) {
		if(hangmanObject.checkLetter(letter) == false) {
			hangmanObject.setLetterError(letter);
			hangmanObject.resetInput();
		} else {
			if($.inArray(letter,hangmanObject.lettersAlreadyGuessed) < 0) {
				hangmanObject.lettersAlreadyGuessed.push(letter);
				hangmanObject.showCorrectLetter();
			}
			hangmanObject.resetInput();
		}
	},

	//checks in case the user is trying to guess the word and he is not adding just a letter
	checkWord: function(word) {
		if(word == hangmanObject.currentWord) {
			hangmanObject.showLetters();

			hangmanObject.gameFinished();
		} else {
			//I choose not to show the complete word
			hangmanObject.getToNextStep();
			hangmanObject.resetInput();
		}
	},

	//show the word
	showLetters: function() {
		for(var i = 0; i < hangmanObject.currentWordLength; i++) {
			$("span[pos='" + i + "']").addClass('wordLetter');
		}	
	},

	//get the input that the used added in the text field
	getInput: function() {

		//click event
		$(".submitInput").click(function () {
			hangmanObject.removeErrorInput();
			var letter = $('.letterInput').val().toLowerCase();

			switch(letter.length) {
				case 0:
					hangmanObject.addErrorInput();
					break;
				case 1:					
					hangmanObject.getLetterResult(letter);
					break;
				default:
					hangmanObject.checkWord(letter);
					break;
			}
		});

		//pressing enter event
		$('.letterInput').keypress(function (e) {
			var key = e.which;
			if(key == 13)  // the enter key code
			{
				hangmanObject.removeErrorInput();
				var letter = $('.letterInput').val().toLowerCase();

				switch(letter.length) {
					case 0:
						hangmanObject.addErrorInput();
						break;
					case 1:					
						hangmanObject.getLetterResult(letter);
						break;
					default:
						hangmanObject.checkWord(letter);
						break;
				}
			}
		});
	},

	resetInput: function() {
		 $('.letterInput').val('');
		 $('.letterInput').focus();
	},

	resetGame: function() {
		hangmanObject.currentWord = '';
		hangmanObject.currentWordLength = 0;
		hangmanObject.currentWordLengthWithoutSpaces = 0;
		hangmanObject.correctLetterPosition = [];
		hangmanObject.currentStep = 0;
		hangmanObject.correctWordLetters = 0;
		hangmanObject.lettersAlreadyGuessed = [];
		hangmanObject.destroyWordFrontend();
		hangmanObject.resetLetterTried();
		$('.letterInput').val('');
		$('.imageProgress').attr("src","images/step"+hangmanObject.currentStep+".png");

		hangmanObject.hideInputContainer();
		hangmanObject.showCategories();
		hangmanObject.hideProgressContainer();
		hangmanObject.resetHeaderSize();
	},

	gameOver: function() {
		$( "#dialog-message-over" ).dialog( "open" );
	},

	gameFinished: function() {
		$( "#dialog-message" ).dialog( "open" );
	},

	tryAgain: function() {
		$('.resetGame').click(function() {
			hangmanObject.resetGame();
			$( "#dialog-message" ).dialog( "close" );
			$( "#dialog-message-over" ).dialog( "close" );
		});
	}
}

