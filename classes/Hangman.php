<?php

class Hangman {

	private $jsonWords;
	private $arrWords;

	public function __construct() {
		$this->jsonWords = '{
	        "countries": ["Romania", "United States", "Hungary", "Georgia","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway"],
	        "capitals": ["Abu Dhabi","Abuja","Accra","Adamstown","Algiers","Amman","Amsterdam","Andorra la Vella","Ankara","Antananarivo","Apia","Ashgabat","Asmara","Astana","Asuncion","Athens","Avarua","Baghdad","Baku","Bangkok","Bangui","Banjul","Basseterre","Beijing","Beirut","Belgrade","Belmopan","Berlin","Bern","Bishkek","Bissau","Bogotá","Brasilia","Bratislava","Brazzaville","Bridgetown","Brussels","Bucharest","Budapest","Buenos Aires","Bujumbura","Cairo","Canberra","Caracas","Castries","Cayenne","Charlotte Amalie","Chisinau","Cockburn Town","Conakry","Copenhagen","Dakar","Damascus","Dhaka","Dili","Djibouti","Doha","Douglas","Dublin","Gibraltar","Grytviken","Guatemala City","Gustavia","Hagåtña","Hamilton","Hanga Roa","Hanoi","Harare","Hargeisa","Havana","Helsinki","Honiara","Islamabad","Jakarta","Jamestown","Juba","Kabul","Kampala","Kathmandu","Khartoum","Kiev","Kigali","Kingston","Kingston","Kingstown","Kinshasa","Kuwait City","Libreville","Lilongwe","Lima","Lisbon","Ljubljana","Lome","London","Luanda","Lusaka","Luxembourg","Madrid","Majuro","Malabo","Male","Managua","Manama","Manila","Maputo","Marigot","Maseru","Mexico City","Minsk","Mogadishu","Monaco","Monrovia","Montevideo","Moroni","Moscow","Muscat","Nairobi","Nassau","Naypyidaw","New Delhi","Niamey","Nicosia","Nicosia","Nouakchott","Noumea","Nuuk","Oranjestad","Oslo","Ottawa","Ouagadougou","Pago Pago","Palikir","Panama City","Papeete","Paramaribo","Paris","Philipsburg","Phnom Penh","Port Louis","Port Moresby","Port Vila","Prague","Praia","Pristina","Pyongyang","Quito","Rabat","Reykjavik","Riga","Riyadh","Road Town","Rome","Roseau","Saipan","San Jose","San Juan","San Marino","San Salvador","Santo Domingo","Sao Tome","Sarajevo","Seoul","Singapore","Skopje","Sofia","Stanley","Stepanakert","Stockholm","Sukhumi","Suva","Taipei","Tallinn","Tarawa","Tashkent","Tbilisi","Tehran","Thimphu","Tirana","Tiraspol","Tokyo","Torshavn","Tripoli","Tskhinvali","Tunis","Ulan Bator","Vaduz","Valletta","The Valley","Vatican City","Victoria","Vienna","Vientiane","Vilnius","Warsaw","Washington","Wellington","West Island","Willemstad","Windhoek","Yaounde","Yerevan","Zagreb"],
	        "music bands": ["Abba", "Ace of Base", "A Day to Remember", "Arcade Fire", "Arctic Monkeys", "Backstreet Boys", "Bastille", "Coldplay", "Daft Punk", "The Doors", "Eminem", "Foster the People", "Garbage", "Green Day", "HIM", "Iron Maiden", "Led Zeppelin", "Linkin Park", "Marilyn Manson", "Modest Mouse", "Nine Inch Nails", "Nirvana"],
	        "movies": ["Harry Potter", "The Shawshank Redemption","The Godfather","The Dark Knight","Pulp Fiction","The Good the Bad and the Ugly","Angry Men","Inception","Fight Club","Forrest Gum","The Matrix","Goodfellas","Seven Samurai","Interstellar","The Usual Suspects","Saving Private Ryan","The Silence of the Lambs","The Intouchables","American History X","Spirited Away","Life Is Beautiful","Casablanca","Once Upon a Time in the West","City Lights","Modern Times","The Dark Knight Rises","The Prestige","The Departed","Whiplash","Django Unchained","Gladiator","Back to the Future", "The Pianist", "Jungle book", "Tarzan"],
	        "cars": ["Acura","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Cadillac","Chevrolet","Chrysler","Dodge","Ferrari","Fiat","Ford","Honda","Hummer","Hyundai","Infiniti","Isuzu","Jaguar","Jeep","Kia","Lamborghini","Lancia","Land Rover","Lexus","Lincoln","Lotus","Maserati","Mazda","Mercury","MINI","Mitsubishi","Nissan","Peugeot","Pontiac","Porsche","Renault","Saab","Saturn","Scion","Subaru","Suzuki","Toyota","Volkswagen","Volvo"]
    	}';

    	$this->arrWords = json_encode($this->jsonWords);
	}

	public function getWords() {
		return $this->jsonWords;
	}

	public function deserialize() {
		return json_decode($this->jsonWords);
	}

	public function serialize() {
		return json_encode($this->arrWords);
	}

}

?>