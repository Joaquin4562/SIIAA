var btnConfirmar = document.getElementById("btn-confirmar"),
    btnRegistrarse = document.getElementById("btn-registrarse");

var nombres,
    apePat,
    apeMat,
    fechaNac,
    celular,
    cp,
    ciudad,
    estado,
    municipio,
    colonia,
    calle,
    numInt,
    numExt,
    correo,
    contrasena,
    confCont;

function registrar_usuario(ev) {
    var peticion;
    var token;
    var params;

    token = document.getElementById("token").value;
    token = token.trim();

    params =
        "nombres=" +
        nombres +
        "&apePat=" +
        apePat +
        "&apeMat=" +
        apeMat +
        "&fechaNac=" +
        fechaNac +
        "&celular=" +
        celular +
        "&cp=" +
        cp +
        "&ciudad=" +
        ciudad +
        "&estado=" +
        estado +
        "&municipio=" +
        municipio +
        "&colonia=" +
        colonia +
        "&calle=" +
        calle +
        "&numInt=" +
        numInt +
        "&numExt=" +
        numExt +
        "&correo=" +
        correo +
        "&contrasena=" +
        contrasena +
        "&token=" +
        token;

    peticion = new XMLHttpRequest();
    peticion.open("POST", "/negocios/php/usuario/registrar/registro_usuario.php");
    peticion.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );


    peticion.onload = function () {
        var response = JSON.parse(peticion.responseText);

        if (response.error) {
            alert(error);
            return;
        }

        alert("Registro exitoso");

        $("#fm-modal").modal("hide");

        location.href = "/presentacion/IniciarSesion.html";
    };

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

    peticion.send(params);
}

function registro(ev) {
    nombres = document.getElementById("nombre").value;
    apePat = document.getElementById("apellidopaterno").value;
    apeMat = document.getElementById("apellidomaterno").value;
    fechaNac = document.getElementById("fechanacimiento").value;
    celular = document.getElementById("celular").value;
    cp = document.getElementById("cp").value;
    ciudad = document.getElementById("ciudad").value;
    estado = document.getElementById("estado").value;
    municipio = document.getElementById("municipio").value;
    colonia = document.getElementById("colonia").value;
    calle = document.getElementById("calle").value;
    numInt = document.getElementById("ninterior").value;
    numExt = document.getElementById("nexterior").value;
    correo = document.getElementById("correo").value;
    contrasena = document.getElementById("contrasena").value;
    confCont = document.getElementById("confirmarcontrasena").value;

    nombres = nombres.trim();
    apePat = apePat.trim();
    apeMat = apeMat.trim();
    fechaNac = fechaNac.trim();
    celular = celular.trim();
    cp = cp.trim();
    ciudad = ciudad.trim();
    estado = estado.trim();
    municipio = municipio.trim();
    colonia = colonia.trim();
    calle = calle.trim();
    numInt = numInt.trim();
    numExt = numExt.trim();
    correo = correo.trim();
    contrasena = contrasena.trim();
    confCont = confCont.trim();

    if (!validarCampos()) {
        alert("Llene todos los campos obligatorios");
        return;
    }
    if (!validarCorreo()) {
        alert("Ingrese un correo válido");
        return;
    }
    if (validarContrasena()) {
        alert("Las contraseñas no coinciden");
        return;
    }
    if (validarCamposNumericos()) {
        alert("Formato de número inválido");
        return;
    }
    $("#fm-modal").modal("show");
}

function validarCampos() {
    if (nombres == "" || nombres == null) {
        return false;
    }
    if (apePat == "" || apePat == null) {
        return false;
    }
    if (apeMat == "" || apeMat == null) {
        return false;
    }
    if (fechaNac == "" || fechaNac == null) {
        return false;
    }
    if (celular == "" || celular == null) {
        return false;
    }
    if (cp == "" || cp == null) {
        return false;
    }
    if (ciudad == "" || ciudad == null) {
        return false;
    }
    if (estado == "" || estado == null) {
        return false;
    }
    if (municipio == "" || municipio == null) {
        return false;
    }
    if (colonia == "" || colonia == null) {
        return false;
    }
    if (calle == "" || calle == null) {
        return false;
    }
    if (numExt == "" || numExt == null) {
        return false;
    }
    if (numInt == "" || numInt == null) {
        numInt = "";
    }
    if (correo == "" || correo == null) {
        return false;
    }
    if (contrasena == "" || contrasena == null) {
        return false;
    }
    if (confCont == "" || confCont == null) {
        return false;
    }
    return true;
}

function validarCorreo() {
    var regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexCorreo.test(correo);
}

function validarContrasena() {
    return contrasena != confCont;
}

function validarCamposNumericos() {
    return (
        isNaN(parseInt(numExt)) ||
        (isNaN(parseInt(numInt)) && numInt != "") ||
        isNaN(parseInt(celular)) ||
        isNaN(parseInt(cp))
    );
}

function validarNumExt() {
    return !isNaN(numExt);
}

function validarNumInt() {
    return numInt == "" || !isNaN(numInt);
}

function validarCel() {
    return !isNaN(celular);
}

btnConfirmar.addEventListener("click", registrar_usuario);
btnRegistrarse.addEventListener("click", registro);
