window.onload = readTextFile;
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send();
}

//usage:
readTextFile('http://127.0.0.1:5500/presentacion/MenuInicio/src/encuesta.json', function (text) {
    var col = document.getElementById("accordion");
    var data = JSON.parse(text);
    for (let index = 0; index < data["bloques"].length; index++) {
        col.innerHTML += '<div class="card">'
            + '<div class="card-header" id="headingOne">'
            + '<h5 class="mb-0">'
            + '<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'
            + data["bloques"][index]["nombre-bloque"]
            + '</button>'
            + '</h5>'
            + '</div>'
            + '<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">'
            + '<div class="card-body">'
            + '<form>'
            +'<div class="form-group" id="pregunta-'+index+'">'
            +'</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>';
    }
    for (let index = 0; index < data["bloques"].length; index++) {
        var pregunta = document.getElementById("pregunta-"+index);
        for (let j = 0; j < data["bloques"][index]["preguntas"].length; j++) {
            console.log(data["bloques"][index]["preguntas"][j][j+1][0]["respuestas"].length);
            pregunta.innerHTML +='<label class="border-bottom">'+(j+1)+".-"+data["bloques"][index]["preguntas"][j][j+1][0]["pregunta"]+'</label><br>'
            for (let k = 0; k < data["bloques"][index]["preguntas"][j][j+1][0]["respuestas"].length; k++) {
                console.log(data["bloques"][index]["preguntas"][j][j+1][0]["respuestas"][k]);
                pregunta.innerHTML +='<div class="form-check">'
                +'<input type="radio" class="form-check-input" id="respuesta-'+k+'">'
                +'<label class="form-check-label" for="respuesta-'+k+'">'
                +data["bloques"][index]["preguntas"][j][j+1][0]["respuestas"][k]["respuesta"]+''
                +'</label>'
                +'</div>';      
            }
        }
    }
});