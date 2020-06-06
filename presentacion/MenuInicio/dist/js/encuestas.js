var btn_b1 = document.getElementById("btn-b1");
var btn_b2 = document.getElementById("btn-b2");
var btn_b3 = document.getElementById("btn-b3");
var btn_b4 = document.getElementById("btn-b4");
var btn_b5 = document.getElementById("btn-b5");
var btn_b6 = document.getElementById("btn-b6");
var btn_b7 = document.getElementById("btn-b7");
var btn_b8 = document.getElementById("btn-b8");
var btn_b9 = document.getElementById("btn-b9");
var btn_guardar = document.getElementById("btn-guardar");
var btn_b10 = document.getElementById("btn-b10");

let formularios = [];
var barra_progreso = document.getElementById("barra-progreso");
function readTextFile(bloque) {
    var file = 'http://127.0.0.1:5500/presentacion/MenuInicio/src/encuesta.json';
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            var data = JSON.parse(rawFile.responseText);
            var col = document.getElementById("accordion");
            for (let index = 0; index < data["bloques"].length; index++) {
                if (data["bloques"][index]["nombre-bloque"] == bloque) {
                    col.innerHTML = '<div class="card">'
                        + '<div class="card-header" id="headingOne">'
                        + '<h5 class="mb-0">'
                        + '<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'
                        + data["bloques"][index]["nombre-bloque"]
                        + '</button>'
                        + '</h5>'
                        + '</div>'
                        + '<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">'
                        + '<div class="card-body" id = "preguntas-' + index + '">'
                        + '</div>'
                        + '</div>'
                        + '</div>';
                    break;
                }
            }
            for (let index = 0; index < data["bloques"].length; index++) {
                if (data["bloques"][index]["nombre-bloque"] == bloque) {
                    var pregunta = document.getElementById("preguntas-" + index);
                    for (let j = 0; j < data["bloques"][index]["preguntas"].length; j++) {
                        formularios.push("form-" + data["bloques"][index]["preguntas"][j][j + 1][0]["pregunta"]);
                        pregunta.innerHTML += '<form id = "form-' + data["bloques"][index]["preguntas"][j][j + 1][0]["pregunta"] + '"><label class="border-bottom pregunta">' + data["bloques"][index]["preguntas"][j][j + 1][0]["pregunta"] + '</label><br>'
                        for (let k = 0; k < data["bloques"][index]["preguntas"][j][j + 1][0]["respuestas"].length; k++) {
                            console.log(data["bloques"][index]["preguntas"][j][j + 1][0]["respuestas"][k]);
                            let respuesta = data["bloques"][index]["preguntas"][j][j + 1][0]["respuestas"][k]["respuesta"];
                            pregunta.innerHTML += '<div class="form-check ">'
                                + '<label class="form-check-label">'
                                + '<input type="radio" class="form-check-input" name = "' + data["bloques"][index]["preguntas"][j][j + 1][0]["pregunta"] + '">'
                                + respuesta
                                + '</label>'
                                + '</div>'
                                + '</form>';
                        }
                    }
                }
            }
        }
    }
    rawFile.send();
}

readTextFile("Datos generales");
let progreso = 0;
function verificarRespuestas() {
    for (const key in formularios) {
        elementos = document.getElementById(formularios[key]).elements;
        alert(elementos);
        longitud =elementos.length;
    }
}
function progress(ev) {
    progreso += 10;
    barra_progreso.style.width = progreso + "%";
    barra_progreso.textContent = progreso + "%";
    barra_progreso.setAttribute("aria-valuenow", progreso);
    verificarRespuestas();
}

btn_b1.addEventListener("click", function () { readTextFile("Datos generales") });
btn_b2.addEventListener("click", function () { readTextFile("Recursamiento y seleción de personal") });
btn_b3.addEventListener("click", function () { readTextFile("Formación y capacitación") });
btn_b4.addEventListener("click", function () { readTextFile("Permanencia y ascenso") });
btn_b5.addEventListener("click", function () { readTextFile("Corresponsabilidad en la vida laboral, familiar y personal") });
btn_b6.addEventListener("click", function () { readTextFile("Clima laboral libre de violencia") });
btn_b7.addEventListener("click", function () { readTextFile("Acoso y hostigamiento") });
btn_b8.addEventListener("click", function () { readTextFile("Accesibilidad I") });
btn_b9.addEventListener("click", function () { readTextFile("Accesibilidad II") });
btn_b10.addEventListener("click", function () { readTextFile("Accesibilidad III") });
btn_guardar.addEventListener("click", progress)

