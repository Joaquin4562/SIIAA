// TODO: AGREGAR FUNCIONES DE LOGIN
var btnInicio = document.getElementById("btn-inicio"),
    cbRecordar = document.querySelector(".form-check-input");

var correo, contrasena, datosUsuario;

async function login() {
    var peticion, 
        params;

    params = "correo=" + correo + "&contrasena=" + contrasena;

    peticion = new XMLHttpRequest();
    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/login/login.php"
    );
    peticion.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );

    peticion.onload = function () {
        var response;
        response = JSON.parse(peticion.responseText);

        if (response.error) {
            switch (response.error) {
                case "Password":
                    alert('Contraseña incorrecta');
                    break;
                case "Account":
                    alert('No se encontró tu cuenta');
                default:
                    break;
            }
            return;
        }

        datosUsuario = peticion.responseText;

        guardarSesion();

        // TODO: AGREGAR DIRECCIÓN DE LA PÁGINA PRINCIPAL

        switch (response.idAreas) {
            case '1':
                
                break;
            case '2':
                
                break;
            default:

                break;
        }
        alert('Hola, ' + response.nombres);
    };

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };
    peticion.send(params);
}

function obtenerDatos(ev) {
    correo = document.getElementById("correo").value,
    contrasena = document.getElementById("contrasena").value;

    correo = correo.trim();
    contrasena = contrasena.trim();

    if (validarCampos()) {
        alert("Llene todos los campos");
        return;
    }
    if (!validarCorreo()) {
        alert("Ingrese un correo válido");
        return;
    }
    login();
}

function validarCorreo() {
    var regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexCorreo.test(correo);
}

function validarCampos() {
    return (
        correo == "" ||
        correo == null ||
        contrasena == "" ||
        contrasena == false
    );
}

function guardarSesion() {
    var recordar;

    recordar = cbRecordar.checked;
    if (recordar == true) {
        localStorage.setItem('sesion', 'true');
        localStorage.setItem('datos', datosUsuario);
        return;
    }
    sessionStorage.setItem('sesion', 'true');
    sessionStorage.setItem('datos', datosUsuario);
}

btnInicio.addEventListener("click", obtenerDatos);