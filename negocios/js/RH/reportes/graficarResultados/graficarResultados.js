var datosGenerales = document.getElementById('myChart').getContext('2d');
var recursamientoYSeleccionDePersonal = document.getElementById('myChart2').getContext('2d');
var formacionYCapacitacion = document.getElementById('myChart3').getContext('2d');
var permanenciaYAsenso = document.getElementById('myChart4').getContext('2d');
var corresponsabilidadEnLaVidaLaboral = document.getElementById('myChart5').getContext('2d');
var climaLaboralLibreDeViolencia = document.getElementById('myChart6').getContext('2d');
var acosoYHostigamiento = document.getElementById('myChart7').getContext('2d');
var accesibildadI = document.getElementById('myChart8').getContext('2d');
var accesibildadII = document.getElementById('myChart9').getContext('2d');
var accesibildadIII = document.getElementById('myChart10').getContext('2d');

graficarBloque(datosGenerales, "Datos generales");
graficarBloque(recursamientoYSeleccionDePersonal, "Recursamiento y seleccion de personal");
graficarBloque(formacionYCapacitacion, "Formacion y capacitacion");
graficarBloque(permanenciaYAsenso, "Permanencia y ascenso");
graficarBloque(corresponsabilidadEnLaVidaLaboral, "Corresponsabilidad en la vida laboral, familiar y personal");
graficarBloque(climaLaboralLibreDeViolencia, "Clima laboral libre de violencia");
graficarBloque(acosoYHostigamiento, "Acoso y hostigamiento");
graficarBloque(accesibildadI, "Accesibilidad I");
graficarBloque(accesibildadII, "Accesibilidad II");
graficarBloque(accesibildadIII, "Accesibilidad III");

function graficarBloque(bloque, nombreBloque) {
    let params = "bloque =" + nombreBloque;
    let peticion = new XMLHttpRequest();
    peticion.open(
        "POST",
        "http://mante.hosting.acm.org/SIIAA_backend/negocios/php/RH/reportes/graficarRespuestas/graficarRespuestas.php"
    );
    peticion.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
    );
    peticion.send(params);
    peticion.onload = function () {
        var response;
        response = JSON.parse(peticion.responseText);

        if (response.error) {
            alert(response.error);
            return;
        }
        alert(response["puntos_de_areas"]);
        for (let index = 0; index < response.length; index++) {
            alert(response[index]["puntos_de_areas"].areas);
            
        }
        var myChart = new Chart(bloque, {
            type: 'bar',
            data: {
                labels: ['Docente', 'Intendente', 'Adminitracion', 'Recursos humanos', 'Mantenimiento'],
                datasets: [{
                    label: 'número de puntos',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status != 200) {
            alert("Ocurrio un error, por favor inténtelo más tarde");
        }
    };

}