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

                // Función recursiva para crear el select con optgroups y opciones
                const createOptionsRecursively = (parent, nodes) => {
                    nodes.forEach(node => {
                        if (node.children && node.children.length > 0) {
                            if (node.level === 0){
                                // Si tiene hijos, creamos un optgroup para representarlo
                                const optgroup = document.createElement("optgroup");
                                optgroup.label = node.nombre;

                                // Recursión para procesar los hijos
                                createOptionsRecursively(optgroup, node.children);

                                // Agregamos el optgroup al padre
                                parent.appendChild(optgroup);
                            }
                            else{
                                // Agregamos una opción para que sea seleccionable
                                const option = document.createElement("option");
                                option.value = node.id;
                                option.textContent = "-----".repeat(node.level) + node.nombre;
                                parent.appendChild(option);

                                // Recursión para procesar los hijos
                                createOptionsRecursively(parent, node.children);

                            }

                        } else {
                            // Si no tiene hijos, creamos una opción normal
                            const option = document.createElement("option");
                            option.value = node.id;
                            option.textContent = "-----".repeat(node.level) + node.nombre;
                            parent.appendChild(option);
                        }
                    });
                };


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

                const selectMenuid= document.getElementById("menuid");
                selectMenuid.options[0].text = "Seleccionar";

                // Now you can access the parameters and their values from the paramsObject.
                var paramCourseid = paramsObject['courseid'];
                var selectMenutopic = document.getElementById('menutopic');
                if(selectMenutopic){
                    // Elimina todas las opciones del select
                    selectMenutopic.options.length = 0;

                    // Llenar el select con los datos recursivamente
                    createOptionsRecursively(selectMenutopic, datos.treeData);

                    // datos.listaTopicosIdyNombre.forEach(topico => {
                    //     var option = document.createElement('option');
                    //     option.textContent = topico.nombre;
                    //     option.value = topico.id;
                    //     selectMenutopic.appendChild(option);
                    // });
                }

                const selectMenulibrary= document.getElementById("menulibrary");
                selectMenulibrary.options[0].text = "Seleccionar";


                var selectMenutipo = document.getElementById('menutipo');
                selectMenutipo.options[0].text = "Seleccionar";
                selectMenutipo.addEventListener("change", function () {
                    Array.from(selectMenulibrary.options).forEach(option => {
                            option.hidden = false; // Hide the option
                    });

                    const menutipo = this.value; // Obtiene el valor seleccionado
                    const menutopic = document.getElementById("menutopic");
                    if (menutipo === "evaluacion") {
                        menutopic.disabled = true; // Desactiva el select menutopic

                        const optionsToDisable = ["H5P.Accordion 1.0",
                                                    "H5P.CoursePresentation 1.25",
                                                    "H5P.ArithmeticQuiz 1.1",
                                                    "H5P.Audio 1.5",
                                                    "H5P.AudioRecorder 1.0",
                                                    "H5P.BranchingScenario 1.8",
                                                    "H5P.Column 1.16",
                                                    "H5P.Dialogcards 1.9",
                                                    "H5P.DragQuestion 1.14",
                                                    "H5P.DragText 1.10",
                                                    "H5P.Blanks 1.14",
                                                    "H5P.ImageHotspots 1.10",
                                                    "H5P.InteractiveVideo 1.26",
                                                    "H5P.MarkTheWords 1.11",
                                                    "H5P.Summary 1.10",
                                                    "H5P.TwitterUserFeed 1.0"];
                        Array.from(selectMenulibrary.options).forEach(option => {
                            if (optionsToDisable.includes(option.value)) {
                                // option.disabled = true;
                                option.hidden = true; // Hide the option
                            }
                        });
                    } else {
                        menutopic.disabled = false; // Activa el select menutopic
                    }
                });

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
                checkboxIgnorarRecomendaciones.style.transform = "scale(1.5)"; // Escala el tamaño
                checkboxIgnorarRecomendaciones.style.margin = "10px"; // Ajusta el espaciado
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
                var definirComponentesTitulo = document.createElement('h3');
                definirComponentesTitulo.textContent = 'Definir Componentes:';
                definirComponentesTitulo.style.marginTop="10px";

                var mainDiv = document.querySelector('div[role="main"]');
                if(mainDiv){
                    mainDiv.insertBefore(definirComponentesTitulo, mainDiv.firstChild);
                    contenedorButtonFin.appendChild(buttonFin);
                    mainDiv.insertAdjacentElement('afterend', contenedorButtonFin);
                    contenedorButtonFin.insertAdjacentElement('afterend', contenedorCheckboxIgnorarRecomendaciones);
                }
            });
        }
    };
});
