<?php

require "config.php";

$conexion = new mysqli($server, $user, $pass, $db);

//$conexion = new mysqli('localhost','root','','siia_test');

if ($conexion->errno) {
    die('Hubo un problema con el servidor');
}

?>