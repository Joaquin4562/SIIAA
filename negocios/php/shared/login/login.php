<?php

error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json; charset=utf-8');

require '/datos/conexion.php';

$response = array();

$correo     = $_POST['correo'];
$contrasena = $_POST['contrasena'];

$correo         = htmlspecialchars(filter_var($correo, FILTER_SANITIZE_EMAIL));
$hashContrasena = hash("sha256", htmlspecialchars($contrasena));

$sql = "SELECT * FROM usuarios WHERE correo_electronico=?";

$stmt = $conexion->prepare($sql);

$stmt->bind_param("s", $correo);

$stmt->execute();

$result = $stmt->get_result();

$usuario = $result->fetch_array();

if ($usuario) {
    if ($usuario['contrasena'] == $hashContrasena) {
        $response = [
            'idUsuario'     => $usuario['id_usuarios'],
            'idAreas'       => $usuario['id_areas'],
            'nombres'       => $usuario['nombres'],
            'apePat'        => $usuario['apellido_paterno'],
            'apeMat'        => $usuario['apellido_materno'],
            'genero'        => $usuario['genero'],
            'fechaNac'      => $usuario['fecha_de_nacimiento'],
            'ciudad'        => $usuario['ciudad'],
            'municipio'     => $usuario['municipio'],
            'estado'        => $usuario['estado'],
            'cp'            => $usuario['codigo_postal'],
            'numExt'        => $usuario['num_ext'],
            'numInt'        => $usuario['num_int'],
            'colonia'       => $usuario['colonia'],
            'calle'         => $usuario['calle'],
            'celular'       => $usuario['numero_celular'],
            'numControl'    => $usuario['numero_control'],
            'correo'        => $usuario['correo_electronico'],
            'contrasena'    => $usuario['contrasena']
        ];
    } else {
        $response = [
            "error" => "Contraseña incorrecta"
        ];
    }
} else {
    $response = [
        "error" => "No se encontró la cuenta"
    ];
}

echo json_encode($response);