/*eslint linebreak-style: ["error", "windows"]*/
define(['jquery','core/log'], function($, log){
    log.debug('metadatos');
    return {
        init: function() {
            $(document).ready(function(){
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

                log.debug("CHECK METADATOS");
                // Function to create and append elements dynamically
                /**
                 * Crea un campo de entrada (input) y lo enlaza a la página.
                 * @param {string} labelText - El texto que se mostrará en la etiqueta del campo.
                 * @param {string} inputId - El ID del campo input.
                 * @param {string} [type='text'] - El tipo de campo (text, number, date, etc.).
                 * @param {string} [placeholder=''] - El texto del placeholder que se mostrará en el campo.
                 * @param {boolean} [isRequired=false] - El texto del placeholder que se mostrará en el campo.
                 * @returns {HTMLDivElement} - Un contenedor que incluye la etiqueta y el campo de entrada.
                 */
                function createInput(labelText, inputId, type = 'text', placeholder = '', isRequired = false) {
                    const container = document.createElement('div');

                    const label = document.createElement('label');
                    label.setAttribute('for', inputId);
                    label.textContent = labelText;
                    label.style.marginRight="5px" ;

                    const input = document.createElement('input');
                    input.type = type;
                    input.id = inputId;
                    input.placeholder = placeholder;

                    // Si el campo es obligatorio, agregar el asterisco
                    if (isRequired) {
                        const asterisk = document.createElement('span');
                        asterisk.textContent = ' *';
                        asterisk.style.color = 'red';
                        label.appendChild(asterisk);
                        input.setAttribute('required', 'true');
                    }

                    // Aplicar estilos en línea
                    input.style.padding = '10px';
                    input.style.border = '1px solid #A0C4FF';
                    input.style.borderRadius = '5px';
                    input.style.backgroundColor = '#fff';
                    input.style.color = '#333';
                    input.style.fontSize = '16px';
                    input.style.margin = '10px 0'; // Margen arriba y abajo
                    input.style.width = '500px'; // Ancho de 400 píxeles

                    container.appendChild(label);
                    // container.appendChild(document.createElement('br'));
                    container.appendChild(input);
                    container.appendChild(document.createElement('br'));

                    return container;
                }

                // Lista de atributos a aplicar al select
                const atributosSelect = {
                    border: '1px solid #A0C4FF',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#fff',
                    color: '#333',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '12px',
                    margin : '10px 0' // Margen arriba y abajo
                };

                /**
                 * Crea un campo de selección (select) y lo enlaza a la página.
                 * @param {string} labelText - El texto que se mostrará en la etiqueta del campo.
                 * @param {string} selectId - El ID del campo select.
                 * @param {Array<string>} options - Un array con las opciones para el select.
                 * @returns {HTMLDivElement} - Un contenedor que incluye la etiqueta y el campo select.
                 */
                function createSelect(labelText, selectId, options) {
                    const container = document.createElement('div');

                    const label = document.createElement('label');
                    label.setAttribute('for', selectId);
                    label.textContent = labelText;
                    label.style.marginRight="5px" ;

                    const select = document.createElement('select');
                    select.id = selectId;
                    // Aplicar cada atributo usando un bucle for
                    for (const [key, value] of Object.entries(atributosSelect)) {
                        select.style[key] = value;
                    }

                    options.forEach(optionValue => {
                        const option = document.createElement('option');
                        option.value = optionValue;
                        option.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
                        select.appendChild(option);
                    });

                    container.appendChild(label);
                    // container.appendChild(document.createElement('br'));
                    container.appendChild(select);
                    container.appendChild(document.createElement('br'));

                    return container;
                }

                // Function to create the form
                /**
                 * Crea y genera el formulario de ontología LOM dinámicamente y lo añade al documento.
                 */
                function createLomForm() {
                    var mainDiv = document.querySelector('div[role="main"]');
                    const lomForm = document.createElement('div');
                    // const lomForm = document.getElementById('lom-form');

                    // General Section
                    lomForm.appendChild(createInput('Título:', 'title', 'text', 'Título del objeto de aprendizaje', true));
                    lomForm.appendChild(createInput('Conocimientos Previos:', 'prerequisitos', 'text',
                    'Conocimientos previos que el alumno debe tener para interactuar con el OA.'));
                    lomForm.appendChild(createInput('Idioma:', 'language', 'text', 'Idioma (ej: es)',true));
                    lomForm.appendChild(createInput('Palabras clave:', 'keywords', 'text', 'Palabras clave (separadas por comas)'));

                    // Life Cycle Section
                    lomForm.appendChild(createInput('Autor:', 'author', 'text', 'Nombre del autor', true));
                    lomForm.appendChild(createInput('Tema:', 'tema', 'text', 'Tema/s separados por coma', true));

                    // Meta-metadata Section
                    lomForm.appendChild(createInput('Asignatura:', 'asignatura', 'text',
                    'Nombre de la asignatura', true));
                    // lomForm.appendChild(createInput('Fecha de creación de metadatos:', 'metadataDate', 'date'));

                    // Technical Section
                    // lomForm.appendChild(createInput('Formato:', 'format', 'text', 'Formato del recurso (ej: video/mp4)'));
                    // lomForm.appendChild(createInput('Tamaño (en bytes):', 'size', 'number', 'Tamaño del recurso en bytes'));

                    // Educational Section
                    // lomForm.appendChild(createInput('Tipo de Interactividad:', 'interactivityType', 'text',
                    // 'Tipo de interactividad (ej: activo)'));
                    // lomForm.appendChild(createInput('Dificultad:', 'difficulty', 'text', 'Dificultad (ej: media)'));

                    // Rights Section
                    lomForm.appendChild(createSelect('Nivel Educativo', 'nivel',
                        ['Seleccionar','Primario', 'Secundario', 'Universitario', 'Posgrado']));
                    lomForm.appendChild(createSelect('Público objetivo', 'anioing',
                        ['Seleccionar','1er año de ingeniería', '2do año de ingeniería',
                            '3er año de ingeniería','4to año de ingeniería','5to año de ingeniería']));

                    var metadatosTitulo = document.createElement('h3');
                    metadatosTitulo.textContent = 'Cargar Metadatos';
                    mainDiv.insertBefore(metadatosTitulo, mainDiv.firstChild);
                    metadatosTitulo.insertAdjacentElement('afterend', lomForm);

                    var buttonGuardar= document.createElement('button');

                    buttonGuardar.setAttribute('id', 'buttonGuardar');
                    buttonGuardar.textContent = 'Guardar Metadatos';
                    for (const propiedad in estilosBoton) {
                        buttonGuardar.style[propiedad] = estilosBoton[propiedad];
                    }

                    var contenedorMensajes = document.createElement("div");
                    // Add event listener to button
                    buttonGuardar.addEventListener('click', async function() {
                        log.debug("CLICKED");
                        const titleInput = document.getElementById('title');
                        const asignaturaInput = document.getElementById('asignatura');
                        const languageInput = document.getElementById('language');
                        const authorInput = document.getElementById('author');
                        const temaInput = document.getElementById('tema');
                        if (titleInput.value.trim() != ''
                            && asignaturaInput.value.trim() != ''
                            && languageInput.value.trim() != ''
                            && authorInput.value.trim() != ''
                            && temaInput.value.trim() != '') {

                            fetch("http://localhost:8080/ontology/insertMetadatos", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                                    },
                                    body: new URLSearchParams({
                                        titulo: titleInput.value.trim(),
                                        lenguaje: languageInput.value.trim(),
                                    })
                                  })
                            .then(response => {
                                if (!response.ok) {
                                throw new Error("Error en la solicitud");
                                }
                                return response.text(); // O .json() si esperas una respuesta JSON
                            })
                            .then(data => {
                                log.debug("Respuesta del servidor insertMetadatos:", data);
                                // Redirigir a la página de tu plugin local
                                window.location.href = 'http://localhost/local/yourplugin/exportScorm.php?courseid='
                                + paramCourseid + '&oaid=' + paramOAID;
                            })
                            .catch(error => {
                                log.debug("Error:", error);
                            });

                        } else {
                            contenedorMensajes.setAttribute("id","contenedorMensajes");
                            contenedorMensajes.style.marginTop="80px";
                            contenedorMensajes.style.textAlign="center";
                            contenedorMensajes.innerHTML = '';

                            // Crear un nuevo elemento p (parrafo) para cada mensaje
                            const p = document.createElement('p');

                            // Asignar el contenido del mensaje al párrafo
                            p.textContent = "Por favor completar los metadatos mínimos.";

                            // Aplicar estilo en línea directamente
                            p.style.color = "red"; // Color rojo
                            p.style.fontWeight = "bold"; // Negrita
                            p.style.fontSize = "18px"; // Negrita

                            // Insertar el párrafo en el div contenedor
                            contenedorMensajes.appendChild(p);

                            buttonGuardar.insertAdjacentElement('afterend', contenedorMensajes);
                        }

                    });

                    lomForm.insertAdjacentElement('afterend', buttonGuardar);
                }

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

                // Now you can access the parameters and their values from the paramsObject.
                var paramCourseid = paramsObject['courseid'];
                var paramOAID = paramsObject['oaid'];


                  //enviar a la ontologia en el momento
                  fetch("http://localhost:8080/ontology/getInfoMetadatos", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                    }
                  })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error("Error en la solicitud");
                    }
                    return response.text(); // O .json() si esperas una respuesta JSON
                  })
                  .then(data => {
                    log.debug("Respuesta del servidor GetInfoMetadatos:", data);
                    const list = JSON.parse(data);

                    // Acceder al primer elemento
                    const firstElement = list[0];
                    log.debug("firstElement:", firstElement);

                    // Call the function to create the form
                    createLomForm();


                    const titleInput = document.getElementById('title'); // Nombre
                    titleInput.value = list[2];

                    const asignaturaInput = document.getElementById('asignatura'); // Nombre
                    asignaturaInput.value = list[0];

                    const selectElementNivel = document.getElementById('nivel');
                    selectElementNivel.value = 'Universitario';

                    const selectElementAnio = document.getElementById('anioing');
                    switch (list[1]){
                        case "1":
                            selectElementAnio.value = '1er año de ingeniería';
                            break;
                        case "2":
                            selectElementAnio.value = '2do año de ingeniería';
                            break;
                        case "3":
                            selectElementAnio.value = '3er año de ingeniería';
                            break;
                        case "4":
                            selectElementAnio.value = '4to año de ingeniería';
                            break;
                        case "5":
                            selectElementAnio.value = '5to año de ingeniería';
                            break;
                        default:
                            selectElementAnio.value = 'Seleccionar';
                            break;
                    }

                    const languageInput = document.getElementById('language'); // Nombre
                    languageInput.value = "Español";

                    const temaInput = document.getElementById('tema'); // Nombre
                    temaInput.value = "";
                    for (let i = 3; i < list.length; i++) {
                        if(i != 3){
                            temaInput.value = temaInput.value+ ", ";
                        }
                        temaInput.value = temaInput.value +list[i];
                    }


                  })
                  .catch(error => {
                    log.debug("Error:", error);
                  });

            });
        }
    };
});
