var listaNotas = document.querySelector('#lista-notas');

var datosUsuario;
datosUsuario = JSON.parse(sessionStorage.getItem('datos'));

var peticion = new XMLHttpRequest();

var param;
param = 'idUsuario=' + datosUsuario['idUsuario'];

peticion.open(
    "POST",
    "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/notas/notas_cargar.php"
);

peticion.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
);

peticion.send(param);

peticion.onload = function() {
    // console.log(peticion);
    // console.log("peticion response F", JSON.parse(peticion.responseText));
    var datos = JSON.parse(peticion.responseText);
    // alert(datos.length);
    for (let i = 0; i < datos.length; i++) {
        var elemento = document.createElement("a");
        elemento.id = "btn-abrirnotas";
        elemento.href = "";
        elemento.setAttribute("data-toggle", "modal");
        elemento.setAttribute("data-target", "#fm-modal");
        elemento.className = "list-group-item";
        elemento.innerHTML += ("<p><small>" + datos[i].fecha + "</small>");
        elemento.innerHTML += (datos[i].titulo + "</p>");
        elemento.addEventListener("click", function() {
            // alert(datos[i].id_usuarios + "-" + datos[i].id_notas);
            $('#notaTitulo').val(datos[i].titulo);
            $('#idUsuariou').val(datos[i].id_usuarios);
            $('#idNotau').val(datos[i].id_notas);
            $('#notaDescripcion').val(datos[i].descripcion);
        });

        listaNotas.appendChild(elemento);
    }
}