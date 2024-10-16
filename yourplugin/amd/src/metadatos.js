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
                 * @returns {HTMLDivElement} - Un contenedor que incluye la etiqueta y el campo de entrada.
                 */
                function createInput(labelText, inputId, type = 'text', placeholder = '') {
                    const container = document.createElement('div');

                    const label = document.createElement('label');
                    label.setAttribute('for', inputId);
                    label.textContent = labelText;
                    label.style.marginRight="5px" ;

                    const input = document.createElement('input');
                    input.type = type;
                    input.id = inputId;
                    input.placeholder = placeholder;

                    // Aplicar estilos en línea
                    input.style.padding = '10px';
                    input.style.border = '1px solid #A0C4FF';
                    input.style.borderRadius = '5px';
                    input.style.backgroundColor = '#fff';
                    input.style.color = '#333';
                    input.style.fontSize = '16px';
                    input.style.margin = '10px 0'; // Margen arriba y abajo

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

                // Function to collect the data and print it in the console
                /**
                 * Recoge los datos del formulario y los imprime en la consola.
                 */
                function guardarDatos() {
                    const lomData = {
                        general: {
                            title: document.getElementById('title').value,
                            description: document.getElementById('description').value,
                            language: document.getElementById('language').value,
                            keywords: document.getElementById('keywords').value
                        },
                        lifecycle: {
                            author: document.getElementById('author').value,
                            version: document.getElementById('version').value
                        },
                        metametadata: {
                            metadataCreator: document.getElementById('metadataCreator').value,
                            metadataDate: document.getElementById('metadataDate').value
                        },
                        technical: {
                            format: document.getElementById('format').value,
                            size: document.getElementById('size').value
                        },
                        educational: {
                            interactivityType: document.getElementById('interactivityType').value,
                            difficulty: document.getElementById('difficulty').value
                        },
                        rights: {
                            cost: document.getElementById('cost').value,
                            copyright: document.getElementById('copyright').value
                        }
                    };

                    // Print the values in the console
                    log.debug(lomData);
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
                    lomForm.appendChild(createInput('Título:', 'title', 'text', 'Título del objeto de aprendizaje'));
                    lomForm.appendChild(createInput('Descripción:', 'description', 'text',
                    'Descripción del objeto de aprendizaje'));
                    lomForm.appendChild(createInput('Idioma:', 'language', 'text', 'Idioma (ej: es)'));
                    lomForm.appendChild(createInput('Palabras clave:', 'keywords', 'text', 'Palabras clave (separadas por comas)'));

                    // Life Cycle Section
                    lomForm.appendChild(createInput('Autor:', 'author', 'text', 'Nombre del autor'));
                    lomForm.appendChild(createInput('Versión:', 'version', 'text', 'Versión del objeto de aprendizaje'));

                    // Meta-metadata Section
                    lomForm.appendChild(createInput('Creador de metadatos:', 'metadataCreator', 'text',
                    'Nombre del creador de metadatos'));
                    lomForm.appendChild(createInput('Fecha de creación de metadatos:', 'metadataDate', 'date'));

                    // Technical Section
                    lomForm.appendChild(createInput('Formato:', 'format', 'text', 'Formato del recurso (ej: video/mp4)'));
                    lomForm.appendChild(createInput('Tamaño (en bytes):', 'size', 'number', 'Tamaño del recurso en bytes'));

                    // Educational Section
                    lomForm.appendChild(createInput('Tipo de Interactividad:', 'interactivityType', 'text',
                    'Tipo de interactividad (ej: activo)'));
                    lomForm.appendChild(createInput('Dificultad:', 'difficulty', 'text', 'Dificultad (ej: media)'));

                    // Rights Section
                    lomForm.appendChild(createSelect('¿Tiene costo?', 'cost', ['no', 'yes']));
                    lomForm.appendChild(createSelect('Restricciones de derechos de autor', 'copyright', ['no', 'yes']));

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

                    // Add event listener to button
                    buttonGuardar.addEventListener('click', async function() {
                        log.debug("CLICKED");
                        guardarDatos();

                        // Redirigir a la página de tu plugin local
                        window.location.href = 'http://localhost/local/yourplugin/exportScorm.php?courseid=' + paramCourseid
                        + '&oaid=' + paramOAID;

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
                // Call the function to create the form
                createLomForm();


            });
        }
    };
});
