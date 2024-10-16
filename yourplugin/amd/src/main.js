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

                var verbosList = datos.verbosList;
                log.debug(verbosList);
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


                //Get selected Topics (topicos que ya estan en la ontologiaConocimiento)
                var selectedTopicsFromConocimiento = [];
                var selectedRAAsignaturaFromConocimiento = [];

                var resultadoAprendizajeOA = {"raasignatura":[],
                                                "verbo":"",
                                                "objeto":"",
                                                "condicion":"",
                                                "finalidad":""
                };

                var seleccionarUnidadTitulo = document.createElement('h3');
                seleccionarUnidadTitulo.textContent = 'Seleccionar Unidad y Topicos:';
                seleccionarUnidadTitulo.style.marginTop="10px";

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
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    select.style[key] = value;
                }

                var mainDiv = document.querySelector('div[role="main"]');
                mainDiv.insertBefore(seleccionarUnidadTitulo, mainDiv.firstChild);

                seleccionarUnidadTitulo.insertAdjacentElement('afterend', select);

                // Crear el elemento ul para la lista de temas y tópicos
                var ul = document.createElement('ul');
                ul.setAttribute('id', 'listaTemasYTopicos');
                ul.style.listStyleType = 'none'; // Eliminar los puntos de la lista

                select.insertAdjacentElement('afterend', ul);

                var seleccionarRAsTitulo = document.createElement('h3');
                seleccionarRAsTitulo.textContent = 'Seleccionar Resultados de Aprendizaje de la Asignatura:';
                seleccionarRAsTitulo.style.marginTop="10px";

                var checkboxesContainer = document.createElement('div'); // Add multiple select element
                checkboxesContainer.setAttribute('id', 'resultadoAprendizaje'); // Set attributes for multiple select element

                ul.insertAdjacentElement('afterend',seleccionarRAsTitulo);
                seleccionarRAsTitulo.insertAdjacentElement('afterend',checkboxesContainer);

                    // RA para OA
                var title = document.createElement('h3'); // Título para el resultado de aprendizaje
                title.textContent = 'Definir el resultado de aprendizaje del Objeto de Aprendizaje';
                title.style.marginTop="10px";

                    // Campos de entrada de texto
                // var verboInput = createTextInput('Verbo:');
                var objetoConocimientoInput = createTextInput('Objeto de Conocimiento:');

                var condicionInput = createTextInput('Condición:');

                var finalidadInput = createTextInput('Finalidad:');


                checkboxesContainer.insertAdjacentElement('afterend', title);

                // Crear el elemento select
                var selectNivel1 = document.createElement('select');
                selectNivel1.setAttribute('id', 'verbonivel1');
                selectNivel1.addEventListener('change', function(event) {
                    if (this.value === "") {
                        // Si se selecciona la opción predeterminada, habilita todos los selects
                        habilitarTodosLosSelects();
                    } else {
                        desactivarOtrosSelects('verbonivel1');
                        log.debug(event.target.value);
                        guardarVerboEnOntologia(event.target.value, "Nivel1");
                    }
                });
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    selectNivel1.style[key] = value;
                }

                  // Crear el elemento select
                var selectNivel2 = document.createElement('select');
                selectNivel2.setAttribute('id', 'verbonivel2');
                selectNivel2.addEventListener('change', function(event) {
                    if (this.value === "") {
                        // Si se selecciona la opción predeterminada, habilita todos los selects
                        habilitarTodosLosSelects();
                    } else {
                        desactivarOtrosSelects('verbonivel2');
                        log.debug(event.target.value);
                        guardarVerboEnOntologia(event.target.value, "Nivel2");
                    }
                });
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    selectNivel2.style[key] = value;
                }

                // Crear el elemento select
                var selectNivel3 = document.createElement('select');
                selectNivel3.setAttribute('id', 'verbonivel3');
                selectNivel3.addEventListener('change', function(event) {
                    if (this.value === "") {
                        // Si se selecciona la opción predeterminada, habilita todos los selects
                        habilitarTodosLosSelects();
                    } else {
                        desactivarOtrosSelects('verbonivel3');
                        log.debug(event.target.value);
                        guardarVerboEnOntologia(event.target.value, "Nivel3");
                    }
                });
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    selectNivel3.style[key] = value;
                }

                title.insertAdjacentElement('afterend', selectNivel1);
                selectNivel1.insertAdjacentElement('afterend', selectNivel2);
                // verboInput.insertAdjacentElement('afterend', selectNivel2);
                selectNivel2.insertAdjacentElement('afterend', selectNivel3);
                // selectNivel3.insertAdjacentElement('afterend', verboInput);

                // Función para crear las opciones de un select a partir de un nivel
                const crearSelectPorNivel = (nivel, selectId) =>{
                    const select = document.getElementById(selectId);
                    log.debug(select);
                    const verbosDelNivel = verbosList.filter(verb => verb.nivel === nivel);

                    // Crear la opción por defecto
                    var defaultOptionVerbo = document.createElement('option');
                    defaultOptionVerbo.text = 'Seleccione un verbo del '+nivel;
                    defaultOptionVerbo.value = '';
                    defaultOptionVerbo.disabled = false;
                    defaultOptionVerbo.selected = true;

                    select.appendChild(defaultOptionVerbo);

                    // Crear opciones
                    verbosDelNivel.forEach(verb => {
                        const option = document.createElement('option');
                        option.value = verb.id;
                        option.textContent = verb.nombre;
                        option.setAttribute("nivel", verb.nivel);
                        select.appendChild(option);
                    });
                };

                // Función para desactivar otros selects
                const desactivarOtrosSelects= (selectId) =>{
                    const selects = ["verbonivel1", "verbonivel2", "verbonivel3"];
                    selects.forEach(id => {
                        if (id !== selectId) {
                            document.getElementById(id).disabled = true; // Desactiva los otros
                        }
                    });
                };

                // Función para habilitar todos los selects
                const habilitarTodosLosSelects = () =>{
                    const selects = ["verbonivel1", "verbonivel2", "verbonivel3"];
                    selects.forEach(selectid => {
                        document.getElementById(selectid).disabled = false; // Habilita todos
                    });
                };

                // Función para habilitar todos los selects
                const guardarVerboEnOntologia = (verboId, nivel) =>{
                    //enviar a la ontologia en el momento
                    fetch("http://localhost:8080/ontology/createVerbo", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                        },
                        body: new URLSearchParams({
                            verboId: verboId,
                            nivel: nivel
                        })
                      })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error("Error en la solicitud");
                        }
                        return response.text(); // O .json() si esperas una respuesta JSON
                      })
                      .then(data => {
                        log.debug("Respuesta del servidor CreateVerbo:", data);
                      })
                      .catch(error => {
                        log.debug("Error:", error);
                      });
                };

                // Crear selects por nivel
                crearSelectPorNivel("Nivel1", "verbonivel1");
                crearSelectPorNivel("Nivel2", "verbonivel2");
                crearSelectPorNivel("Nivel3", "verbonivel3");

                selectNivel3.insertAdjacentElement('afterend', objetoConocimientoInput);
                //Check if the OA already has a value for the field

                objetoConocimientoInput.insertAdjacentElement('afterend', condicionInput);
                condicionInput.insertAdjacentElement('afterend', finalidadInput);

                // Create table element
                var tablaTitulo = document.createElement('h3');
                tablaTitulo.textContent = 'Ordenar Topicos:';
                tablaTitulo.style.marginTop="10px";
                finalidadInput.insertAdjacentElement('afterend', tablaTitulo);

                const crearTemasyTopicosCheckboxes = (temas) => {
                    const temasList = document.createElement('div');
                    temas.forEach(tema => {
                        const checkboxDiv = document.createElement('div');
                        const label = document.createElement('label');
                        label.htmlFor = tema.id;
                        label.textContent = tema.nombre;
                        label.id = tema.id;
                        label.style.marginRight="5px" ;
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
                    return temasList;
                };

                var resultadosAprendizaje = rasAsignaturaArray;
                log.debug("resultadosAprendizaje: "+resultadosAprendizaje);
                const crearRAAsignaturaCheckboxes = () => {
                    resultadosAprendizaje.forEach(function(raAsignaturaDto) {
                        // raAsignaturaDto = raAsignaturaDto.replace("http://www.semanticweb.org/valer/ontologies/OntoOA#","");
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.value = raAsignaturaDto.id;//.toUpperCase().replace(/\s+/g, '_'); TODO ver si es necesario
                        if(selectedRAAsignaturaFromConocimiento.includes(raAsignaturaDto.id)){
                            checkbox.checked = true;
                        }
                        var label = document.createElement('label');
                        label.textContent = raAsignaturaDto.nombre;
                        label.style.marginRight="5px" ;
                        label.appendChild(checkbox);
                        checkboxesContainer.appendChild(label);

                        // Crear y añadir un elemento <br> después del label
                        var br = document.createElement('br');
                        checkboxesContainer.appendChild(br);

                        //enventlistener para armar los datos que van en la ontologia
                        checkbox.addEventListener('change', function(event) {
                            // Check the state of the checkbox
                            if (event.target.checked) {
                                //enviar a la ontologia en el momento
                                fetch("http://localhost:8080/ontology/linkRAAsignaturaToOA", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                                    },
                                    body: new URLSearchParams({
                                        oaid: paramsObject['oaid'],
                                        idRAAsignatura: event.target.value
                                    })
                                  })
                                  .then(response => {
                                    if (!response.ok) {
                                      throw new Error("Error en la solicitud");
                                    }
                                    return response.text(); // O .json() si esperas una respuesta JSON
                                  })
                                  .then(data => {
                                    log.debug("Respuesta del servidor:", data);
                                  })
                                  .catch(error => {
                                    log.debug("Error:", error);
                                  });
                                resultadoAprendizajeOA["raasignatura"].push(event.target.value);

                            } else {
                                //eliminar de la ontologia en el momento
                                fetch("http://localhost:8080/ontology/unlinkRAAsignaturaToOA", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                                    },
                                    body: new URLSearchParams({
                                        oaid: paramsObject['oaid'],
                                        idRAAsignatura: event.target.value
                                    })
                                  })
                                  .then(response => {
                                    if (!response.ok) {
                                      throw new Error("Error en la solicitud");
                                    }
                                    return response.text(); // O .json() si esperas una respuesta JSON
                                  })
                                  .then(data => {
                                    log.debug("Respuesta del servidor:", data);
                                  })
                                  .catch(error => {
                                    log.debug("Error:", error);
                                  });
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

                };

                const redirectToH5pEditor = (listaTopicosIdyNombre)=>{
                    // Redirigir a la página de h5p
                            // window.location.href = 'http://localhost/local/yourplugin/h5pEditor.php?courseid=' + paramCourseid
                            // + '&oaid=' + paramsObject['oaid']+"&contextid=14";

                    // Datos a enviar
                    const dataArray = {oaid:paramsObject['oaid'],
                        courseid:paramCourseid, contextid:paramsObject['contextid'],
                        listaTopicosIdyNombre:listaTopicosIdyNombre
                    };
                    // Crear un formulario
                    const form = document.createElement('form');
                    form.method = 'POST'; // Método POST
                    form.action = 'h5pEditor.php?courseid='+ paramCourseid
                    + '&oaid=' + paramsObject['oaid']+"&contextid=14"; // URL de destino

                    // Crear un campo oculto con los datos
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'dataArray';
                    input.value = JSON.stringify(dataArray); // Convertir el array a JSON

                    // Añadir el campo al formulario
                    form.appendChild(input);

                    // Añadir el formulario al documento y enviarlo
                    document.body.appendChild(form);
                    form.submit(); // El formulario realiza la redirección automáticamente

                };
                // Crear el checkbox ingnorar
                var contenedorCheckboxIgnorarRecomendaciones = document.createElement("div");
                const checkboxIgnorarRecomendaciones = document.createElement('input');
                checkboxIgnorarRecomendaciones.type = 'checkbox';
                checkboxIgnorarRecomendaciones.id = 'checkboxIgnorarRecomendaciones';

                const labelIgnorarRecomendaciones = document.createElement('label');
                labelIgnorarRecomendaciones.htmlFor = 'checkboxIgnorarRecomendaciones';
                labelIgnorarRecomendaciones.textContent = 'Ignorar recomendaciones';
                labelIgnorarRecomendaciones.style.marginRight="5px" ;

                // Añadir el checkbox y su etiqueta al contenedor
                contenedorCheckboxIgnorarRecomendaciones.appendChild(checkboxIgnorarRecomendaciones);
                contenedorCheckboxIgnorarRecomendaciones.appendChild(labelIgnorarRecomendaciones);

                var buttonCargarOrden = document.createElement('button');
                buttonCargarOrden.setAttribute('id', 'cargarOrdenTopicos');
                buttonCargarOrden.textContent = 'Cargar Orden';
                for (const propiedad in estilosBoton) {
                    buttonCargarOrden.style[propiedad] = estilosBoton[propiedad];
                }

                var contenedorMensajes = document.createElement("div");
                contenedorMensajes.setAttribute("id","contenedorMensajes");
                contenedorMensajes.style.marginTop="80px";
                contenedorMensajes.style.textAlign="center";
                // Add event listener to button
                buttonCargarOrden.addEventListener('click', async function() {
                    log.debug("CLICKED cargar");
                    log.debug("treeData inside Cargar:");
                    log.debug(treeData);

                    var topicosSeleccionadosDiv = document.getElementById('topicosSeleccionados');
                    // Seleccionamos todos los divs con la clase "topic" dentro del div principal
                    const topicosSeleccionados = topicosSeleccionadosDiv.querySelectorAll('.topic');
                    // Creamos una lista de strings con el contenido de cada tópico
                    const listaTopicos = Array.from(topicosSeleccionados).map(topico => topico.id.trim());
                    log.debug("listaTopicos: ");
                    log.debug(listaTopicos);

                    // Creamos un array de objetos con el id y el textContent de cada tópico
                    const listaTopicosIdyNombre = Array.from(topicosSeleccionados).map(topico => ({
                        id: topico.id.trim(),
                        nombre: topico.textContent.trim()
                    }));

                    log.debug("listaTopicosIdyNombre: ");
                    log.debug(listaTopicosIdyNombre);

                     // Realizar la solicitud POST al endpoint
                    fetch('http://localhost:8080/ontology/createTopicsRelations', {
                        method: 'POST', // Método HTTP POST
                        headers: {
                            'Content-Type': 'application/json' // Indicar que el cuerpo es JSON
                        },
                        body: JSON.stringify(treeData) // Convertir el array de nodes a JSON y enviarlo en el cuerpo
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.text(); // Puedes ajustar según el tipo de respuesta que esperas (JSON, texto, etc.)
                        } else {
                            throw new Error('Error en la solicitud');
                        }
                    })
                    .then(data => {
                        log.debug('Respuesta del servidor createTopicsRelations:', data); // Manejar la respuesta del servidor
                        return fetch('http://localhost:8080/ontology/setOrdenDeDesarrollo', {
                            method: 'POST', // Método HTTP POST
                            headers: {
                                'Content-Type': 'application/json' // Indicar que el cuerpo es JSON
                            },
                            body: JSON.stringify(listaTopicos) // Convertir el array de nodes a JSON y enviarlo en el cuerpo
                        });
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.text(); // Puedes ajustar según el tipo de respuesta que esperas (JSON, texto, etc.)
                        } else {
                            throw new Error('Error en la solicitud');
                        }
                    })
                    .then(data => {
                        log.debug('Respuesta del servidor setOrdenDeDesarrollo:', data); // Manejar la respuesta del servidor

                        if(checkboxIgnorarRecomendaciones.checked){

                            redirectToH5pEditor(listaTopicosIdyNombre);
                        }
                        else{
                            //TODO syncronizar razonador y traer recomendaciones
                            // Crear un array de strings
                            const mensajes = ["Error en el servidor", "No se pudo cargar el archivo",
                                 "El usuario no está autorizado"];
                            if(mensajes.length === 0){
                                // Redirigir a la página de h5p
                                window.location.href = 'http://localhost/local/yourplugin/h5pEditor.php?courseid='
                                + paramCourseid
                                + '&oaid=' + paramsObject['oaid']+"&contextid=14";
                            }
                            contenedorMensajes.innerHTML = '';

                            // Recorrer el array de mensajes
                            mensajes.forEach((mensaje) => {
                                // Crear un nuevo elemento p (parrafo) para cada mensaje
                                const p = document.createElement('p');

                                // Asignar el contenido del mensaje al párrafo
                                p.textContent = mensaje;

                                // Asignar el contenido del mensaje al párrafo
                                p.textContent = mensaje;

                                // Aplicar estilo en línea directamente
                                p.style.color = "red"; // Color rojo
                                p.style.fontWeight = "bold"; // Negrita

                                // Insertar el párrafo en el div contenedor
                                contenedorMensajes.appendChild(p);
                            });
                            buttonCargarOrden.insertAdjacentElement('afterend', contenedorMensajes);

                        }

                    })
                    .catch(error => {
                        log.debug('Hubo un problema con la solicitud:', error); // Manejar errores
                    });


                });

                let selectedTopics = [];
                var treeData = [];
                const sortableTreeDiv = document.createElement('div');

                const reloadSortableTreeDiv = () => {
                    // Elimina todas las opciones del select para que las vuelva a cargar con el boton
                    // var selectMenutopic = document.getElementById('menutopic');
                    // selectMenutopic.options.length = 0;

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
                    // container.textContent = "Unidad";
                    container.className = 'unidad';
                    container.id = 'topicosSeleccionados';
                    container.style.marginLeft="15px" ;
                    container.style.margin="20px" ;
                    treeData.forEach(item => {
                        const temaDiv = createDivTema(item); //createTree(item, item.name, container);
                        createDivTopico(item, item.id, temaDiv);
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
                    sortableTreeDiv.insertAdjacentElement('afterend', buttonCargarOrden);
                    buttonCargarOrden.insertAdjacentElement('afterend', contenedorCheckboxIgnorarRecomendaciones);

                };


                //Variable para almacenar los topicos id seleccionados y luego mandar a la Ontologia
                // var selectedTopics = [];

                // Create form elements
                    // var selectTopicosH5P = [];
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


                    //Get Unidad de Conocimiento si no es "" entonces ya fue definida
                    var selectedUnidad ="";
                    fetch(`http://localhost:8080/ontology/getOAUnidad?oaid=${encodeURIComponent("OA"+paramsObject['oaid'])}`)
                    .then(response => response.text())
                    .then(data => {
                        log.debug('Success selectedUnidad:', data);
                        selectedUnidad=data;
                        // Cargar unidades en la lista desplegable
                        // const unidadSelect = document.getElementById('unidadSelect');
                        datos.unidades.forEach((unidad, index) => {
                            const option = document.createElement('option');
                            option.value = index; // Guardar el índice para referencia
                            selectedIndex = index;
                            option.textContent = unidad.nombre;
                            option.id = unidad.id;
                            if(selectedUnidad === unidad.id){
                                fetch(`http://localhost:8080/ontology/getOATopics?oaid=${encodeURIComponent("OA"+
                                    paramsObject['oaid'])}`)
                                .then(response => response.json())
                                .then(data => {
                                    log.debug('Success selectedTopicsFromConocimiento:', data);
                                    selectedTopicsFromConocimiento = data;
                                    const temasList = crearTemasyTopicosCheckboxes(datos.unidades[index].temas);
                                    ul.appendChild(temasList);
                                    reloadSortableTreeDiv();
                                    log.debug(selectedTopicsFromConocimiento);
                                })
                                .catch(error => {
                                    log.debug('Error:', error);
                                });
                                option.selected=true;

                            }
                            select.appendChild(option);
                        });
                        //Get OA RAAsignatura (los que ya estan en la ontologia Conocimiento)
                        return fetch(`http://localhost:8080/ontology/getOARAAsignatura?oaid=${encodeURIComponent("OA"+
                            paramsObject['oaid'])}`);
                    })
                    .then(response => response.json())
                                .then(data => {
                                        log.debug('Success selectedRAAsignatura:', data);
                                        selectedRAAsignaturaFromConocimiento = data;

                                        crearRAAsignaturaCheckboxes();
                                })
                    .catch(error => {
                        log.debug('Error:', error);
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

                    var selectedIndex = null;
                    // Manejar el cambio de selección de unidad
                    select.addEventListener('change', (event) => {
                        selectedIndex = event.target.value;
                        // const temasContainer = document.getElementById('temasContainer');
                        ul.innerHTML = ''; // Limpiar contenido anterior
                        selectedTopics = [];

                        if (selectedIndex !== '') {
                            //guardar unidad en la ontologia
                            fetch("http://localhost:8080/ontology/insertUnidad", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                                },
                                body: new URLSearchParams({
                                  unidad: datos.unidades[selectedIndex].id
                                })
                              })
                              .then(response => {
                                if (!response.ok) {
                                  throw new Error("Error en la solicitud");
                                }
                                return response.text(); // O .json() si esperas una respuesta JSON
                              })
                              .then(data => {
                                log.debug("Respuesta del servidor:", data);
                              })
                              .catch(error => {
                                log.debug("Error:", error);
                              });

                            const temas = datos.unidades[selectedIndex].temas;
                            const temasList = crearTemasyTopicosCheckboxes(temas);

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
                                        // <div class="form-group">
                                        //     <label for="topicoSoporte">Posibles Topico Soporte</label>
                                        //     <select id="topicoSoporte" class="form-control" required>
                                        //         <!-- Options will be added dynamically here -->
                                        //     </select>
                                        // </div>
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
                                        const topicNameNormalized = topicName.trim()
                                        .replace(/\s+/g, '_')
                                        .replace(/[^a-zA-Z0-9_]/g, '');
                                        newSubtopicCheckbox.id = topicNameNormalized;
                                        newSubtopicCheckbox.setAttribute('data-name', topicName);
                                        newSubtopicCheckbox.setAttribute('data-parent', parentName);
                                        newSubtopicCheckbox.setAttribute('data-level', nivel);
                                        newSubtopicCheckbox.setAttribute('data-tema', tema+'-'+topicNameNormalized);
                                        newSubtopicCheckbox.setAttribute('data-relation', topicRelation);
                                        addEventListenerToCheckbox(newSubtopicCheckbox);
                                        newSubtopicDiv.appendChild(newSubtopicCheckbox);

                                        const newSubtopicLabel = document.createElement('label');
                                        newSubtopicLabel.htmlFor = topicName;
                                        newSubtopicLabel.textContent = `${topicName} (${topicRelation})`;
                                        newSubtopicLabel.style.marginRight="5px" ;

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

                                        // TODO insertar topico en OntoU
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
                            if (selectedTopicsFromConocimiento.includes(topico.id)) {
                                checkbox.checked=true;
                                addTopicToJSON(topico.id, topicRelation, parentName, level, tema+'-'+topico.id, topico.nombre);
                            }
                            checkbox.setAttribute('data-name', topico.nombre);
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
                            label.style.marginRight="5px" ;
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
                            const topicName = e.target.getAttribute('data-name');

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

                                addTopicToJSON(topicId, topicRelation, parentName, level, tema, topicName);
                                log.debug(`Added ${topicId}-${parentName} al JSON`);
                            } else {
                                const response = await guardarTopicoOA(topicId, paramsObject['oaid'], false);
                                log.debug(response);

                                // Lógica para eliminar del JSON si el checkbox se desmarca
                                selectedTopics = selectedTopics.filter(topic => topic.id !== topicId);
                                log.debug(`Eliminar ${topicId} del JSON`);
                            }

                            reloadSortableTreeDiv();

                        });
                    };

                    const createDivTema = (item) => {
                        const itemDiv = document.createElement('div');
                        itemDiv.textContent = '-'.repeat(item.level * 5) + item.nombre;
                        itemDiv.className = 'tema'; // Clase para aplicar estilos
                        itemDiv.draggable = true; // Habilitar draggable
                        itemDiv.id = item.id;
                        itemDiv.style.fontFamily = 'Arial, sans-serif'; // Set font family
                        itemDiv.style.fontSize = '24px'; // Set font size
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
                                itemDiv.textContent = '-'.repeat(kid.level * 5) + kid.nombre;
                                itemDiv.className = 'topic'; // Clase para aplicar estilos
                                itemDiv.draggable = true; // Habilitar draggable
                                itemDiv.id = kid.id;
                                itemDiv.style.fontFamily = 'Arial, sans-serif'; // Set font family
                                itemDiv.style.fontSize = '18px'; // Set font size
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
                    const addTopicToJSON = (topicId, topicRelation, parentName, level, tema, topicName) => {
                        const newTopic = { id: topicId, parentName: parentName, relation: topicRelation, level: level,
                             tema: tema, nombre: topicName};

                        selectedTopics.push(newTopic);

                    };


                    const createNode=(idTopic, fullPath, level, topicRelation, nombre)=> {
                        return {
                            id: idTopic,
                            fullPath: fullPath,
                            level: level,
                            relation: topicRelation,
                            nombre: nombre,
                            children: []
                        };
                    };

                    const findParentNodeRecursive=(node, fullPath)=> {

                        for (let child of node.children) {
                            if(fullPath.includes('-'+child.id+'-')){
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
                        selectedTopics.forEach(({ tema, level, relation, nombre }) => {
                            const fullPath = tema;
                            const idTopic = fullPath.split('-').pop(); // Obtener el nombre del tópico (última parte del fullPath)
                            const rootName = fullPath.split('-')[0]; // El primer elemento es el "raíz" o tema

                            // Asegúrate de crear un nodo raíz para cada tema único
                            if (!topicDict[rootName]) {
                                // Buscar el label por su ID
                                const temaNombreLabel = document.getElementById(rootName);

                                // Imprimir el textContent en la consola
                                var nombreTema="";
                                if (temaNombreLabel) {
                                    nombreTema=temaNombreLabel.textContent;
                                }
                                topicDict[rootName] = createNode(rootName, null, 0, null, nombreTema);
                            }

                            // Si hay un guion pero no más, se trata de un tópico de nivel 1
                            if (fullPath.split('-').length === 2) {
                                const rootNode = topicDict[rootName];
                                rootNode.children.push(createNode(idTopic, fullPath, level, relation, nombre));
                            } else {
                                // Intentar encontrar el padre en el fullPath
                                const parentNode = findParentNodeRecursive(topicDict[rootName], fullPath);
                                if (parentNode) {
                                    parentNode.children.push(createNode(idTopic, fullPath, level, relation, nombre));
                                } else {
                                    // Si no se encuentra un padre seleccionado, añadir a la raíz
                                    const rootNode = topicDict[rootName];
                                    rootNode.children.push(createNode(idTopic, fullPath, level, relation, nombre));
                                }
                            }

                            // Agregar el nodo al diccionario
                            // topicDict[name] = createNode(name, fullPath);
                        });

                        // Construir el árbol final desde las raíces
                        const finalTree = Object.values(topicDict);

                        return finalTree;
                    };


                    //TEST AJAX

                    // const updateVerboOA = (
                    //     id,
                    //     name,
                    // ) => ajax.call([{
                    //     methodname: 'local_yourplugin_store_oa_fields',
                    //     args: {
                    //         id,
                    //         name,
                    //     },
                    // }])[0];

                    // const verifyVerbLevel = (
                    //     raasignatura,
                    //     verbo,
                    // ) => ajax.call([{
                    //     methodname: 'local_yourplugin_verify_verb_level',
                    //     args: {
                    //         raasignatura,
                    //         verbo,
                    //     },
                    // }])[0];

                    // verboInput.addEventListener('change', async function(event) {
                    //     // Your event handling code here
                    //     log.debug('Input VERBO value changed:', event.target.value);

                    //     resultadoAprendizajeOA["verbo"] = event.target.value;
                    //     // log.debug(resultadoAprendizajeOA["verbo"]);

                    //     const id = paramsObject['oaid'];
                    //     const name = event.target.value;

                    //     const response = await updateVerboOA(id, name);
                    //     log.debug(response);

                    //     const responseVerbLevel = await verifyVerbLevel("RAAsignatura", name);
                    //     log.debug(responseVerbLevel);

                    //   });



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
                    label.style.marginRight="5px" ;
                    var input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    // Aplicar estilos en línea
                    input.style.padding = '10px';
                    input.style.border = '1px solid #A0C4FF';
                    input.style.borderRadius = '5px';
                    input.style.backgroundColor = '#fff';
                    input.style.color = '#333';
                    input.style.fontSize = '16px';
                    input.style.margin = '10px 0'; // Margen arriba y abajo
                    container.appendChild(label);
                    container.appendChild(input);
                    return container;
                }



                // tablaTitulo.insertAdjacentElement('beforeend', buttonCargarOrden);

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

                // var editarcrearTitulo = document.createElement('h3');
                // editarcrearTitulo.textContent = 'Crear o editar H5P:';
                // tablaTitulo.insertAdjacentElement('afterend', editarcrearTitulo);

                // var formElements = document.getElementsByTagName("form");
                // var h5pform = formElements[1];
                // log.debug(h5pform);
                // var metadatosTitulo = document.createElement('h3');
                // metadatosTitulo.textContent = 'Completar Metadatos:';
                // h5pform.insertAdjacentElement('afterend', metadatosTitulo);
                // var buttonFin = document.createElement('button');

                // buttonFin.setAttribute('id', 'finBtn');
                // buttonFin.textContent = 'Finalizar OA';

                // // Add event listener to button
                // buttonFin.addEventListener('click', async function() {
                //     log.debug("CLICKED");

                //     // Redirigir a la página de tu plugin local
                //     window.location.href = 'http://localhost/local/yourplugin/metadatos.php?courseid=' + paramCourseid
                //     + '&oaid=' + paramsObject['oaid'];
                // });

                // h5pform.insertAdjacentElement('afterend', buttonFin);

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
                // async function saveChanges() {
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
                    // const saveChangesOnOntology = (
                    //     oaid,
                    //     raoa,
                    //     contenidos,
                    //     actividades,
                    //     metadatos,
                    // ) => ajax.call([{
                    //     methodname: 'local_yourplugin_save_changes_automatically',
                    //     args: {
                    //         oaid,
                    //         raoa,
                    //         contenidos,
                    //         actividades,
                    //         metadatos,
                    //     },
                    // }])[0];

                    // var input = verboInput.querySelector('input');
                    // resultadoAprendizajeOA["verbo"] = input.value;
                    // log.debug("resultadoAprendizajeOA:",resultadoAprendizajeOA["verbo"]);
                    // const saveChangesOnOntologyResponse =
                    //  await saveChangesOnOntology(paramsObject['oaid'], resultadoAprendizajeOA, selectedTopics,[],[]);
                    // log.debug(saveChangesOnOntologyResponse);
                    // log.debug("RUN saveChanges");
                // }
                // var input = verboInput.querySelector('input');
                // log.debug("verbo: ", input.value);
                // setInterval(saveChanges, 150000); // Cada 5 minutos

            });
        }
    };
});
