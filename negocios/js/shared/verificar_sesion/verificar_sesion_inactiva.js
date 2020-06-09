if (localStorage.getItem("sesion")) {
    if (localStorage.getItem("sesion") != "true") {
        location.href = "../../../../presentacion/IniciarSesion.html";
    }
} else if (sessionStorage.getItem("sesion")) {
    if (sessionStorage.getItem("sesion") != "true") {
        location.href = "../../../../presentacion/IniciarSesion.html";
    }
} else {
    location.href = "../../../../presentacion/IniciarSesion.html";
}
