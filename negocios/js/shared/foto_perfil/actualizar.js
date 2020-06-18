var btnUpload = document.getElementById("btn-upload");

var file, idUsuario, fileType = 10;

function uploadFile() {
    var peticionActualizaFoto, formData;

    peticionActualizaFoto = new XMLHttpRequest();
    formData = new FormData();

    formData.append("file", file.files[0]);
    formData.append("idUsuario", idUsuario);
    formData.append("fileType", fileType);

    peticionActualizaFoto.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/foto_perfil/actualizar.php"
    );

    peticionActualizaFoto.onload = function() {
        $("#modal-archivos").modal("hide");
        var response;
        response = JSON.parse(peticionActualizaFoto.responseText);

        if (response.error) {
            alert(response.error);
            return;
        }
        alert("Se ha subido el archivo");
        btnsSelect[fileType].firstChild.data = "Completado";
        location.reload();
    };

    peticionActualizaFoto.onreadystatechange = function() {
        if (peticionActualizaFoto.readyState == 4 && peticionActualizaFoto.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

    peticionActualizaFoto.send(formData);
}

function validarInfo(ev) {
    var datosUsuario;
    file = document.getElementById("archivo");
    if (validarArchivos()) {
        alert("Seleccione un archivo");
        return;
    }
    if (localStorage.getItem("datos")) {
        datosUsuario = JSON.parse(localStorage.getItem("datos"));
    } else {
        datosUsuario = JSON.parse(sessionStorage.getItem("datos"));
    }
    idUsuario = datosUsuario.idUsuario;
    uploadFile();
}

function validarArchivos() {
    return file.files.length == 0;
}

btnUpload.addEventListener("click", validarInfo);