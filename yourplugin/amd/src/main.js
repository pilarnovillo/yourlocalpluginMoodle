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
                var rasAsignaturaArray = [];
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

                var resultadoAprendizajeOA = {"raasignatura":[],
                                                "verbo":"",
                                                "objeto":"",
                                                "condicion":"",
                                                "finalidad":""
                };

                //Variable para almacenar los topicos id seleccionados y luego mandar a la Ontologia
                var selectedTopics = [];

                // Create form elements
                    // var selectTopicosH5P = [];
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
                        // Recorriendo el JSON para obtener la estructura deseada
                        for (const asignaturaUri in datos) {
                            const asignatura = datos[asignaturaUri];

                            for (const raasignatura in asignatura.RAsAsignatura){
                                rasAsignaturaArray.push(raasignatura);
                            }

                            for (const contenidoUri in asignatura.contenidosMinimo) {
                                const contenido = asignatura.contenidosMinimo[contenidoUri];

                                for (const unidadUri in contenido.unidades) {
                                    const unidad = contenido.unidades[unidadUri];
                                    let temasYTopicos = [];
                                    for (const temaUri in unidad.temas) {
                                        let topicos = [];
                                        let topicosYsubs = [];
                                        const tema = unidad.temas[temaUri];

                                        for (const topicoUri in tema.topicos) {
                                            let partes = [];
                                            // console.log(`Partes: ${topico.partes}`);
                                            // console.log(`Soportes: ${topico.soportes}`);
                                            const topico = tema.topicos[topicoUri];
                                            for (const parteUri in topico.partes) {
                                                partes.push(parteUri
                                                            .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""));
                                            }
                                            topicos.push(topicoUri
                                                        .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""));
                                            topicosYsubs.push({"topico":topicoUri,
                                                                "partes":partes});
                                        }
                                        temasYTopicos.push({tema: temaUri
                                            .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                                            topicos: topicos,
                                            topicosYsubs: topicosYsubs});


                                    }
                                    unidadesConTemasYTopicos.push({
                                        unidad: unidadUri
                                        .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                                        temasYTopicos: temasYTopicos
                                    });

                            }
                            }
                        }
                        // let unidadesConTemasYTopicos = [];
                        // datos.contenidosMinimo.forEach(contenido => {
                        //     contenido.unidades.forEach(unidad => {
                        //         let temasYTopicos = unidad.temas.map(tema => ({
                        //             tema: tema.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                        //             topicos: tema.topicos.map(topico =>
                        //                 topico.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""))
                        //         }));
                        //         unidadesConTemasYTopicos.push({
                        //             unidad: unidad.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                        //             temasYTopicos: temasYTopicos
                        //         });
                        //     });
                        // });
                        return unidadesConTemasYTopicos;
                    }

                     // Crear la opción por defecto
                    var defaultOption = document.createElement('option');
                    defaultOption.text = 'Seleccione una opción';
                    defaultOption.value = '';
                    defaultOption.disabled = true;
                    defaultOption.selected = true;

                    // Crear el elemento select
                    var select = document.createElement('select');
                    select.setAttribute('id', 'id_unidadSelect');
                    select.appendChild(defaultOption);

                    // Obtener las unidades con sus temas y tópicos y añadirlas al select como opciones
                    var unidadesConTemasYTopicos = obtenerUnidadesConTemasYTopicos(datos);
                    var temasTopicosDic = {};

                    unidadesConTemasYTopicos.forEach(function(unidadConTemasYTopicos) {
                        var option = document.createElement('option');
                        option.textContent = unidadConTemasYTopicos.unidad;
                        option.value = unidadConTemasYTopicos.unidad.toUpperCase().replace(/\s+/g, '_');
                        option.dataset.temasYTopicos = JSON.stringify(unidadConTemasYTopicos.temasYTopicos); // Guardar los temas y
                        // log.debug("topicosYsubs:"+JSON.stringify(unidadConTemasYTopicos.temasYTopicos));
                        select.appendChild(option);
                        var i = 1;
                        //info for table later
                        unidadConTemasYTopicos.temasYTopicos.forEach(function(tema){

                            tema.topicosYsubs.forEach(function(topico){
                                temasTopicosDic[topico.topico
                                    .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", "")
                                    .toUpperCase().replace(/\s+/g, '_')]={
                                    name: topico.topico
                                    .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                                    order: i,
                                    incluido: {},
                                    parte: topico.partes,
                                    soporte: {}};
                                i++;
                            });
                        });

                    });
                    // log.debug("temasTopicosDic: "+JSON.stringify(temasTopicosDic));
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
                    select.addEventListener('change', function(event) {//TODO si se cambia la Unidad se
                                                         // deseleccionan todos los topicos, borrar del array
                        // selectTopicosH5P = [];
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

                                // log.debug(selectTopicosH5P);
                                label.prepend(checkbox);

                                liTopico.appendChild(label);
                                liTopico.style.marginLeft = '20px'; // Sangría para los tópicos
                                ul.appendChild(liTopico);

                                //enventlistener para armar los datos que van en la tabla
                                checkbox.addEventListener('change', function(event) {
                                    // Check the state of the checkbox
                                    if (event.target.checked) {
                                        var tableRow = {name: temasTopicosDic[event.target.value].name,
                                            order: temasTopicosDic[event.target.value].order,
                                            incluido: {},
                                            parte: temasTopicosDic[event.target.value].parte,
                                            ejemplos:"",
                                            actividades:"Definición de límite - Actividad 1"
                                        };
                                        var select = document.getElementById('menutopic');
                                        var option = document.createElement('option');
                                        option.textContent = temasTopicosDic[event.target.value].name;
                                        option.value = event.target.value;
                                        select.appendChild(option);
                                        fillTable(tableRow, event.target.value);
                                    } else {
                                        removeItemFromTable(event.target.value);
                                        var select = document.getElementById('menutopic');
                                        removeOptionByValue(select,event.target.value);
                                    }
                                });
                            });
                        });

                        // var select = document.getElementById('menutopic');
                        // if(select){
                        //     var options = selectTopicosH5P;
                        //     // log.debug(selectTopicosH5P);
                        //     options.forEach(function(optionText) {
                        //         var option = document.createElement('option');
                        //         option.textContent = optionText;
                        //         option.value = optionText.toUpperCase().replace(/\s+/g, '_');
                        //         select.appendChild(option);
                        //     });
                        // }
                    });

                    var seleccionarRAsTitulo = document.createElement('h3');
                    seleccionarRAsTitulo.textContent = 'Seleccionar Resultados de Aprendizaje de la Asignatura:';

                    var checkboxesContainer = document.createElement('div'); // Add multiple select element
                    checkboxesContainer.setAttribute('id', 'resultadoAprendizaje'); // Set attributes for multiple select element
                    var resultadosAprendizaje = rasAsignaturaArray;
                    log.debug("resultadosAprendizaje: "+resultadosAprendizaje);

                    resultadosAprendizaje.forEach(function(raText) {
                        raText = raText.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#","");
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = raText;//.toUpperCase().replace(/\s+/g, '_'); TODO ver si es necesario
                        var label = document.createElement('label');
                        label.textContent = raText;
                        label.appendChild(checkbox);
                        checkboxesContainer.appendChild(label);

                        // Crear y añadir un elemento <br> después del label
                        var br = document.createElement('br');
                        checkboxesContainer.appendChild(br);

                        //enventlistener para armar los datos que van en la ontologia
                        checkbox.addEventListener('change', function(event) {
                            // Check the state of the checkbox
                            if (event.target.checked) {
                                //TODO enviar a la ontologia en el momento?
                                resultadoAprendizajeOA["raasignatura"].push(event.target.value);

                            } else {
                                //Eliminar ra del array
                                for (let i = resultadoAprendizajeOA["raasignatura"].length - 1; i >= 0; i--) {
                                    if (resultadoAprendizajeOA["raasignatura"][i] === event.target.value) {
                                        resultadoAprendizajeOA["raasignatura"].splice(i, 1);
                                    }
                                }
                            }
                            // log.debug("resultadoAprendizajeOA: "+resultadoAprendizajeOA["raasignatura"]);
                        });
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

                        resultadoAprendizajeOA["verbo"] = event.target.value;
                        // log.debug(resultadoAprendizajeOA["verbo"]);

                        const id = paramsObject['oaid'];
                        const name = event.target.value;

                        const response = await updateVerboOA(id, name);
                        log.debug(response);

                        const responseVerbLevel = await verifyVerbLevel("RAAsignatura", name);
                        log.debug(responseVerbLevel);

                      });



                     /**
                        * Function to create
                        * Manejo de traer las cosas seleccionadas de OA ya creados pero no terminados
                        *seleccionar la unidad y los topicos
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

                                var selectUnidad = document.getElementById("id_unidadSelect");

                                //TODO eliminar hardcodeo como es la relacion de OA a UNIDAD?
                                const getOATopicsFromOntology = (
                                    oaid
                                ) => ajax.call([{
                                    methodname: 'local_yourplugin_get_oa_topics',
                                    args: {
                                        oaid
                                    },
                                }])[0];
                                var topicosOntologia = [];
                                try {
                                    const responseOATopicsFromOntology = await getOATopicsFromOntology(paramsObject['oaid']);
                                    log.debug("Getting topics:");
                                    log.debug(responseOATopicsFromOntology);
                                    responseOATopicsFromOntology.forEach(topico => {
                                        var valueTopico = topico.topic
                                        .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", "");
                                        topicosOntologia.push(valueTopico);
                                    });
                                } catch (error) {
                                    log.debug('Error fetching OA Topicos: ', error);
                                    log.debug( error);
                                }

                                var selectedOption = Array.from(selectUnidad.options).find(option => option.value === 'MADUNIDAD1');

                                selectUnidad.value = selectedOption.value;

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

                                        // log.debug(selectTopicosH5P);
                                        label.prepend(checkbox);

                                        liTopico.appendChild(label);
                                        liTopico.style.marginLeft = '20px'; // Sangría para los tópicos
                                        ul.appendChild(liTopico);

                                        // Establecer el checkbox como seleccionado TODO implemenrar una lista que venga
                                        // desde la ontologia con la data
                                        if(topicosOntologia.includes(checkbox.value)){
                                            checkbox.checked = true;
                                            var tableRow = {name: temasTopicosDic[checkbox.value].name,
                                                order: temasTopicosDic[checkbox.value].order,
                                                incluido: {},
                                                parte: temasTopicosDic[checkbox.value].parte,
                                                ejemplos:"",
                                                actividades:"Definición de límite - Actividad 1"
                                            };
                                            var select = document.getElementById('menutopic');
                                            var option = document.createElement('option');
                                            option.textContent = temasTopicosDic[checkbox.value].name;
                                            option.value = checkbox.value;
                                            select.appendChild(option);
                                            fillTable(tableRow, checkbox.value);
                                        }

                                        //enventlistener para armar los datos que van en la tabla/ontologia
                                        checkbox.addEventListener('change', async function(event) {
                                            //Guardar los topicos seleccionados en la Ontologia (MEJOR GUARDAR AUTOMATICALLY
                                                //                  menos llamadas a la ontolgia?? Pero si deselecciono uno?)
                                                const guardarTopicoOA = (
                                                    idTopico,
                                                    oaid,
                                                    selected,//boolean que indica si es para almacenar en el oa o eliminar
                                                ) => ajax.call([{
                                                    methodname: 'local_yourplugin_guardar_topico_oa',
                                                    args: {
                                                        idTopico,
                                                        oaid,
                                                        selected
                                                    },
                                                }])[0];

                                            // Check the state of the checkbox
                                            if (event.target.checked) {
                                                var tableRow = {name: temasTopicosDic[event.target.value].name,
                                                    order: temasTopicosDic[event.target.value].order,
                                                    incluido: {},
                                                    parte: temasTopicosDic[event.target.value].parte,
                                                    ejemplos:"",
                                                    actividades:"Definición de límite - Actividad 1"
                                                };
                                                var select = document.getElementById('menutopic');
                                                var option = document.createElement('option');
                                                option.textContent = temasTopicosDic[event.target.value].name;
                                                option.value = event.target.value;
                                                select.appendChild(option);
                                                fillTable(tableRow, event.target.value);

                                                const response = await guardarTopicoOA(event.target.value,
                                                    paramsObject['oaid'], true);
                                                log.debug(response);

                                                //Agregar topico a la lista para luego mandarlo a la ontologia
                                                // selectedTopics.push(event.target.value);
                                            } else {
                                                removeItemFromTable(event.target.value);
                                                var select = document.getElementById('menutopic');
                                                removeOptionByValue(select,event.target.value);

                                                const response = await guardarTopicoOA(event.target.value,
                                                    paramsObject['oaid'], false);
                                                log.debug(response);
                                                // selectedTopics.filter(event.target.value);
                                            }
                                        });
                                    });
                                });
                                //RA Asignatura

                                const getOAFromOntology = (
                                    id
                                ) => ajax.call([{
                                    methodname: 'local_yourplugin_get_oa_ontology',
                                    args: {
                                        id
                                    },
                                }])[0];

                                try {
                                    const responseOAFromOntology = await getOAFromOntology(id);
                                    responseOAFromOntology.forEach(ra => {
                                        var valueRaAsig = ra.raasig
                                        .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", "");
                                        let checkboxRaAsig = document
                                        .querySelectorAll(`#resultadoAprendizaje input[type="checkbox"][value="${valueRaAsig}"]`);
                                        checkboxRaAsig[0].checked = true;
                                    });
                                } catch (error) {
                                    log.debug('Error fetching OA RAsAsig: ', error);
                                    log.debug( error);
                                }

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

                /**
                     * remove item from table
                     *
                     * @param {String} id - El id de datos.
                */
                function removeItemFromTable(id) {
                    const row = tbody.querySelector(`tr[id="${id}"]`);
                    if (row) {
                        tbody.removeChild(row);
                    }
                }

                /**
                     * remove item from select
                     *@param {HTMLElement} select - El id de datos.
                     * @param {String} value - El id de datos.
                */
                function removeOptionByValue(select,value) {
                    // var select = document.getElementById(selectId);
                    var options = select.options;
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].value === value) {
                            select.remove(i);
                            break;
                        }
                    }
                }
                 /**
                     * fill table
                     *
                     * @param {Array<Object>} data - El array de datos.
                     * @param {String} id - El id de datos.
                */
                function fillTable(data, id) {
                    // rowData.forEach(function(data) {
                        var row = document.createElement('tr');
                        row.setAttribute("id",id);
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
                    // });
                }

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
                    window.location.href = 'http://localhost/local/yourplugin/metadatos.php?courseid=' + paramCourseid
                    + '&oaid=' + paramsObject['oaid'];
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

                /**
                     * saveChanges
                     *
                */
                async function saveChanges() {
                    // fetch('/save_changes.php', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({ /* datos a guardar */ }),
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     console.log('Success:', data);
                    // })
                    // .catch((error) => {
                    //     console.error('Error:', error);
                    // });
                    const saveChangesOnOntology = (
                        oaid,
                        raoa,
                        contenidos,
                        actividades,
                        metadatos,
                    ) => ajax.call([{
                        methodname: 'local_yourplugin_save_changes_automatically',
                        args: {
                            oaid,
                            raoa,
                            contenidos,
                            actividades,
                            metadatos,
                        },
                    }])[0];

                    var input = verboInput.querySelector('input');
                    resultadoAprendizajeOA["verbo"] = input.value;
                    log.debug("resultadoAprendizajeOA:",resultadoAprendizajeOA["verbo"]);
                    const saveChangesOnOntologyResponse =
                     await saveChangesOnOntology(paramsObject['oaid'], resultadoAprendizajeOA, selectedTopics,[],[]);
                    log.debug(saveChangesOnOntologyResponse);
                    log.debug("RUN saveChanges");
                }
                var input = verboInput.querySelector('input');
                log.debug("verbo: ", input.value);
                setInterval(saveChanges, 150000); // Cada 5 minutos

                var saveChangesButtonH5P = document.getElementById('id_submitbutton');
                log.debug("saveChangesButton:" + saveChangesButtonH5P);
                log.debug(saveChangesButtonH5P);

                //move error message to correct place
                var errorMessage = document.getElementById("error-message");
                if (errorMessage){
                    saveChangesButtonH5P.insertAdjacentElement('afterend', errorMessage);
                }
                // if(saveChangesButtonH5P){
                    // saveChangesButtonH5P.addEventListener('click', function(event) {
                        // event.preventDefault();
                        // // Create the modal dialog
                        // var modal = document.createElement('div');
                        // modal.style.position = 'fixed';
                        // modal.style.top = '50%';
                        // modal.style.left = '50%';
                        // modal.style.transform = 'translate(-50%, -50%)';
                        // modal.style.zIndex = '1000';
                        // modal.style.padding = '20px';
                        // modal.style.backgroundColor = 'white';
                        // modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

                        // var question = document.createElement('p');
                        // question.textContent = 'Are you sure you want to continue?';
                        // modal.appendChild(question);

                        // var cancelButton = document.createElement('button');
                        // cancelButton.textContent = 'Cancel';
                        // cancelButton.addEventListener('click', function() {
                        //     // event.preventDefault();
                        //     // Find the H5P editor container element
                        //     // var h5pEditorContainer = $('.h5p-editor');

                        //     // // Check if the container is found
                        //     // if (h5pEditorContainer) {
                        //     //     // Get the H5P editor instance from the container
                        //     //     // var H5P;
                        //     //     // Use H5P here
                        //     //     var h5pEditorInstance = window.H5P.jQuery(h5pEditorContainer).data('h5peditor');
                        //     //     // Check if the editor instance is found
                        //     //     if (h5pEditorInstance) {
                        //     //         log.debug('H5P Editor instance found:', h5pEditorInstance);

                        //     //         // Get the current content of the H5P editor
                        //     //         h5pEditorInstance.getContent(function(content) {
                        //     //             log.debug('H5P Editor content:', content);
                        //     //         });
                        //     //     } else {
                        //     //         log.debug('H5P editor instance not found');
                        //     //     }
                        //     // } else {
                        //     //     log.debug('H5P editor container not found');
                        //     // }
                        //     // var h5peditor;
                        //     // const editor = $('.h5p-editor');
                        //     // const library = $('input[name="h5plibrary"]');
                        //     // const params = $('input[name="h5pparams"]');
                        //     // if (h5peditor === undefined) {
                        //     //     h5peditor = new ns.Editor(library.val(), params.val(), editor[0]);
                        //     // }
                        //     // h5peditor.getContent(function(content) {
                        //     //     log.debug('H5P Editor content:', content);
                        //     // });
                        //     log.debug('Logging form fields:');
                        //     Array.from(document.getElementById('coolh5peditor').elements).forEach(element => {
                        //         if (element.name) {
                        //             log.debug(element.name + ': ' + element.value);
                        //         }
                        //     });
                        //     // Get form data
                        //     var formData = new FormData(document.getElementById('coolh5peditor'));
                        //     formData.forEach(function(value, key){
                        //         log.debug(key + ': ' + value);
                        //     });
                        //     document.body.removeChild(modal);
                        // });
                        // modal.appendChild(cancelButton);

                        // var continueButton = document.createElement('button');
                        // continueButton.textContent = 'Continue';
                        // continueButton.style.marginLeft = '10px';
                        // continueButton.addEventListener('click', function() {
                        //     // Perform the new action here
                        //     document.body.removeChild(modal);
                        //     document.getElementById('coolh5peditor').submit();
                        // });
                        // modal.appendChild(continueButton);

                        // document.body.appendChild(modal);
                    // });
                // }
            });
        }
    };
});
