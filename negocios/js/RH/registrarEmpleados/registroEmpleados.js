var btnRegistrarse = document.getElementById("btn-registrar");

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
    tipoEmp,
    calle,
    numInt,
    numExt,
    correo,
    contrasena,
    confCont;

function registrar_usuario(ev) {

    $("#fn-modal").modal("show");

    var peticion, params;

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
        tipoEmp +
        "&tipoEmpleado="+
        calle +
        "&numInt=" +
        numInt +
        "&numExt=" +
        numExt +
        "&correo=" +
        correo +
        "&contrasena=" +
        contrasena;
        

    peticion = new XMLHttpRequest();
    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/RH/registro/registroEmpleado/registroEmpleados.php"
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

        $("#fn-modal").modal("hide");
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
    fechaNac = document.getElementById("fechaNacimiento").value;
    celular = document.getElementById("numCelular").value;
    cp = document.getElementById("codigoPostal").value;
    ciudad = document.getElementById("ciudad").value;
    estado = document.getElementById("estado").value;
    municipio = document.getElementById("municipio").value;
    colonia = document.getElementById("colonia").value;
    tipoEmp = document.getElementById("tipoEmpleado").value;
    calle = document.getElementById("calle").value;
    numInt = document.getElementById("numInterior").value;
    numExt = document.getElementById("numExterior").value;
    correo = document.getElementById("correo").value;
    contrasena = document.getElementById("contraseña").value;
    confCont = document.getElementById("ConfirmarContraseña").value;

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
    tipoEmp = tipoEmp.trim();
    calle = calle.trim();
    numInt = numInt.trim();
    numExt = numExt.trim();
    correo = correo.trim();
    contrasena = contrasena.trim();
    confCont = confCont.trim();

    if (!validarCamposVacios()) {
        alert("Llene todos los campos obligatorios");
        return;
    }
    $("#fm-modal").modal("show");
}

function validarCamposVacios() {
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
    if(tipoEmp == "" || tipoEmp == null){
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

function validarCampos() {
    return (
        validarNombres() &&
        validarApePat() &&
        validarApeMat() &&
        validarCelular() &&
        validarCp() &&
        validarCiudad() &&
        validarEstado() &&
        validarMunicipio() &&
        validarColonia() &&
        validarCalle() &&
        validarNumExt() &&
        validarNumInt() &&
        validarCorreo() &&
        validarContrasena()
    );
}

function validarNombres() {
    if (nombres.length > 60) {
        nombres = nombres.substring(0, 60);
    }
    return true;
}

function validarApePat() {
    if (apePat.length > 50) {
        apePat = apePat.substring(0, 50);
    }
    return true;
}

function validarApeMat() {
    if (apeMat.length > 50) {
        apePat = apePat.substring(0, 50);
    }
    return true;
}

function validarCelular() {
    if (isNaN(parseInt(celular)) || celular.length > 10) {
        alert("Número de celular inválido");
        return false;
    }
    return true;
}

function validarCp() {
    if (isNaN(parseInt(cp)) || cp.length != 5) {
        alert("Código postal inválido");
        return false;
    }
    return true;
}

function validarCiudad() {
    if (ciudad.length > 30) {
        ciudad = ciudad.substring(0, 30);
    }
    return true;
}

function validarEstado() {
    if (estado.length > 30) {
        estado = estado.substring(0, 30);
    }
    return true;
}

function validarMunicipio() {
    if (municipio.length > 40) {
        municipio = municipio.substring(0, 40);
    }
    return true;
}

function validarColonia() {
    if (colonia.length > 50) {
        colonia = colonia.substring(0, 50);
    }
    return true;
}

function validarCalle() {
    if (calle.length > 50) {
        calle = calle.substring(0, 50);
    }
    return true;
}

function validarNumExt() {
    if (isNaN(parseInt(numExt)) || numExt.length > 11) {
        alert("Numero exterior invalido");
        return false;
    }
    return true;
}

function validarNumInt() {
    if (numInt.length > 11) {
        alert("Numero interior invalido");
        return false;
    }
    return true;
}

function validarCorreo() {
    var regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexCorreo.test(correo) || correo.length > 60) {
        alert("Ingrese un correo válido");
        return false;
    }
    return true;
}

function validarContrasena() {
    if (contrasena.length < 8) {
        alert("La contraseña es muy corta");
        return false;
    }
    if (contrasena != confCont) {
        alert("Las contraseñas no coinciden");
        return false;
    }
    return true;
}

btnRegistrarse.addEventListener("click", registro);
