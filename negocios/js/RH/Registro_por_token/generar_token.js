var btn_enviar = document.getElementById("btn-generar-envair");
var areas = document.getElementById("tipoEmpleado_token");
var correo_electronico, area;
var token = document.getElementById("token");

function validarDatos(ev) {
    correo_electronico = document.getElementById("correo_token").value;
    area = areas.options[areas.selectedIndex].text;
    if (!validarCamposVacios()) {
        alert("Favor de rellenar los campos vacios");
    } else if (!validarIdArea()) {
        alert("Favor de ingresar un Area");
    } else if (!validarCorreoElectronico()) {
        alert("Favor de ingresar un correo valido");
    } else {
        generarToken();
    }
}
function generarToken() {
        let params = "correo=" + correo_electronico + "&area=" + area;
        peticion = new XMLHttpRequest();
        peticion.open(
            "POST",
            "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/RH/Registro_por_token/generar_token.php"
        );
        peticion.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        peticion.onload = function () {
            var response;
            response = JSON.parse(peticion.responseText);

            if (response.error) {
                alert(response.error);
                return;
            }
            alert(response.token);
            alert("Se envio el token correctmante");
            token.value = response.token;
            $("#token-text").val(response.token);
        };

        peticion.onreadystatechange = function () {
            if (peticion.readyState == 4 && peticion.status != 200) {
                alert("Ocurrio un error, por favor inténtelo más tarde");
            }
        };

        peticion.send(params);
}
function validarIdArea() {
    if (area == "Selecciona un area...") {
        return false;
    }
    return true;
}
function validarCorreoElectronico() {
    var regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexCorreo.test(correo_electronico) || correo_electronico.length > 60) {
        return false;
    }
    return true;
}
function validarCamposVacios() {
    if (correo_electronico == "" || correo_electronico == null) {
        return false;
    }
    return true;
}
btn_enviar.addEventListener("click", validarDatos);