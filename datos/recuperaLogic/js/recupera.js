var correo_electronico;
var contra;

function recuperaContra() {
    var peticion = new XMLHttpRequest();
    peticion.open('POST', '../datos/recuperaLogic/recupera.php');
    correo_electronico = document.getElementById('correoRecuperar').value;
    if (formularioValido()) {
        var parametros = 'correo_electronico=' + correo_electronico + '&contraseña=' + contra;
        peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        peticion.send(parametros);
    }
}


function formularioValido() {
    if (correo_electronico == '') {
        return false;
    }
    return true;
}

function form_click(frmRecupera) {
    recuperaContra();
}