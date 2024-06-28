/*eslint linebreak-style: ["error", "windows"]*/
// define(['jquery','core/log', 'core_h5p/editor_display'], function($, log, Editor){
// define(['jquery','core/log','editor_atto'], function($, log, editor_atto){
// import call  from 'core/ajax';
define(['jquery','core/log','core/ajax'], function($, log, ajax){
    log.debug('Your module is loading2.');
    return {
        init: function(datos_json) {
            $(document).ready(function(){
                // Convertir los datos JSON de PHP a objetos JavaScript
                var datos = JSON.parse(datos_json);

                // Hacer algo con los datos
                log.debug(datos);

                log.debug("CHECK IF DRAFT SAVED");

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
                log.debug(paramCourseid);

                // Create form elements
                    var selectTopicosH5P = [];
                    var seleccionarUnidadTitulo = document.createElement('h3');
                    seleccionarUnidadTitulo.textContent = 'Seleccionar Unidad y Topicos:';

                    /**
                     * Obtiene todas las unidades de los contenidos mínimos en el objeto de datos.
                     *
                     * @param {Object} datos - El objeto que contiene los OA
                     * @returns {string[]} Array de URIs de todas las unidades.
                     */
                    function obtenerUnidadesConTemasYTopicos(datos) {
                        let unidadesConTemasYTopicos = [];
                        datos.contenidosMinimo.forEach(contenido => {
                            contenido.unidades.forEach(unidad => {
                                let temasYTopicos = unidad.temas.map(tema => ({
                                    tema: tema.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                                    topicos: tema.topicos.map(topico =>
                                        topico.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""))
                                }));
                                unidadesConTemasYTopicos.push({
                                    unidad: unidad.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                                    temasYTopicos: temasYTopicos
                                });
                            });
                        });
                        return unidadesConTemasYTopicos;
                    }

                    // Crear el elemento select
                    var select = document.createElement('select');
                    select.setAttribute('id', 'id_unidadSelect');

                    // Obtener las unidades con sus temas y tópicos y añadirlas al select como opciones
                    var unidadesConTemasYTopicos = obtenerUnidadesConTemasYTopicos(datos);
                    unidadesConTemasYTopicos.forEach(function(unidadConTemasYTopicos) {
                        var option = document.createElement('option');
                        option.textContent = unidadConTemasYTopicos.unidad;
                        option.value = unidadConTemasYTopicos.unidad.toUpperCase().replace(/\s+/g, '_');
                        option.dataset.temasYTopicos = JSON.stringify(unidadConTemasYTopicos.temasYTopicos); // Guardar los temas y
                        select.appendChild(option);
                    });
                    // Append form to container
                    var mainDiv = document.querySelector('div[role="main"]');
                    // var mform = document.getElementsByClassName("mform")[0];
                    // // log.debug(mform);
                    mainDiv.insertBefore(seleccionarUnidadTitulo, mainDiv.firstChild);
                    seleccionarUnidadTitulo.insertAdjacentElement('afterend', select);

                    // Crear el elemento ul para la lista de temas y tópicos
                    var ul = document.createElement('ul');
                    ul.setAttribute('id', 'listaTemasYTopicos');
                    ul.style.listStyleType = 'none'; // Eliminar los puntos de la lista

                    select.insertAdjacentElement('afterend', ul);

                    // Add event listener to select for change event
                    select.addEventListener('change', function(event) {
                        selectTopicosH5P = [];
                        var selectedOption = event.target.selectedOptions[0];
                        var temasYTopicos = JSON.parse(selectedOption.dataset.temasYTopicos);

                        // Limpiar la lista anterior
                        ul.innerHTML = '';

                        // Añadir los temas y tópicos a la lista
                        temasYTopicos.forEach(item => {
                            var liTema = document.createElement('li');
                            liTema.textContent = item.tema;
                            ul.appendChild(liTema);

                            item.topicos.forEach(topico => {
                                var liTopico = document.createElement('li');

                                var checkbox = document.createElement('input');
                                checkbox.type = 'checkbox';
                                checkbox.value = topico.toUpperCase().replace(/\s+/g, '_');

                                var label = document.createElement('label');
                                label.textContent = topico;
                                selectTopicosH5P.push(topico);
                                log.debug(selectTopicosH5P);
                                label.prepend(checkbox);

                                liTopico.appendChild(label);
                                liTopico.style.marginLeft = '20px'; // Sangría para los tópicos
                                ul.appendChild(liTopico);
                            });
                        });

                        var select = document.getElementById('menutopic');
                        if(select){
                            // select.setAttribute('id','id_unidadSelect');
                            // Add options to select element
                            // var options = ['Introducción', 'Enfoque Basado en Agentes', 'Búsqueda'];

                            var options = selectTopicosH5P;
                            log.debug(selectTopicosH5P);
                            options.forEach(function(optionText) {
                                var option = document.createElement('option');
                                option.textContent = optionText;
                                option.value = optionText.toUpperCase().replace(/\s+/g, '_');
                                select.appendChild(option);
                            });
                        }
                    });

                    var seleccionarRAsTitulo = document.createElement('h3');
                    seleccionarRAsTitulo.textContent = 'Seleccionar Resultados de Aprendizaje de la Asignatura:';

                    var checkboxesContainer = document.createElement('div'); // Add multiple select element
                    checkboxesContainer.setAttribute('id', 'resultadoAprendizaje'); // Set attributes for multiple select element
                    var resultadosAprendizaje = datos['RAsAsignatura'];

                    resultadosAprendizaje.forEach(function(raText) {
                        raText = raText.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#","");
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = raText.toUpperCase().replace(/\s+/g, '_');
                        var label = document.createElement('label');
                        label.textContent = raText;
                        label.appendChild(checkbox);
                        checkboxesContainer.appendChild(label);

                        // Crear y añadir un elemento <br> después del label
                        var br = document.createElement('br');
                        checkboxesContainer.appendChild(br);
                    });

                    ul.insertAdjacentElement('afterend',seleccionarRAsTitulo);
                    seleccionarRAsTitulo.insertAdjacentElement('afterend',checkboxesContainer);

                    // RA para OA
                    var title = document.createElement('h3'); // Título para el resultado de aprendizaje
                    title.textContent = 'Definir el resultado de aprendizaje del Objeto de Aprendizaje';

                    // Campos de entrada de texto
                    var verboInput = createTextInput('Verbo:');
                    var objetoConocimientoInput = createTextInput('Objeto de Conocimiento:');
                    var condicionInput = createTextInput('Condición:');
                    var finalidadInput = createTextInput('Finalidad:');

                    // Append elements to form
                    // mform.appendChild(title);
                    // mform.appendChild(verboInput);
                    // mform.appendChild(objetoConocimientoInput);
                    // mform.appendChild(condicionInput);
                    // mform.appendChild(finalidadInput);

                    checkboxesContainer.insertAdjacentElement('afterend', title);
                    title.insertAdjacentElement('afterend', verboInput);
                    verboInput.insertAdjacentElement('afterend', objetoConocimientoInput);
                    //Check if the OA already has a value for the field

                    objetoConocimientoInput.insertAdjacentElement('afterend', condicionInput);
                    condicionInput.insertAdjacentElement('afterend', finalidadInput);

                    //TEST AJAX

                    const updateVerboOA = (
                        id,
                        name,
                    ) => ajax.call([{
                        methodname: 'local_yourplugin_store_oa_fields',
                        args: {
                            id,
                            name,
                        },
                    }])[0];

                    const verifyVerbLevel = (
                        raasignatura,
                        verbo,
                    ) => ajax.call([{
                        methodname: 'local_yourplugin_verify_verb_level',
                        args: {
                            raasignatura,
                            verbo,
                        },
                    }])[0];

                    verboInput.addEventListener('change', async function(event) {
                        // Your event handling code here
                        log.debug('Input VERBO value changed:', event.target.value);

                        const id = paramsObject['oaid'];
                        const name = event.target.value;

                        const response = await updateVerboOA(id, name);
                        log.debug(response);

                        const responseVerbLevel = await verifyVerbLevel("RAAsignatura", name);
                        log.debug(responseVerbLevel);

                      });



                     /**
                        * Function to create
                    */
                     async function setOAFields() {
                        // ...
                        const id = paramsObject['oaid'];

                        const getOAfields = async (id) => {
                            const response = await ajax.call([{
                                methodname: 'local_yourplugin_get_oa_fields',
                                args: { id }
                            }]);
                            return response[0]; // Assuming ajax.call returns an array and you're interested in the first element
                        };

                        try {
                            const response = await getOAfields(id);
                            log.debug( response[0].name);

                            var storedName = response[0].name;
                            if(storedName != "empty name"){
                                // Select the input element within the container
                                var input = verboInput.querySelector('input');

                                // Set the value of the input element
                                input.value = storedName;
                            }
                        } catch (error) {
                            log.debug('Error fetching OA fields:', error);
                        }
                    }

                    setOAFields();
                // Function to create text input with label
                /**
                * Function to create text input with label
                * @param {string[]} labelText - j
                */
                function createTextInput(labelText) {
                    var container = document.createElement('div');
                    var label = document.createElement('label');
                    label.textContent = labelText;
                    var input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    container.appendChild(label);
                    container.appendChild(input);
                    return container;
                }


                // Create table element
                var tablaTitulo = document.createElement('h3');
                tablaTitulo.textContent = 'Ordenar Topicos:';
                finalidadInput.insertAdjacentElement('afterend', tablaTitulo);
                // var table = document.createElement('table');
                var table = document.getElementsByClassName("generaltable")[0];

                table.id = 'editableTable';
                // Create thead element
                var thead = document.createElement('thead');
                var headerRow = document.createElement('tr');
                ['','Tópico', 'Order', 'Tópico incluido','Orden Tópico incluido','Tópico Parte',
                'Orden Tópico Parte','Ejemplos', 'Actividades']
                .forEach(function(headerText) {
                    var th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Create tbody element with sample data
                var tbody = document.createElement('tbody');
                var rowData = [
                    { name: 'Definición de límite',order: 1,  incluido: {}, parte:{}, ordenParte: "",ejemplos:"",
                    actividades:"Definición de límite - Actividad 1" },
                    { name: 'No existencia de límite',order: 2,  incluido: {}, parte:{},ordenParte: "",ejemplos:"Ejemplo 1",
                    actividades:""  },
                    { name: 'Indeterminaciones',order: 2,  incluido: {"0/0":1,"Inf/Inf":2}, parte:{},ordenParte: "",ejemplos:"",
                    actividades:"0/0 Actividad a,Inf/Inf Actividad b "},
                ];

                rowData.forEach(function(data) {
                    var row = document.createElement('tr');
                    row.style.border = '1px solid black';
                     // Agregar asa de arrastre a la primera celda
                    var dragHandleCell = document.createElement('td');
                    dragHandleCell.className = 'drag-handle';
                    dragHandleCell.textContent = '☰';
                    dragHandleCell.draggable = true; // Asegurar que la celda sea arrastrable
                    row.appendChild(dragHandleCell);

                    Object.keys(data).forEach(function(key) {
                        var td = document.createElement('td');
                        var tdOrdenIncluido = document.createElement('td');
                        if (key === 'incluido') {
                            // Iterate through the object
                            for (const incluido in data[key]) {
                                if (data[key].hasOwnProperty(incluido)) {
                                    var div = document.createElement('div');
                                    div.className = 'draggable';
                                    div.draggable = true;
                                    div.textContent = incluido;
                                    td.appendChild(div);

                                    var divOrdenIncluido = document.createElement('div');
                                    divOrdenIncluido.className = 'draggable';
                                    divOrdenIncluido.draggable = true;
                                    divOrdenIncluido.textContent = data[key][incluido];
                                    tdOrdenIncluido.appendChild(divOrdenIncluido);
                                }
                            }
                            row.appendChild(td);
                            tdOrdenIncluido.style.border = '1px solid black';
                            row.appendChild(tdOrdenIncluido);
                        }
                        else{
                            td.textContent = data[key];
                            row.appendChild(td);
                        }
                        td.style.border = '1px solid black';
                    });
                    tbody.appendChild(row);
                });
                table.appendChild(tbody);

                // Add event listeners to editable cells
                table.addEventListener('click', function(event) {
                    var target = event.target;
                    if (target.classList.contains('editable')) {
                        var value = target.textContent;
                        var input = document.createElement('input');
                        input.type = 'text';
                        input.value = value;
                        input.addEventListener('blur', function() {
                            var newValue = this.value;
                            target.textContent = newValue;
                        });
                        target.textContent = '';
                        target.appendChild(input);
                        input.focus();
                    }
                });

                // Agregar estilos CSS directamente desde JavaScript
                var style = document.createElement('style');
                style.textContent = `
                    .drag-handle {
                        cursor: grab;
                    }
                    .dragging {
                        background-color: lightblue;
                    }
                    .draggable-container {
                        display: flex;
                        flex-direction: column;
                    }
                    .draggable {
                        padding: 10px;
                        border: 1px solid #ccc;
                        background-color: #f9f9f9;
                        margin-bottom: 5px;
                        cursor: move;
                    }
                `;
                document.head.appendChild(style);

                // Agregar eventos de arrastre
                var draggingElement = null;

                // Función para manejar el evento de inicio de arrastre
                /**
                 * Función para manejar el evento de inicio de arrastre.
                 * @param {DragEvent} event - El evento de arrastre.
                 */
                function handleDragStart(event){
                    draggingElement = event.target.closest('tr');
                    draggingElement.classList.add('dragging');
                }

                // Función para manejar el evento de soltar
                /**
                 * Función para manejar el evento de soltar.
                 * @param {DragEvent} event - El evento de soltar.
                 */
                function handleDrop(event) {
                    event.preventDefault();
                    if (draggingElement) {
                        var targetElement = event.target.closest('tr');
                        if (targetElement && targetElement !== draggingElement) {
                            var parent = draggingElement.parentNode;
                            parent.removeChild(draggingElement);
                            var referenceNode = (targetElement.nextSibling &&
                                targetElement.nextSibling.nodeType === Node.ELEMENT_NODE) ?
                                                targetElement.nextSibling : null;
                            parent.insertBefore(draggingElement, referenceNode);
                        }
                        draggingElement.classList.remove('dragging');
                        draggingElement = null;
                    }
                }

                // Agregar eventos de arrastre a las celdas de asa de arrastre
                var dragHandleElements = document.querySelectorAll('.drag-handle');
                dragHandleElements.forEach(function(element) {
                    element.addEventListener('dragstart', handleDragStart);
                });
                tbody.addEventListener('dragover', function(event) {
                    event.preventDefault();
                });
                tbody.addEventListener('drop', handleDrop);

                // Append the table to the container
                tablaTitulo.insertAdjacentElement('afterend', table);

                var editarcrearTitulo = document.createElement('h3');
                editarcrearTitulo.textContent = 'Crear o editar H5P:';
                table.insertAdjacentElement('afterend', editarcrearTitulo);

                var formElements = document.getElementsByTagName("form");
                var h5pform = formElements[1];
                log.debug(h5pform);
                // var metadatosTitulo = document.createElement('h3');
                // metadatosTitulo.textContent = 'Completar Metadatos:';
                // h5pform.insertAdjacentElement('afterend', metadatosTitulo);
                var buttonFin = document.createElement('button');

                buttonFin.setAttribute('id', 'finBtn');
                buttonFin.textContent = 'Finalizar OA';

                // Add event listener to button
                buttonFin.addEventListener('click', async function() {
                    log.debug("CLICKED");

                    // Redirigir a la página de tu plugin local
                    window.location.href = 'http://localhost/local/yourplugin/metadatos.php';
                });

                h5pform.insertAdjacentElement('afterend', buttonFin);

                let draggedElement = null;

                document.querySelectorAll('.draggable').forEach(item => {
                    item.addEventListener('dragstart', function(e) {
                        draggedElement = this;
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('text/html', this.innerHTML);
                    });

                    item.addEventListener('dragover', function(e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                        return false;
                    });

                    item.addEventListener('drop', function(e) {
                        if (e.stopPropagation) {
                            e.stopPropagation();
                        }

                        if (draggedElement !== this) {
                            draggedElement.innerHTML = this.innerHTML;
                            this.innerHTML = e.dataTransfer.getData('text/html');
                        }

                        return false;
                    });
                });



            });
        }
    };
});