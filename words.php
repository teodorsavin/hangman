<?php 

	// $URL = $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
 //    if ($URL != "savin.amsterdam/words.php")
 //    	die("/\*sry, no acces rights\*/");

	require_once("classes/Hangman.php");

	$hangman = new Hangman();

	$arrWords = $hangman->deserialize();

	echo json_encode($arrWords);

?>