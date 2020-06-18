var datosUsuario;

if (localStorage.getItem("datos")) {
    datosUsuario = JSON.parse(localStorage.getItem("datos"));
} else {
    datosUsuario = JSON.parse(sessionStorage.getItem("datos"));
}

document.querySelector('#nombre_usuario').innerHTML = datosUsuario['nombres'];

var peticionPerfil = new XMLHttpRequest();

var param;
param = 'idUsuario=' + datosUsuario['idUsuario'];

peticionPerfil.open(
    "POST",
    "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/foto_perfil/mostrar.php"
);

peticionPerfil.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
);

peticionPerfil.send(param);

peticionPerfil.onload = function() {
    //console.log(peticionPerfil);
    //console.log("peticion response F", JSON.parse(peticion.responseText));
    var datos = JSON.parse(peticionPerfil.responseText);
    // alert(datos.length);
    document.querySelector('#tipo_usuario').innerHTML = datos[0].area;
    document.getElementById("foto_perfil").src = datos[0].ruta;

}