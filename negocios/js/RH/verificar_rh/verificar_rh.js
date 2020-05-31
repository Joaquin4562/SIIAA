if (localStorage.getItem("sesion")) {
    if (localStorage.getItem("sesion") == "true") {
        var datosUsuario;
        datosUsuario = JSON.parse(localStorage.getItem("datos"));

        // TODO: AGREGAR DIRECCIÓN DE LA PÁGINA PRINCIPAL
        if (datosUsuario.idAreas != "2") {
            location.href =
                "../../../../presentacion/MenuInicio/dist/Inicio.html";
            break;
        }
    }
} else if (sessionStorage.getItem("sesion")) {
    if (sessionStorage.getItem("sesion") == "true") {
        var datosUsuario;
        datosUsuario = JSON.parse(sessionStorage.getItem("datos"));

        // TODO: AGREGAR DIRECCIÓN DE LA PÁGINA PRINCIPAL
        if (datosUsuario.idAreas != "2") {
            location.href =
                "../../../../presentacion/MenuInicio/dist/Inicio.html";
            break;
        }
    }
}
