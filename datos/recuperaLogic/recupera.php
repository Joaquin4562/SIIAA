<?php
include("../conexion.php");
require '../recuperaLogic/mailLibrary/PHPMailer.php';
require '../recuperaLogic/mailLibrary/SMTP.php';
require '../recuperaLogic/mailLibrary/Exception.php';
require '../recuperaLogic/mailLibrary/OAuth.php';


error_reporting(0);
header('Content-type: application/json; charset=utf-8');

$txtcorreo = $_POST['correo_electronico'];
$txtcontraseña = $_POST['contraseña'];
$respuesta = [];

$mail = new PHPMailer\PHPMailer\PHPMailer();
$mail->isSMTP();

function validarDatos($correo)
{
    if (!empty($correo)) {
        $correo =  trim($correo);
        $correo = filter_var($correo, FILTER_SANITIZE_EMAIL);
        if (!filter_var($correo, FILTER_SANITIZE_EMAIL)) {
            return false;
        }
    }
    return true;
}

if (validarDatos($txtcorreo)) {
    $conexion->set_charset("utf8");
    if ($conexion->connect_errno) {
        echo "Hubo error al conectar";
        $respuesta = ['error' => true];
    } else {
        echo "paso validacion y conexion";
        $conexion->set_charset("utf8");
        $sql = "SELECT * FROM usuarios WHERE correo_electronico=?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("s", $txtcorreo);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_array();

        /* PROCESO DE ENVIO */
        $mail->SMTPDebug = 0;
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "siia.sup.tm@gmail.com"; //correo de soporte
        $mail->Password = "aT17.zSxHL"; //contraseña de soporte
        $mail->setFrom('siia.sup.tm@gmail.com', 'Soporte Tec Mante');
        $mail->addAddress($user['correo_electronico'], $user['nombres']);
        $mail->Subject = 'Recuerda bien';
        //estilo de mensaje
        $mail->Body = '
        <table style="background-color: #dfe6e9; height: 109px; margin-left: auto; margin-right: auto; width: 484px;">
<tbody>
<tr style="text-align: center; height: 89px;">
<th style="background-color: #74b9ff; height: 89px;">
<h2 style="text-align: left;"><strong><img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Logo-TecNM-2017.png" alt="logo" width="80" height="49" /></strong></h2>
</th>
<th style="background-color: #74b9ff; height: 89px;">
<h2 style="text-align: left;"><span style="color: #ffffff;"><strong>Recuerda Bien.</strong></span></h2>
</th>
</tr>
<tr style="height: 128px;">
<td style="width: 86.8333px; height: 128px;">&nbsp;</td>
<td style="width: 857.167px; height: 128px;">
<p>Recientemente solicitaste el recordatorio de tu contrase&ntilde;a.</p>
<p>Recuerdala bien para tu siguiente inicio de sesi&oacute;n.</p>
<p>Tu contrase&ntilde;a es:</p>
</td>
</tr>
<tr style="height: 100.25px;">
<td style="width: 86.8333px; height: 100.25px;">&nbsp;</td>
<td style="width: 857.167px; height: 100.25px;">
<h4>'.$user['contraseña'].'</h4>
</td>
</tr>
<tr style="height: 150px;">
<td style="background-color: #fdcb6e; text-align: left; vertical-align: middle; height: 161px;">&nbsp;</td>
<td style="background-color: #fdcb6e; text-align: left; vertical-align: bottom; height: 150px;">
<blockquote>
<p>TELS (831) 23 3 66 66 Y (831) 23 3 66 70</p>
<p>e-mail: direccion@itsmante.edu.mx</p>
<p>www.itsmante.edu.mx</p>
</blockquote>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
        ';
        $mail->CharSet = 'UTF-8'; 
        $mail->IsHTML(true);

        if (!$mail->send()) {
            echo "Error al enviar el E-Mail: " . $mail->ErrorInfo;
        } else {
            echo "E-Mail enviado";
        }
    }
} else {
    echo "Hubo error en correo";
    $respuesta = ['error' => true];
}
