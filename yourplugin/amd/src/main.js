/*eslint linebreak-style: ["error", "windows"]*/
// define(['jquery','core/log', 'core_h5p/editor_display'], function($, log, Editor){
// define(['jquery','core/log','editor_atto'], function($, log, editor_atto){
// import call  from 'core/ajax';
define(['jquery','core/log','core/ajax','core/modal_factory','core/modal_events',
    'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js'], function($, log, ajax, ModalFactory,
    ModalEvents, Sortable){
    log.debug('Your module is loading2.');
    return {
        init: function(datos_json) {
            $(document).ready(function(){
                // Convertir los datos JSON de PHP a objetos JavaScript
                var datos = JSON.parse(datos_json);
                var datosCopyAux = datos.unidades;
                // Hacer algo con los datos
                log.debug(datos);
                var rasAsignaturaArray = datos.raAsignaturaList;
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

                var resultadoAprendizajeOA = {"raasignatura":[],
                                                "verbo":"",
                                                "objeto":"",
                                                "condicion":"",
                                                "finalidad":""
                };
                let selectedTopics = [];
                var treeData = [];
                const sortableTreeDiv = document.createElement('div');

                //Variable para almacenar los topicos id seleccionados y luego mandar a la Ontologia
                // var selectedTopics = [];

                // Create form elements
                    // var selectTopicosH5P = [];
                    var seleccionarUnidadTitulo = document.createElement('h3');
                    seleccionarUnidadTitulo.textContent = 'Seleccionar Unidad y Topicos:';

                    // /**
                    //  * Obtiene todas las unidades de los contenidos mínimos en el objeto de datos.
                    //  *
                    //  * @param {Object} datos - El objeto que contiene los OA
                    //  * @returns {string[]} Array de URIs de todas las unidades.
                    //  */
                    // function obtenerUnidadesConTemasYTopicos(datos) {
                    //     let unidadesConTemasYTopicos = [];
                    //     // Recorriendo el JSON para obtener la estructura deseada
                    //     for (const asignaturaUri in datos) {
                    //         const asignatura = datos[asignaturaUri];

                    //         for (const raasignatura in asignatura.RAsAsignatura){
                    //             rasAsignaturaArray.push(raasignatura);
                    //         }

                    //         for (const contenidoUri in asignatura.contenidosMinimo) {
                    //             const contenido = asignatura.contenidosMinimo[contenidoUri];

                    //             for (const unidadUri in contenido.unidades) {
                    //                 const unidad = contenido.unidades[unidadUri];
                    //                 let temasYTopicos = [];
                    //                 for (const temaUri in unidad.temas) {
                    //                     let topicos = [];
                    //                     let topicosYsubs = [];
                    //                     const tema = unidad.temas[temaUri];

                    //                     for (const topicoUri in tema.topicos) {
                    //                         let partes = [];
                    //                         // console.log(`Partes: ${topico.partes}`);
                    //                         // console.log(`Soportes: ${topico.soportes}`);
                    //                         const topico = tema.topicos[topicoUri];
                    //                         for (const parteUri in topico.partes) {
                    //                             partes.push(parteUri
                    //                                         .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""));
                    //                         }
                    //                         topicos.push(topicoUri
                    //                                     .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""));
                    //                         topicosYsubs.push({"topico":topicoUri,
                    //                                             "partes":partes});
                    //                     }
                    //                     temasYTopicos.push({tema: temaUri
                    //                         .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                    //                         topicos: topicos,
                    //                         topicosYsubs: topicosYsubs});


                    //                 }
                    //                 unidadesConTemasYTopicos.push({
                    //                     unidad: unidadUri
                    //                     .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                    //                     temasYTopicos: temasYTopicos
                    //                 });

                    //         }
                    //         }
                    //     }
                    //     // let unidadesConTemasYTopicos = [];
                    //     // datos.contenidosMinimo.forEach(contenido => {
                    //     //     contenido.unidades.forEach(unidad => {
                    //     //         let temasYTopicos = unidad.temas.map(tema => ({
                    //     //             tema: tema.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                    //     //             topicos: tema.topicos.map(topico =>
                    //     //                 topico.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""))
                    //     //         }));
                    //     //         unidadesConTemasYTopicos.push({
                    //     //             unidad: unidad.uri.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                    //     //             temasYTopicos: temasYTopicos
                    //     //         });
                    //     //     });
                    //     // });
                    //     return unidadesConTemasYTopicos;
                    // }

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

                    // Cargar unidades en la lista desplegable
                    // const unidadSelect = document.getElementById('unidadSelect');
                    datos.unidades.forEach((unidad, index) => {
                        const option = document.createElement('option');
                        option.value = index; // Guardar el índice para referencia
                        option.textContent = unidad.nombre;
                        option.id = unidad.id;
                        select.appendChild(option);
                    });

                    // Obtener las unidades con sus temas y tópicos y añadirlas al select como opciones
                    // var unidadesConTemasYTopicos = obtenerUnidadesConTemasYTopicos(datos);
                    // var temasTopicosDic = {};

                    // unidadesConTemasYTopicos.forEach(function(unidadConTemasYTopicos) {
                    //     var option = document.createElement('option');
                    //     option.textContent = unidadConTemasYTopicos.unidad;
                    //     option.value = unidadConTemasYTopicos.unidad.toUpperCase().replace(/\s+/g, '_');
                    //     option.dataset.temasYTopicos = JSON.stringify(unidadConTemasYTopicos.temasYTopicos);
                    // Guardar los temas y
                    //     // log.debug("topicosYsubs:"+JSON.stringify(unidadConTemasYTopicos.temasYTopicos));
                    //     select.appendChild(option);
                    //     var i = 1;
                    //     //info for table later
                    //     unidadConTemasYTopicos.temasYTopicos.forEach(function(tema){

                    //         tema.topicosYsubs.forEach(function(topico){
                    //             temasTopicosDic[topico.topico
                    //                 .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", "")
                    //                 .toUpperCase().replace(/\s+/g, '_')]={
                    //                 name: topico.topico
                    //                 .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", ""),
                    //                 order: i,
                    //                 incluido: {},
                    //                 parte: topico.partes,
                    //                 soporte: {}};
                    //             i++;
                    //         });
                    //     });

                    // });
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
                    var selectedIndex = null;
                    // Manejar el cambio de selección de unidad
                    select.addEventListener('change', (event) => {
                        selectedIndex = event.target.value;
                        // const temasContainer = document.getElementById('temasContainer');
                        ul.innerHTML = ''; // Limpiar contenido anterior
                        selectedTopics = [];

                        if (selectedIndex !== '') {
                            //TODO guardar unidad en la ontologia
                            //implement new service to store de unidad

                            const temas = datos.unidades[selectedIndex].temas;
                            const temasList = document.createElement('div');

                            temas.forEach(tema => {
                                const checkboxDiv = document.createElement('div');
                                const label = document.createElement('label');
                                label.htmlFor = tema.id;
                                label.textContent = tema.nombre;
                                label.id = tema.id;
                                checkboxDiv.appendChild(label);

                                // Botón para agregar subtemas
                                const addSubtemaButton = document.createElement('button');
                                addSubtemaButton.textContent = '+';
                                addSubtemaButton.style.cssText = 'background-color: transparent; border: none;'+
                                ' color: grey; font-size: 14px; cursor: pointer; margin-left: 10px;';
                                checkboxDiv.appendChild(addSubtemaButton);

                                temasList.appendChild(checkboxDiv);

                                // Iniciar la función recursiva para el primer nivel
                                agregarNuevoTopico(checkboxDiv,tema.id, addSubtemaButton, 1, tema.id);

                                // Llamar a la función recursiva para agregar tópicos
                                agregarTopicos(tema.topicos, tema.id, temasList, 1, tema.id, "parte");

                                // Llamar a la función recursiva para agregar tópicos
                                agregarTopicos(tema.topicosSoporte, tema.id, temasList, 1, tema.id, "soporte");
                            });

                            ul.appendChild(temasList);
                        }
                    });


                    // Función recursiva para agregar subtemas
                    const agregarNuevoTopico = (parentElement, parentName, addSubtemaButton, nivel, tema) => {
                        addSubtemaButton.addEventListener('click', async () => {
                            await ModalFactory.create({
                                type: ModalFactory.types.SAVE_CANCEL,
                                title: 'Agregar subtema',
                                body: `
                                    <form id="subtopicForm">
                                        <div class="form-group">
                                            <label for="topicoSoporte">Posibles Topico Soporte</label>
                                            <select id="topicoSoporte" class="form-control" required>
                                                <!-- Options will be added dynamically here -->
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="subtopicName">Nombre</label>
                                            <input type="text" id="subtopicName" class="form-control" 
                                            placeholder="Ingresar nombre" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="subtopicRelation">Relación</label>
                                            <select id="subtopicRelation" class="form-control" required>
                                                <option value="parte">Parte</option>
                                                <option value="tipo">Tipo</option>
                                                <option value="soporte">Soporte</option>
                                            </select>
                                        </div>
                                    </form>`, // Formulario con campos de texto y select
                                removeOnClose: true,
                            }).then(function (modalVar) {
                                modalVar.setSaveButtonText('Guardar');

                                // Función recursiva para obtener temas y subtemas (parte y tipo)
                                const obtenerTemasYSubtemas = (unidad, temaActual) => {
                                    let resultados = [];

                                    // Función recursiva que extrae temas, partes y tipos
                                    const extraerTopicos = (topico, nivel = 0) =>{
                                        // Añadir el tópico actual al resultado
                                        resultados.push({
                                            nombre: topico.nombre,
                                            id: topico.id,
                                            nivel: nivel
                                        });

                                        // Recorrer las partes del tópico
                                        if (topico.parte && topico.parte.length > 0) {
                                            topico.parte.forEach(subParte => {
                                                extraerTopicos(subParte, nivel + 1); // Recursión para partes
                                            });
                                        }

                                        // Recorrer los tipos del tópico
                                        if (topico.tipo && topico.tipo.length > 0) {
                                            topico.tipo.forEach(subTipo => {
                                                extraerTopicos(subTipo, nivel + 1); // Recursión para tipos
                                            });
                                        }
                                    };

                                    // Recorrer los temas de la unidad
                                    unidad.temas.forEach(tema => {
                                        if (tema.id !== temaActual) {
                                        // Añadir el tema principal
                                        resultados.push({
                                            nombre: tema.nombre,
                                            id: tema.id,
                                            nivel: 0
                                        });

                                        // Recorrer los tópicos de cada tema
                                        tema.topicos.forEach(topico => {
                                            extraerTopicos(topico, 1); // Recursión para tópicos
                                        });
                                        }
                                    });

                                    return resultados;
                                };

                                // Obtener los temas y subtemas de la unidad
                                const temasYSubtemas = obtenerTemasYSubtemas(datosCopyAux[selectedIndex], tema.split('-')[0]);
                                log.debug("temasYSubtemas:");
                                log.debug(temasYSubtemas);

                                let root = modalVar.getRoot();

                                root.on(ModalEvents.save, function () {
                                    const topicName = document.getElementById('subtopicName').value;
                                    const topicRelation = document.getElementById('subtopicRelation').value;

                                    // Función para agregar un subtema a un tópico
                                    const guardarSubtema = (unidad, nombreTopico, nuevoSubtema, tipoRelacion) =>{
                                        // Recorre cada tema en la unidad
                                        unidad.temas.forEach(tema => {
                                            // Verifica si el nombre del tópico coincide con el tema
                                            if (tema.id === nombreTopico) {
                                                // Crea el nuevo subtema
                                                const subtema = {
                                                    nombre: nuevoSubtema,
                                                    parte: [],
                                                    tipo: [],
                                                    soporte: []
                                                };

                                                // Agrega el subtema en la lista correspondiente según el tipo de relación
                                                if (tipoRelacion === 'soporte') {
                                                    tema.topicosSoporte.push(subtema);
                                                }else  {
                                                    tema.topicos.push(subtema);
                                                }
                                                return; // Sale de la función después de agregar el subtema
                                            }
                                            // Recorre cada tópico dentro del tema
                                            tema.topicos.forEach(topico => {
                                                // Llama a la función recursiva para encontrar el tópico
                                                buscarYGuardarSubtema(topico, nombreTopico, nuevoSubtema, tipoRelacion);
                                            });
                                        });
                                    };

                                    // Función recursiva para buscar el tópico y agregar el subtema
                                    const buscarYGuardarSubtema=(topico, nombreTopico, nuevoSubtema, tipoRelacion)=> {
                                        // Verifica si el nombre del tópico coincide
                                        if (topico.id === nombreTopico) {
                                            // Crea el nuevo subtema
                                            const subtema = {
                                                nombre: nuevoSubtema,
                                                id: nuevoSubtema,
                                                parte: [],
                                                tipo: [],
                                                soporte: []
                                            };

                                            // Agrega el subtema en la lista correspondiente según el tipo de relación
                                            if (tipoRelacion === 'parte') {
                                                topico.parte.push(subtema);
                                            } else if (tipoRelacion === 'tipo') {
                                                topico.tipo.push(subtema);
                                            } else if (tipoRelacion === 'soporte') {
                                                topico.soporte.push(subtema);
                                            }
                                            return; // Sale de la función después de agregar el subtema
                                        }

                                        // Si el tópico tiene partes, busca recursivamente en ellas
                                        if (topico.parte && topico.parte.length > 0) {
                                            topico.parte.forEach(subParte => {
                                                buscarYGuardarSubtema(subParte, nombreTopico, nuevoSubtema, tipoRelacion);
                                            });
                                        }

                                        // Si el tópico tiene tipos, busca recursivamente en ellas
                                        if (topico.tipo && topico.tipo.length > 0) {
                                            topico.tipo.forEach(subParte => {
                                                buscarYGuardarSubtema(subParte, nombreTopico, nuevoSubtema, tipoRelacion);
                                            });
                                        }
                                    };

                                    if (topicName && topicRelation) {
                                        //TODO implemantar en la ontologia

                                        guardarSubtema(datosCopyAux[selectedIndex], parentName, topicName, topicRelation);

                                        // Crear un nuevo subtema
                                        const newSubtopicDiv = document.createElement('div');
                                        newSubtopicDiv.style.marginLeft = `${nivel * 20}px`;
                                        const newSubtopicCheckbox = document.createElement('input');
                                        newSubtopicCheckbox.type = 'checkbox';
                                        newSubtopicCheckbox.id = topicName;
                                        newSubtopicCheckbox.setAttribute('data-parent', parentName);
                                        newSubtopicCheckbox.setAttribute('data-level', nivel);
                                        newSubtopicCheckbox.setAttribute('data-tema', tema+'-'+topicName);
                                        newSubtopicCheckbox.setAttribute('data-relation', topicRelation);
                                        addEventListenerToCheckbox(newSubtopicCheckbox);
                                        newSubtopicDiv.appendChild(newSubtopicCheckbox);

                                        const newSubtopicLabel = document.createElement('label');
                                        newSubtopicLabel.htmlFor = topicName;
                                        newSubtopicLabel.textContent = `${topicName} (${topicRelation})`;
                                        newSubtopicDiv.appendChild(newSubtopicLabel);

                                        var newAddSubtemaButton = null;
                                        if(!(topicRelation ==="soporte")){
                                            // Botón para agregar más subtemas
                                            newAddSubtemaButton = document.createElement('button');
                                            newAddSubtemaButton.textContent = '+';
                                            newAddSubtemaButton.style.cssText = 'background-color: transparent; border: ' +
                                                'none; color: grey; font-size: 14px; cursor: pointer; margin-left: 10px;';
                                            newSubtopicDiv.appendChild(newAddSubtemaButton);

                                            // Llamar de nuevo a la función recursiva para que el nuevo subtema tena el boton
                                            agregarNuevoTopico(newSubtopicDiv, topicName, newAddSubtemaButton, nivel + 1,
                                                tema+'-'+topicName);
                                        }

                                        // Agregar el subtema al contenedor padre
                                        parentElement.appendChild(newSubtopicDiv);

                                        // modalVar.hide(); // Ocultar el modal después de agregar el subtema
                                    } else {
                                        log.debug('Formulario inválido');
                                    }
                                });

                                root.on(ModalEvents.cancel, function () {
                                    modalVar.hide();
                                });

                                modalVar.show();
                            });
                        });
                    };

                    // Función recursiva para agregar tópicos
                    /**
                     * Función recursiva para agregar tópicos en un contenedor con checkbox, respetando la jerarquía de anidamiento.
                     * @param {Array} topicos - Array de tópicos que pueden contener subcategorías (parte, tipo, soporte).
                     * @param {String} parentName - parentName
                     * @param {HTMLElement} container - El contenedor HTML donde se añadirán los checkbox y etiquetas.
                     * @param {number} level - El nivel de profundidad actual en la jerarquía de tópicos, usado para la recursión.
                     * @param {String} tema - tema al que pertenece el topico
                     * @param {String} topicRelation - relacion con el topico padre, si es soporte no puede tener hijos
                     */
                    function agregarTopicos(topicos, parentName, container, level, tema, topicRelation) {
                        if (topicos.length === 0) {return;} // Salir si no hay tópicos

                        const checkboxList = document.createElement('div');
                        checkboxList.className = 'checkbox-list';

                        topicos.forEach(topico => {
                            const checkboxDiv = document.createElement('div');
                            // Aplicar tabulación basada en el nivel
                            checkboxDiv.style.marginLeft = `${level * 20}px`; // Indentar por nivel (20px por cada nivel)

                            // Crear checkbox para cada tópico
                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.id = topico.id;
                            checkbox.setAttribute('data-parent', parentName);
                            checkbox.setAttribute('data-level', level);
                            checkbox.setAttribute('data-tema', tema+'-'+topico.id);
                            checkbox.setAttribute('data-relation', topicRelation);
                            addEventListenerToCheckbox(checkbox);
                            checkboxDiv.appendChild(checkbox);

                            // Crear label para cada checkbox
                            const label = document.createElement('label');
                            label.htmlFor = topico.id;
                            label.textContent = topico.nombre;
                            checkboxDiv.appendChild(label);

                            if(!(topicRelation ==="soporte")){
                                // Botón para agregar subtemas
                                const addSubtemaButton = document.createElement('button');
                                addSubtemaButton.textContent = '+';
                                addSubtemaButton.style.cssText = 'background-color: transparent; border: none;'+
                                    ' color: grey; font-size: 14px; cursor: pointer; margin-left: 10px;';
                                checkboxDiv.appendChild(addSubtemaButton);

                                // Iniciar la función recursiva para el primer nivel
                                agregarNuevoTopico(checkboxDiv, topico.id, addSubtemaButton, level+1, tema+'-'+topico.id);
                            }
                            // Agregar el div del checkbox al contenedor de la lista
                            checkboxList.appendChild(checkboxDiv);

                            // Llamar recursivamente para las subcategorías (parte)
                            agregarTopicos(topico.parte, topico.id, checkboxList, level + 1, tema+'-'+topico.id,
                                 "parte");

                            // Llamar recursivamente para las subcategorías (tipo)
                            agregarTopicos(topico.tipo, topico.id, checkboxList, level + 1, tema+'-'+topico.id,
                                 "tipo");

                            // Llamar recursivamente para las subcategorías (soporte)
                            agregarTopicos(topico.soporte, topico.id, checkboxList, level + 1, tema+'-'+topico.id,
                                 "soporte");
                        });

                        // Añadir la lista de checkboxes al contenedor principal
                        container.appendChild(checkboxList);
                    }

                    // Lógica para capturar la selección de tópicos y agregar subniveles
                    const addEventListenerToCheckbox = (checkbox) => {
                    // document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                        checkbox.addEventListener('change', async (e) => {
                            const topicId = e.target.id; // El id del checkbox es el nombre del tópico
                            const parentName = e.target.getAttribute('data-parent');
                            const level = e.target.getAttribute('data-level');
                            const tema = e.target.getAttribute('data-tema');
                            const topicRelation = e.target.getAttribute('data-relation');

                            const guardarTopicoOA = (idTopico,
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

                            if (e.target.checked) {
                                const response = await guardarTopicoOA(topicId, paramsObject['oaid'], true);
                                log.debug(response);

                                addTopicToJSON(topicId, topicRelation, parentName, level, tema);
                                log.debug(`Added ${topicId}-${parentName} al JSON`);
                            } else {
                                const response = await guardarTopicoOA(topicId, paramsObject['oaid'], false);
                                log.debug(response);

                                // Lógica para eliminar del JSON si el checkbox se desmarca
                                selectedTopics = selectedTopics.filter(topic => topic.name !== topicId);
                                log.debug(`Eliminar ${topicId} del JSON`);
                            }

                            // Elimina todas las opciones del select para que las vuelva a cargar con el boton
                            var selectMenutopic = document.getElementById('menutopic');
                            selectMenutopic.options.length = 0;

                            // Actualizar la vista
                            // Inicializar el árbol y renderizar
                            treeData = buildTreeJSON(selectedTopics);
                            log.debug("treeData:");
                            log.debug(treeData);

                            // Llamar a la función y agregar el árbol al DOM
                            while (sortableTreeDiv.firstChild) {
                                sortableTreeDiv.removeChild(sortableTreeDiv.firstChild);
                            }
                            // const tree = document.createElement('ul');
                            // tree.setAttribute("class","sortable");
                            // sortableTreeDiv.appendChild(tree);
                            const container = document.createElement('div');
                            container.textContent = "Unidad";
                            container.className = 'unidad';
                            container.id = 'topicosSeleccionados';
                            treeData.forEach(item => {
                                const temaDiv = createDivTema(item); //createTree(item, item.name, container);
                                createDivTopico(item, item.name, temaDiv);
                                container.appendChild(temaDiv);
                                new Sortable(temaDiv, {
                                    // group: {
                                    //     name: item.name,
                                    //     put: false // Asegúrate de que no puedan anidarse
                                    // },
                                    // animation: 150,
                                    // fallbackOnBody: true,
                                    // swapThreshold: 0.65,
                                    // nested: false,
                                    animation: 150,
                                    ghostClass: 'blue-background-class'
                                });
                            });
                            sortableTreeDiv.appendChild(container);
                            Sortable.create(container, {
                                group: 'topics',
                                animation: 150,
                                onEnd: function(evt) {
                                    log.debug('Nuevo orden de temas/tópicos:', evt);
                                },
                                draggable: '.topic', // Selector para los temas
                                handle: '.topic', // Permite arrastrar solo desde el tema
                                swap: true, // Permite el intercambio
                                nested: false, // Habilitar soporte para elementos anidados,
                            });
                            tablaTitulo.insertAdjacentElement('afterend', sortableTreeDiv);

                        });
                    };

                    const createDivTema = (item) => {
                        const itemDiv = document.createElement('div');
                        itemDiv.textContent = '-'.repeat(item.level * 5) + item.name;
                        itemDiv.className = 'tema'; // Clase para aplicar estilos
                        itemDiv.draggable = true; // Habilitar draggable
                        // itemDiv.style.marginLeft = `${item.level * 20}px`;
                        // new Sortable(itemDiv, {
                        //     group: groupNameTema,
                        //     animation: 150,
                        //     fallbackOnBody: true,
                        //     swapThreshold: 0.65,
                        //     nested: false,
                        //     onEnd: function(evt) {
                        //         // Aquí puedes actualizar el JSON si los elementos cambian de orden
                        //         log.debug('El elemento fue movido:', evt);
                        //     }
                        // });
                        return itemDiv;
                    };

                    const createDivTopico = (item, groupNameTema, temaDiv) => {
                        // Si tiene hijos, crear un subárbol
                        if (item.children && item.children.length > 0) {
                            item.children.forEach(kid=> {
                                const itemDiv = document.createElement('div');
                                itemDiv.textContent = '-'.repeat(kid.level * 5) + kid.name;
                                itemDiv.className = 'topic'; // Clase para aplicar estilos
                                itemDiv.draggable = true; // Habilitar draggable
                                // itemDiv.style.marginLeft = `${item.level * 20}px`;

                                new Sortable(itemDiv, {
                                    group: groupNameTema,
                                    animation: 150,
                                    fallbackOnBody: true,
                                    swapThreshold: 0.65,
                                    onEnd: function(evt) {
                                        // Aquí puedes actualizar el JSON si los elementos cambian de orden
                                        log.debug('El elemento fue movido:', evt);
                                    }
                                });
                                temaDiv.appendChild(itemDiv);
                                createDivTopico(kid, groupNameTema, temaDiv);
                                // childrenContainer.appendChild(childrenDiv);
                            });
                        }
                    };


                    // Función para agregar tópicos al JSON
                    const addTopicToJSON = (topicId, topicRelation, parentName, level, tema) => {
                        const newTopic = { name: topicId, parentName: parentName, relation: topicRelation, level: level,
                             tema: tema};

                        selectedTopics.push(newTopic);

                    };


                    const createNode=(name, fullPath, level, topicRelation)=> {
                        return {
                            name: name,
                            fullPath: fullPath,
                            level: level,
                            relation: topicRelation,
                            children: []
                        };
                    };

                    const findParentNodeRecursive=(node, fullPath)=> {

                        for (let child of node.children) {
                            if(fullPath.includes('-'+child.name+'-')){
                                const foundNode = findParentNodeRecursive(child, fullPath);
                                if (foundNode) {
                                    return foundNode; // Devolver el nodo encontrado
                                }
                                return child;
                            }
                        }

                        return null; // Si no se encuentra ningún padre
                    };

                    const buildTreeJSON = (selectedTopics) => {
                        // Crear un diccionario para acceder a los nodos por su fullPath
                        const topicDict = {};
                        // Ordenar los tópicos por nivel para asegurarnos de que procesamos los padres primero
                        selectedTopics.sort((a, b) => a.level - b.level);

                        // Inicializamos los nodos en el diccionario
                        selectedTopics.forEach(({ tema, level, relation }) => {
                            const fullPath = tema;
                            const name = fullPath.split('-').pop(); // Obtener el nombre del tópico (última parte del fullPath)
                            const rootName = fullPath.split('-')[0]; // El primer elemento es el "raíz" o tema

                            // Asegúrate de crear un nodo raíz para cada tema único
                            if (!topicDict[rootName]) {
                                topicDict[rootName] = createNode(rootName, null, 0, null);
                            }

                            // Si hay un guion pero no más, se trata de un tópico de nivel 1
                            if (fullPath.split('-').length === 2) {
                                const rootNode = topicDict[rootName];
                                rootNode.children.push(createNode(name, fullPath, level, relation));
                            } else {
                                // Intentar encontrar el padre en el fullPath
                                const parentNode = findParentNodeRecursive(topicDict[rootName], fullPath);
                                if (parentNode) {
                                    parentNode.children.push(createNode(name, fullPath, level, relation));
                                } else {
                                    // Si no se encuentra un padre seleccionado, añadir a la raíz
                                    const rootNode = topicDict[rootName];
                                    rootNode.children.push(createNode(name, fullPath, level, relation));
                                }
                            }

                            // Agregar el nodo al diccionario
                            // topicDict[name] = createNode(name, fullPath);
                        });

                        // Construir el árbol final desde las raíces
                        const finalTree = Object.values(topicDict);

                        return finalTree;
                    };

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



                    //  /**
                    //     * Function to create
                    //     * Manejo de traer las cosas seleccionadas de OA ya creados pero no terminados
                    //     *seleccionar la unidad y los topicos
                    // */
                    //  async function setOAFields() {
                    //     // ...
                    //     const id = paramsObject['oaid'];

                    //     const getOAfields = async (id) => {
                    //         const response = await ajax.call([{
                    //             methodname: 'local_yourplugin_get_oa_fields',
                    //             args: { id }
                    //         }]);
                    //         return response[0]; // Assuming ajax.call returns an array and you're interested in the first element
                    //     };

                    //     try {
                    //         const response = await getOAfields(id);
                    //         log.debug( response[0].name);

                    //         var storedName = response[0].name;
                    //         if(storedName != "empty name"){
                    //             // Select the input element within the container
                    //             var input = verboInput.querySelector('input');

                    //             // Set the value of the input element
                    //             input.value = storedName;

                    //             var selectUnidad = document.getElementById("id_unidadSelect");

                    //             //TODO eliminar hardcodeo como es la relacion de OA a UNIDAD?
                    //             const getOATopicsFromOntology = (
                    //                 oaid
                    //             ) => ajax.call([{
                    //                 methodname: 'local_yourplugin_get_oa_topics',
                    //                 args: {
                    //                     oaid
                    //                 },
                    //             }])[0];
                    //             var topicosOntologia = [];
                    //             try {
                    //                 const responseOATopicsFromOntology = await getOATopicsFromOntology(paramsObject['oaid']);
                    //                 log.debug("Getting topics:");
                    //                 log.debug(responseOATopicsFromOntology);
                    //                 responseOATopicsFromOntology.forEach(topico => {
                    //                     var valueTopico = topico.topic
                    //                     .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", "");
                    //                     topicosOntologia.push(valueTopico);
                    //                 });
                    //             } catch (error) {
                    //                 log.debug('Error fetching OA Topicos: ', error);
                    //                 log.debug( error);
                    //             }

                    //             var selectedOption = Array.from(selectUnidad.options).find(option =>
                        //  option.value === 'MADUNIDAD1');

                    //             selectUnidad.value = selectedOption.value;

                    //             // var temasYTopicos = JSON.parse(selectedOption.dataset.temasYTopicos);

                    //             // Limpiar la lista anterior
                    //             ul.innerHTML = '';


                                // Añadir los temas y tópicos a la lista
                                // temasYTopicos.forEach(item => {
                                //     var liTema = document.createElement('li');
                                //     liTema.textContent = item.tema;
                                //     ul.appendChild(liTema);

                                //     item.topicos.forEach(topico => {
                                //         var liTopico = document.createElement('li');

                                //         var checkbox = document.createElement('input');
                                //         checkbox.type = 'checkbox';
                                //         checkbox.value = topico.toUpperCase().replace(/\s+/g, '_');

                                //         var label = document.createElement('label');
                                //         label.textContent = topico;

                                //         // log.debug(selectTopicosH5P);
                                //         label.prepend(checkbox);

                                //         liTopico.appendChild(label);
                                //         liTopico.style.marginLeft = '20px'; // Sangría para los tópicos
                                //         ul.appendChild(liTopico);

                                //         // Establecer el checkbox como seleccionado TODO implemenrar una lista que venga
                                //         // desde la ontologia con la data
                                //         if(topicosOntologia.includes(checkbox.value)){
                                //             checkbox.checked = true;
                                //             var tableRow = {name: temasTopicosDic[checkbox.value].name,
                                //                 order: temasTopicosDic[checkbox.value].order,
                                //                 incluido: {},
                                //                 parte: temasTopicosDic[checkbox.value].parte,
                                //                 ejemplos:"",
                                //                 actividades:"Definición de límite - Actividad 1"
                                //             };
                                //             var select = document.getElementById('menutopic');
                                //             var option = document.createElement('option');
                                //             option.textContent = temasTopicosDic[checkbox.value].name;
                                //             option.value = checkbox.value;
                                //             select.appendChild(option);
                                //             fillTable(tableRow, checkbox.value);
                                //         }

                                //         //enventlistener para armar los datos que van en la tabla/ontologia
                                //         checkbox.addEventListener('change', async function(event) {
                                //             //Guardar los topicos seleccionados en la Ontologia (MEJOR GUARDAR AUTOMATICALLY
                                //                 //                  menos llamadas a la ontolgia?? Pero si deselecciono uno?)
                                //                 const guardarTopicoOA = (
                                //                     idTopico,
                                //                     oaid,
                                //                     selected,//boolean que indica si es para almacenar en el oa o eliminar
                                //                 ) => ajax.call([{
                                //                     methodname: 'local_yourplugin_guardar_topico_oa',
                                //                     args: {
                                //                         idTopico,
                                //                         oaid,
                                //                         selected
                                //                     },
                                //                 }])[0];

                                //             // Check the state of the checkbox
                                //             if (event.target.checked) {
                                //                 var tableRow = {name: temasTopicosDic[event.target.value].name,
                                //                     order: temasTopicosDic[event.target.value].order,
                                //                     incluido: {},
                                //                     parte: temasTopicosDic[event.target.value].parte,
                                //                     ejemplos:"",
                                //                     actividades:"Definición de límite - Actividad 1"
                                //                 };
                                //                 var select = document.getElementById('menutopic');
                                //                 var option = document.createElement('option');
                                //                 option.textContent = temasTopicosDic[event.target.value].name;
                                //                 option.value = event.target.value;
                                //                 select.appendChild(option);
                                //                 fillTable(tableRow, event.target.value);

                                //                 const response = await guardarTopicoOA(event.target.value,
                                //                     paramsObject['oaid'], true);
                                //                 log.debug(response);

                                //                 //Agregar topico a la lista para luego mandarlo a la ontologia
                                //                 // selectedTopics.push(event.target.value);
                                //             } else {
                                //                 removeItemFromTable(event.target.value);
                                //                 var select = document.getElementById('menutopic');
                                //                 removeOptionByValue(select,event.target.value);

                                //                 const response = await guardarTopicoOA(event.target.value,
                                //                     paramsObject['oaid'], false);
                                //                 log.debug(response);
                                //                 // selectedTopics.filter(event.target.value);
                                //             }
                                //         });
                                //     });
                                // });
                                //RA Asignatura

                //                 const getOAFromOntology = (
                //                     id
                //                 ) => ajax.call([{
                //                     methodname: 'local_yourplugin_get_oa_ontology',
                //                     args: {
                //                         id
                //                     },
                //                 }])[0];

                //                 try {
                //                     const responseOAFromOntology = await getOAFromOntology(id);
                //                     responseOAFromOntology.forEach(ra => {
                //                         var valueRaAsig = ra.raasig
                //                         .replace("http://www.semanticweb.org/valer/ontologies/OntoOA#", "");
                //                         let checkboxRaAsig = document
                //                         .querySelectorAll(`#resultadoAprendizaje input[type="checkbox"]
                // [value="${valueRaAsig}"]`);
                //                         checkboxRaAsig[0].checked = true;
                //                     });
                //                 } catch (error) {
                //                     log.debug('Error fetching OA RAsAsig: ', error);
                //                     log.debug( error);
                //                 }

                //             }
                //         } catch (error) {
                //             log.debug('Error fetching OA fields:', error);
                //         }
                //     }

                //     setOAFields();
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

                var buttonCargarOrden = document.createElement('button');
                buttonCargarOrden.setAttribute('id', 'cargarOrdenTopicos');
                buttonCargarOrden.textContent = 'Cargar Orden';
                // Add event listener to button
                buttonCargarOrden.addEventListener('click', async function() {
                    log.debug("CLICKED cargar");
                    log.debug("treeData inside Cargar:");
                    log.debug(treeData);
                    var topicosSeleccionadosDiv = document.getElementById('topicosSeleccionados');
                    // Seleccionamos todos los divs con la clase "topic" dentro del div principal
                    const topicosSeleccionados = topicosSeleccionadosDiv.querySelectorAll('.topic');
                    // Creamos una lista de strings con el contenido de cada tópico
                    const listaTopicos = Array.from(topicosSeleccionados).map(topico => topico.textContent.trim());
                    log.debug(listaTopicos);

                    var selectMenutopic = document.getElementById('menutopic');
                    // Elimina todas las opciones del select
                    selectMenutopic.options.length = 0;
                    listaTopicos.forEach(topico => {
                        var option = document.createElement('option');
                        option.textContent = topico;
                        option.value = topico;
                        selectMenutopic.appendChild(option);
                    });

                });
                tablaTitulo.insertAdjacentElement('beforeend', buttonCargarOrden);

                // // var table = document.createElement('table');
                // var table = document.getElementsByClassName("generaltable")[0];

                // table.id = 'editableTable';
                // // Create thead element
                // var thead = document.createElement('thead');
                // var headerRow = document.createElement('tr');
                // ['','Tópico', 'Order', 'Tópico incluido','Orden Tópico incluido','Tópico Parte',
                // 'Orden Tópico Parte','Ejemplos', 'Actividades']
                // .forEach(function(headerText) {
                //     var th = document.createElement('th');
                //     th.textContent = headerText;
                //     headerRow.appendChild(th);
                // });
                // thead.appendChild(headerRow);
                // table.appendChild(thead);

                // // Create tbody element with sample data
                // var tbody = document.createElement('tbody');

                // /**
                //      * remove item from table
                //      *
                //      * @param {String} id - El id de datos.
                // */
                // function removeItemFromTable(id) {
                //     const row = tbody.querySelector(`tr[id="${id}"]`);
                //     if (row) {
                //         tbody.removeChild(row);
                //     }
                // }

                // /**
                //      * remove item from select
                //      *@param {HTMLElement} select - El id de datos.
                //      * @param {String} value - El id de datos.
                // */
                // function removeOptionByValue(select,value) {
                //     // var select = document.getElementById(selectId);
                //     var options = select.options;
                //     for (var i = 0; i < options.length; i++) {
                //         if (options[i].value === value) {
                //             select.remove(i);
                //             break;
                //         }
                //     }
                // }
                //  /**
                //      * fill table
                //      *
                //      * @param {Array<Object>} data - El array de datos.
                //      * @param {String} id - El id de datos.
                // */
                // function fillTable(data, id) {
                //     // rowData.forEach(function(data) {
                //         var row = document.createElement('tr');
                //         row.setAttribute("id",id);
                //         row.style.border = '1px solid black';
                //          // Agregar asa de arrastre a la primera celda
                //         var dragHandleCell = document.createElement('td');
                //         dragHandleCell.className = 'drag-handle';
                //         dragHandleCell.textContent = '☰';
                //         dragHandleCell.draggable = true; // Asegurar que la celda sea arrastrable
                //         row.appendChild(dragHandleCell);

                //         Object.keys(data).forEach(function(key) {
                //             var td = document.createElement('td');
                //             var tdOrdenIncluido = document.createElement('td');
                //             if (key === 'incluido') {
                //                 // Iterate through the object
                //                 for (const incluido in data[key]) {
                //                     if (data[key].hasOwnProperty(incluido)) {
                //                         var div = document.createElement('div');
                //                         div.className = 'draggable';
                //                         div.draggable = true;
                //                         div.textContent = incluido;
                //                         td.appendChild(div);

                //                         var divOrdenIncluido = document.createElement('div');
                //                         divOrdenIncluido.className = 'draggable';
                //                         divOrdenIncluido.draggable = true;
                //                         divOrdenIncluido.textContent = data[key][incluido];
                //                         tdOrdenIncluido.appendChild(divOrdenIncluido);
                //                     }
                //                 }
                //                 row.appendChild(td);
                //                 tdOrdenIncluido.style.border = '1px solid black';
                //                 row.appendChild(tdOrdenIncluido);
                //             }
                //             else{
                //                 td.textContent = data[key];
                //                 row.appendChild(td);
                //             }
                //             td.style.border = '1px solid black';
                //         });
                //         tbody.appendChild(row);
                //     // });
                // }

                // table.appendChild(tbody);

                // // Add event listeners to editable cells
                // table.addEventListener('click', function(event) {
                //     var target = event.target;
                //     if (target.classList.contains('editable')) {
                //         var value = target.textContent;
                //         var input = document.createElement('input');
                //         input.type = 'text';
                //         input.value = value;
                //         input.addEventListener('blur', function() {
                //             var newValue = this.value;
                //             target.textContent = newValue;
                //         });
                //         target.textContent = '';
                //         target.appendChild(input);
                //         input.focus();
                //     }
                // });

                // // Agregar estilos CSS directamente desde JavaScript
                // var style = document.createElement('style');
                // style.textContent = `
                //     .drag-handle {
                //         cursor: grab;
                //     }
                //     .dragging {
                //         background-color: lightblue;
                //     }
                //     .draggable-container {
                //         display: flex;
                //         flex-direction: column;
                //     }
                //     .draggable {
                //         padding: 10px;
                //         border: 1px solid #ccc;
                //         background-color: #f9f9f9;
                //         margin-bottom: 5px;
                //         cursor: move;
                //     }
                // `;
                // document.head.appendChild(style);

                // // Agregar eventos de arrastre
                // var draggingElement = null;

                // // Función para manejar el evento de inicio de arrastre
                // /**
                //  * Función para manejar el evento de inicio de arrastre.
                //  * @param {DragEvent} event - El evento de arrastre.
                //  */
                // function handleDragStart(event){
                //     draggingElement = event.target.closest('tr');
                //     draggingElement.classList.add('dragging');
                // }

                // // Función para manejar el evento de soltar
                // /**
                //  * Función para manejar el evento de soltar.
                //  * @param {DragEvent} event - El evento de soltar.
                //  */
                // function handleDrop(event) {
                //     event.preventDefault();
                //     if (draggingElement) {
                //         var targetElement = event.target.closest('tr');
                //         if (targetElement && targetElement !== draggingElement) {
                //             var parent = draggingElement.parentNode;
                //             parent.removeChild(draggingElement);
                //             var referenceNode = (targetElement.nextSibling &&
                //                 targetElement.nextSibling.nodeType === Node.ELEMENT_NODE) ?
                //                                 targetElement.nextSibling : null;
                //             parent.insertBefore(draggingElement, referenceNode);
                //         }
                //         draggingElement.classList.remove('dragging');
                //         draggingElement = null;
                //     }
                // }

                // // Agregar eventos de arrastre a las celdas de asa de arrastre
                // var dragHandleElements = document.querySelectorAll('.drag-handle');
                // dragHandleElements.forEach(function(element) {
                //     element.addEventListener('dragstart', handleDragStart);
                // });
                // tbody.addEventListener('dragover', function(event) {
                //     event.preventDefault();
                // });
                // tbody.addEventListener('drop', handleDrop);

                // // Append the table to the container
                // tablaTitulo.insertAdjacentElement('afterend', table);

                var editarcrearTitulo = document.createElement('h3');
                editarcrearTitulo.textContent = 'Crear o editar H5P:';
                tablaTitulo.insertAdjacentElement('afterend', editarcrearTitulo);

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

                // let draggedElement = null;

                // document.querySelectorAll('.draggable').forEach(item => {
                //     item.addEventListener('dragstart', function(e) {
                //         draggedElement = this;
                //         e.dataTransfer.effectAllowed = 'move';
                //         e.dataTransfer.setData('text/html', this.innerHTML);
                //     });

                //     item.addEventListener('dragover', function(e) {
                //         if (e.preventDefault) {
                //             e.preventDefault();
                //         }
                //         return false;
                //     });

                //     item.addEventListener('drop', function(e) {
                //         if (e.stopPropagation) {
                //             e.stopPropagation();
                //         }

                //         if (draggedElement !== this) {
                //             draggedElement.innerHTML = this.innerHTML;
                //             this.innerHTML = e.dataTransfer.getData('text/html');
                //         }

                //         return false;
                //     });
                // });

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
