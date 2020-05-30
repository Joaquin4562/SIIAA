var btnsSelect = new Array(10),
    btnUpload = document.getElementById("btn-upload");

var file, idUsuario, fileType;

function uploadFile() {
    var peticion, formData;

    peticion = new XMLHttpRequest();
    formData = new FormData();

    formData.append("file", file.files[0]);
    formData.append("idUsuario", '29');
    formData.append("fileType", fileType);

    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/shared/subir_archivos/subir_archivo.php"
    );

    // peticion.setRequestHeader(
    //     "Content-Type",
    //     "application/x-www-form-urlencoded"
    // );

    peticion.onload = function () {
        $("#modal-archivos").modal("hide");
        var response;
        response = JSON.parse(peticion.responseText);

        if (response.error) {
            alert(response.error);
            return;
        }
        alert("Se ha subido el archivo"); 
        btnsSelect[fileType].firstChild.data = "Completado";
    };

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

    peticion.send(formData);
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
    // idUsuario = datosUsuario.idUsuario;
    uploadFile();
}

function validarArchivos() {
    return file.files.length == 0;
}

for (let i = 0; i < 10; i++) {
    btnsSelect[i] = document.getElementById("btn-registrarse" + (i + 1));
    btnsSelect[i].addEventListener("click", (ev) => {
        fileType = i + 1;
        if (fileType == 10) {
            fileType = 11;
        }
    });
}

$("#modal-archivos").on("hidden.bs.modal", function (e) {
    $(this)
        .find("input,textarea,select")
        .val("")
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
});

btnUpload.addEventListener("click", validarInfo);
