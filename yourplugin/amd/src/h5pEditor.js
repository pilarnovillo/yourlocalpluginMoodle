/*eslint linebreak-style: ["error", "windows"]*/
// define(['jquery','core/log', 'core_h5p/editor_display'], function($, log, Editor){
// define(['jquery','core/log','editor_atto'], function($, log, editor_atto){
// import call  from 'core/ajax';
define(['jquery','core/log'], function($, log){
    log.debug('Your module is h5pEdiotr.');
    return {
        init: function(datos_json) {
            $(document).ready(function(){
                // Convertir los datos JSON de PHP a objetos JavaScript
                var datos = JSON.parse(datos_json);
                // Hacer algo con los datos
                log.debug(datos);


                // Get the query string portion of the URL.
                var queryString = window.location.search;

                // Remove the leading '?' character.
                queryString = queryString.substring(1);

                // Split the query string into an array of key-value pairs.
                var params = queryString.split('&');

                // Create an object to store the parameters and their values.
                var paramsObject = {};

                // Iterate over the key-value pairs and populate the paramsObject.
                params.forEach(function(param) {
                    var keyValue = param.split('=');
                    var key = decodeURIComponent(keyValue[0]);
                    var value = decodeURIComponent(keyValue[1]);
                    paramsObject[key] = value;
                });


                // Estilos que se aplicarán a cada botón
                const estilosBoton = {
                    backgroundColor: '#4CAF50', // Color verde del botón en la imagen
                    color: 'white', // Texto blanco
                    border: 'none',
                    padding: '10px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                    position : 'absolute',
                    left : '50%',
                    transform : 'translateX(-50%)'// Para centrar el botón
                };


                // Now you can access the parameters and their values from the paramsObject.
                var paramCourseid = paramsObject['courseid'];
                var selectMenutopic = document.getElementById('menutopic');
                if(selectMenutopic){
                    // Elimina todas las opciones del select
                    selectMenutopic.options.length = 0;
                    datos.listaTopicosIdyNombre.forEach(topico => {
                        var option = document.createElement('option');
                        option.textContent = topico.nombre;
                        option.value = topico.id;
                        selectMenutopic.appendChild(option);
                    });
                }

                var saveChangesButtonH5P = document.getElementById('id_submitbutton');
                log.debug("saveChangesButton:" + saveChangesButtonH5P);
                log.debug(saveChangesButtonH5P);

                //move error message to correct place
                var errorMessage = document.getElementById("error-message");
                log.debug("ERROR MESAGE");
                log.debug(errorMessage);
                if (errorMessage){
                    saveChangesButtonH5P.insertAdjacentElement('afterend', errorMessage);
                }

                // Crear el checkbox ingnorar
                var contenedorCheckboxIgnorarRecomendaciones = document.createElement("div");
                const checkboxIgnorarRecomendaciones = document.createElement('input');
                checkboxIgnorarRecomendaciones.type = 'checkbox';
                checkboxIgnorarRecomendaciones.id = 'checkboxIgnorarRecomendaciones';

                const labelIgnorarRecomendaciones = document.createElement('label');
                labelIgnorarRecomendaciones.htmlFor = 'checkboxIgnorarRecomendaciones';
                labelIgnorarRecomendaciones.textContent = 'Ignorar recomendaciones';

                // Añadir el checkbox y su etiqueta al contenedor
                contenedorCheckboxIgnorarRecomendaciones.appendChild(checkboxIgnorarRecomendaciones);
                contenedorCheckboxIgnorarRecomendaciones.appendChild(labelIgnorarRecomendaciones);

                var contenedorButtonFin = document.createElement("div");
                var buttonFin = document.createElement('button');
                buttonFin.setAttribute('id', 'finBtn');
                buttonFin.textContent = 'Finalizar OA';
                for (const propiedad in estilosBoton) {
                    buttonFin.style[propiedad] = estilosBoton[propiedad];
                }
                // Add event listener to button
                buttonFin.addEventListener('click', async function() {
                    log.debug("CLICKED");

                    // Redirigir a la página de tu plugin local
                    window.location.href = 'http://localhost/local/yourplugin/metadatos.php?courseid=' + paramCourseid
                    + '&oaid=' + paramsObject['oaid'];

                    // Datos a enviar
                    // const dataArray = {oaid:paramsObject['oaid'],
                    //     courseid:paramCourseid, contextid:paramsObject['contextid']
                    // };
                    // // Crear un formulario
                    // const form = document.createElement('form');
                    // form.method = 'POST'; // Método POST
                    // form.action = 'metadatos.php?courseid='+ paramCourseid
                    // + '&oaid=' + paramsObject['oaid']+"&contextid=14"; // URL de destino

                    // // Crear un campo oculto con los datos
                    // const input = document.createElement('input');
                    // input.type = 'hidden';
                    // input.name = 'dataArray';
                    // input.value = JSON.stringify(dataArray); // Convertir el array a JSON

                    // // Añadir el campo al formulario
                    // form.appendChild(input);

                    // // Añadir el formulario al documento y enviarlo
                    // document.body.appendChild(form);
                    // form.submit(); // El formulario realiza la redirección automáticamente
                });

                // var buttonCrearNuevoH5P = document.getElementById('buttonCrearNuevoH5P');
                var mainDiv = document.querySelector('div[role="main"]');
                if(mainDiv){
                    contenedorButtonFin.appendChild(buttonFin);
                    mainDiv.insertAdjacentElement('afterend', contenedorButtonFin);
                    contenedorButtonFin.insertAdjacentElement('afterend', contenedorCheckboxIgnorarRecomendaciones);
                }
            });
        }
    };
});
