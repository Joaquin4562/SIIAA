var titulo;
var idUsuario;
var idNota;
var descripcion;
var fecha = new Date();

var datosUsuario;
datosUsuario = JSON.parse(sessionStorage.getItem('datos'));

var peticion = new XMLHttpRequest();

function form_click(frmNotas) {
    formularioValido();
}

function limpiarNuevo() {
    idNota = null;
    document.getElementById('notaTitulo').value = null;
    document.getElementById('notaDescripcion').value = null;
}

function formularioValido() {
    idNota = $('#idNotau').val();
    titulo = document.getElementById('notaTitulo').value;
    descripcion = document.getElementById('notaDescripcion').value;
    idUsuario = datosUsuario.idUsuario;

    titulo = titulo.trim();
    descripcion = descripcion.trim();

    if (idUsuario == "" || idUsuario == null) {
        alert("Sesion invalida");
        return false
    } else {
        if (titulo == null || titulo == "") {
            alert("Titulo inválido");
            return false;
        } else {
            if (descripcion == null || descripcion == "") {
                alert("Descripcion inválido");
                return false;
            } else {
                if (titulo.length > 5 && titulo.length < 50 && descripcion.length > 10 && descripcion.length < 200) {
                    registrarOactualizar();
                } else {
                    alert("Especifique informacion válida");
                }
            }
        }
    }
}

function contarNotas() {
    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/notas/notas_contar.php"
    );
    idUsuario = datosUsuario.idUsuario;
    var parametros = 'idUsuario=' + idUsuario;
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    peticion.onload = function() {
        var response;
        response = JSON.parse(peticion.responseText);

        if (response.error) {
            alert(response.error);
        } else {
            registrarNota();
        }

    };

    peticion.onreadystatechange = function() {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

    peticion.send(parametros);

}

function registrarOactualizar() {
    if (idNota == null || idNota == "") {
        contarNotas();
    } else {
        actualizarNota();
    }
}

function actualizarNota() {

    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/notas/notas_update.php"
    );

    var parametros = 'titulo=' + titulo + '&descripcion=' + descripcion + '&fecha=' + fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate() + '&idUsuario=' + idUsuario + "&idNota=" + idNota;
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    peticion.onload = function() {
        var response;
        response = JSON.parse(peticion.responseText);

        if (response.error) {
            alert(response.error);
            return;
        }

        $("#fn-modal").modal("hide");
        alert("Nota actualizada correctamente");
        $("#fm-modal").modal("hide");

        location.href = "/presentacion/MenuInicio/dist/Inicio.html";
    };

    peticion.onreadystatechange = function() {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

    peticion.send(parametros);
}

function registrarNota() {

    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/notas/notas_insert.php"
    );
    titulo = document.getElementById('notaTitulo').value;
    descripcion = document.getElementById('notaDescripcion').value;
    idUsuario = datosUsuario.idUsuario;

    var parametros = 'titulo=' + titulo + '&descripcion=' + descripcion + '&fecha=' + fecha.getFullYear() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getDate() + '&idUsuario=' + idUsuario;
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    peticion.onload = function() {
        var response;
        response = JSON.parse(peticion.responseText);

        if (response.error) {
            alert(response.error);
            return;
        }

        $("#fn-modal").modal("hide");
        alert("Nota agregada correctamente");
        $("#fm-modal").modal("hide");

        location.href = "/presentacion/MenuInicio/dist/Inicio.html";
    };

    peticion.onreadystatechange = function() {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

    peticion.send(parametros);
}

function eliminarNota() {
    titulo = document.getElementById('notaTitulo').value;
    descripcion = document.getElementById('notaDescripcion').value;
    if (titulo == null || titulo == "" && descripcion == null || descripcion == "") {
        alert("Falta información");
    } else {
        peticion.open(
            "POST",
            "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/notas/notas_delete.php"
        );
        idNota = $('#idNotau').val();
        var parametros = 'idNota=' + idNota;
        peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion.onload = function() {
            var response;
            response = JSON.parse(peticion.responseText);

            if (response.error) {
                alert(response.error);
                return;
            }

            $("#fn-modal").modal("hide");
            alert("Nota eliminada correctamente");
            $("#fm-modal").modal("hide");

            location.href = "/presentacion/MenuInicio/dist/Inicio.html";
        };

        peticion.send(parametros);
    }
}