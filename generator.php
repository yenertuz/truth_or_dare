<?php

$users = [];
$counter = 19999;
$database = new SQLite3("yenertuz");

while ($counter > 0) {
	$username = "user" . $counter;
	$password = "password" . $counter;
	$statement = $database->prepare("insert into users (username, password) values (:username, :password)");
	$statement->bindValue(":username", $username);
	$statement->bindValue(":password", $password);
	$statement->execute();
	$users[] = $username;
	$users[] = $password;
	$counter--;
}

file_put_contents("json", join("\n", $users));


?>