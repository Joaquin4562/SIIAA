var btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

function cerrarSesion(ev) {
    localStorage.clear();
    sessionStorage.clear();
    location.href = '../../../../presentacion/IniciarSesion.html';
}


btnCerrarSesion.addEventListener('click', cerrarSesion);