/*eslint linebreak-style: ["error", "windows"]*/
define(['jquery','core/log','core/ajax','core/modal_factory','core/modal_events',
    'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js'], function($, log, ajax, ModalFactory,
    ModalEvents, Sortable){
    return {
        init: function(datos_json) {
            $(document).ready(function(){
                // Convertir los datos JSON de PHP a objetos JavaScript
                var datos = JSON.parse(datos_json);
                var datosCopyAux = datos.unidades;
                var rasAsignaturaArray = datos.raAsignaturaList;
                var verbosList = datos.verbosList;

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

                // Obtener el URL
                var queryString = window.location.search;

                // Eliminar el '?' character.
                queryString = queryString.substring(1);

                // Dividir los parametros en un array
                var params = queryString.split('&');

                // Crear objeto para almacenar los parametros.
                var paramsObject = {};

                // Iterar y almacenar en paramsObject.
                params.forEach(function(param) {
                    var keyValue = param.split('=');
                    var key = decodeURIComponent(keyValue[0]);
                    var value = decodeURIComponent(keyValue[1]);
                    paramsObject[key] = value;
                });

                // Obtener parametro courseid
                var paramCourseid = paramsObject['courseid'];


                // Obtener selected Topics (topicos que ya estan en la ontologiaConocimiento)
                var selectedTopicsFromConocimiento = [];
                var selectedRAAsignaturaFromConocimiento = [];

                // Llevar conteo de los RA seleccionados
                var resultadoAprendizajeOA = {"raasignatura":[],
                                                "verbo":"",
                                                "objeto":"",
                                                "condicion":"",
                                                "finalidad":""
                };

                // Diseno de la pag.
                var seleccionarUnidadTitulo = document.createElement('h3');
                seleccionarUnidadTitulo.textContent = 'Seleccionar Unidad y Tópicos:';
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
                title.textContent = 'Definir el Resultado de Aprendizaje del Objeto de Aprendizaje';
                title.style.marginTop="10px";

                checkboxesContainer.insertAdjacentElement('afterend', title);

                // Crear el elemento select Verbos Nivel 1
                var selectNivel1 = document.createElement('select');
                selectNivel1.setAttribute('id', 'verbonivel1');
                selectNivel1.addEventListener('change', function(event) {
                    if (this.value === "") {
                        // Si se selecciona la opción predeterminada, habilita todos los selects
                        habilitarTodosLosSelects();
                    } else {
                        desactivarOtrosSelects('verbonivel1');
                        log.debug(event.target.value);
                        log.debug(event.target.options[event.target.selectedIndex].text);
                        guardarVerboEnOntologia(event.target.value,event.target.options[event.target.selectedIndex].text, "Nivel1");
                    }
                });
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    selectNivel1.style[key] = value;
                }

                // Crear el elemento select Verbos Nivel 2
                var selectNivel2 = document.createElement('select');
                selectNivel2.setAttribute('id', 'verbonivel2');
                selectNivel2.addEventListener('change', function(event) {
                    if (this.value === "") {
                        // Si se selecciona la opción predeterminada, habilita todos los selects
                        habilitarTodosLosSelects();
                    } else {
                        desactivarOtrosSelects('verbonivel2');
                        log.debug(event.target.value);
                        guardarVerboEnOntologia(event.target.value,event.target.options[event.target.selectedIndex].text, "Nivel2");
                    }
                });
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    selectNivel2.style[key] = value;
                }

                // Crear el elemento select Verbos Nivel 3
                var selectNivel3 = document.createElement('select');
                selectNivel3.setAttribute('id', 'verbonivel3');
                selectNivel3.addEventListener('change', function(event) {
                    if (this.value === "") {
                        // Si se selecciona la opción predeterminada, habilita todos los selects
                        habilitarTodosLosSelects();
                    } else {
                        desactivarOtrosSelects('verbonivel3');
                        log.debug(event.target.value);
                        guardarVerboEnOntologia(event.target.value,event.target.options[event.target.selectedIndex].text, "Nivel3");
                    }
                });
                // Aplicar cada atributo usando un bucle for
                for (const [key, value] of Object.entries(atributosSelect)) {
                    selectNivel3.style[key] = value;
                }

                title.insertAdjacentElement('afterend', selectNivel1);
                selectNivel1.insertAdjacentElement('afterend', selectNivel2);
                selectNivel2.insertAdjacentElement('afterend', selectNivel3);

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

                // Función para guardar verbo en ontologia
                const guardarVerboEnOntologia = (verboId, verboNombre, nivel) =>{
                    //enviar a la ontologia en el momento
                    fetch("http://localhost:8080/ontology/createVerbo", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                        },
                        body: new URLSearchParams({
                            verboId: verboId,
                            verboNombre: verboNombre,
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

                // Crear selects de los verbos por nivel
                crearSelectPorNivel("Nivel1", "verbonivel1");
                crearSelectPorNivel("Nivel2", "verbonivel2");
                crearSelectPorNivel("Nivel3", "verbonivel3");

                // Campos de entrada de texto
                var objetoConocimientoInput = createTextInput('Objeto de Conocimiento:');
                var condicionInput = createTextInput('Condición:');
                var finalidadInput = createTextInput('Finalidad:');

                selectNivel3.insertAdjacentElement('afterend', objetoConocimientoInput);
                objetoConocimientoInput.insertAdjacentElement('afterend', condicionInput);
                condicionInput.insertAdjacentElement('afterend', finalidadInput);

                // Crear elemento para ordenar topicos
                var tablaTitulo = document.createElement('h3');
                tablaTitulo.textContent = 'Ordenar Tópicos:';
                tablaTitulo.style.marginTop="10px";
                finalidadInput.insertAdjacentElement('afterend', tablaTitulo);

                // Funcion para generar los checkboxes de Temas y Topicos
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

                // Funcion para generar los checkboxes de RA Asignatura
                const crearRAAsignaturaCheckboxes = () => {
                    resultadosAprendizaje.forEach(function(raAsignaturaDto) {
                        var checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.style.transform = "scale(1.5)"; // Escala el tamaño
                        checkbox.style.margin = "10px"; // Ajusta el espaciado
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
                            // Ver estado del checkbox
                            if (event.target.checked) {
                                // Enviar a la ontologia que fue seleccionado
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
                                // Agregar Ra al array que lleva el conteo de los RA seleccionados
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
                                
                                //Eliminar RA del array
                                for (let i = resultadoAprendizajeOA["raasignatura"].length - 1; i >= 0; i--) {
                                    if (resultadoAprendizajeOA["raasignatura"][i] === event.target.value) {
                                        resultadoAprendizajeOA["raasignatura"].splice(i, 1);
                                    }
                                }
                            }
                        });
                    });
                };

                // Funcion para redirigir a la proxima pantalla H5PEditor
                const redirectToH5pEditor = (listaTopicosIdyNombre, treeData)=>{

                    // Datos a enviar
                    const dataArray = {oaid:paramsObject['oaid'],
                        courseid:paramCourseid, contextid:paramsObject['contextid'],
                        listaTopicosIdyNombre:listaTopicosIdyNombre,
                        treeData:treeData
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
                checkboxIgnorarRecomendaciones.style.transform = "scale(2)"; // Escala el tamaño
                checkboxIgnorarRecomendaciones.style.margin = "10px"; // Ajusta el espaciado
                checkboxIgnorarRecomendaciones.id = 'checkboxIgnorarRecomendaciones';

                const labelIgnorarRecomendaciones = document.createElement('label');
                labelIgnorarRecomendaciones.htmlFor = 'checkboxIgnorarRecomendaciones';
                labelIgnorarRecomendaciones.textContent = 'Ignorar recomendaciones';
                labelIgnorarRecomendaciones.style.marginRight="5px" ;

                // Añadir el checkbox y su etiqueta al contenedor
                contenedorCheckboxIgnorarRecomendaciones.appendChild(checkboxIgnorarRecomendaciones);
                contenedorCheckboxIgnorarRecomendaciones.appendChild(labelIgnorarRecomendaciones);

                // Boton para seguir a la proxima pantalla
                var buttonCargarOrden = document.createElement('button');
                buttonCargarOrden.setAttribute('id', 'cargarOrdenTopicos');
                buttonCargarOrden.textContent = 'Cargar Orden';
                for (const propiedad in estilosBoton) {
                    buttonCargarOrden.style[propiedad] = estilosBoton[propiedad];
                }

                // Contenedor para los mensajes/recomendaciones de error o advertencia 
                var contenedorMensajes = document.createElement("div");
                contenedorMensajes.setAttribute("id","contenedorMensajes");
                contenedorMensajes.style.marginTop="80px";
                contenedorMensajes.style.textAlign="center";

                // Event listener to buttonCargarOrden
                buttonCargarOrden.addEventListener('click', async function() {
                    // Cargar Objeto de conocimiento en la ontologia
                    // Seleccionamos el input dentro del contenedor
                    const inputElementObjeto = objetoConocimientoInput.querySelector("input");
                    // Obtenemos el valor del input
                    const objeto = inputElementObjeto.value;

                    // Enviar Objeto de conocimiento a la ontologia
                    fetch("http://localhost:8080/ontology/createObjeto", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                        },
                        body: new URLSearchParams({
                            objeto: objeto
                        })
                      })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error("Error en la solicitud");
                        }
                        return response.text(); // O .json() si esperas una respuesta JSON
                      })
                      .then(data => {
                        log.debug("Respuesta del servidor CreateObjeto:", data);
                      })
                      .catch(error => {
                        log.debug("Error:", error);
                      });

                    // Cargar Condicion en la ontologia
                    // Seleccionamos el input dentro del contenedor
                    const inputElementCondiciono = condicionInput.querySelector("input");
                    // Obtenemos el valor del input
                    const condicion = inputElementCondiciono.value;
                    log.debug(condicion);

                    // Enviar Condicion a la ontologia
                    fetch("http://localhost:8080/ontology/createCondicion", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/x-www-form-urlencoded", // O "application/json" si es necesario
                        },
                        body: new URLSearchParams({
                            condicion: condicion
                        })
                      })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error("Error en la solicitud");
                        }
                        return response.text(); // O .json() si esperas una respuesta JSON
                      })
                      .then(data => {
                        log.debug("Respuesta del servidor CreateCondicion:", data);
                      })
                      .catch(error => {
                        log.debug("Error:", error);
                      });


                    // Obtener topicosSeleccionados
                    var topicosSeleccionadosDiv = document.getElementById('topicosSeleccionados');
                    // Seleccionamos todos los divs con la clase "topic" dentro del div principal
                    const topicosSeleccionados = topicosSeleccionadosDiv.querySelectorAll('.topic');
                    // Creamos una lista de strings con el contenido de cada tópico
                    const listaTopicos = Array.from(topicosSeleccionados).map(topico => topico.id.trim());
                    // Creamos un array de objetos con el id y el textContent de cada tópico
                    const listaTopicosIdyNombre = Array.from(topicosSeleccionados).map(topico => ({
                        id: topico.id.trim(),
                        nombre: topico.textContent.trim()
                    }));

                    // Enviar Topicos a la ontologia
                    fetch('http://localhost:8080/ontology/createTopicsRelations', {
                        method: 'POST', // Método HTTP POST
                        headers: {
                            'Content-Type': 'application/json' 
                        },
                        body: JSON.stringify(treeData) // Convertir el array de nodes a JSON y enviarlo en el cuerpo
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.text(); 
                        } else {
                            throw new Error('Error en la solicitud');
                        }
                    })
                    .then(data => {
                        log.debug('Respuesta del servidor createTopicsRelations:', data); 

                        // Enviar el orden de los topicos en la ontologia
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
                            return response.text(); 
                        } else {
                            throw new Error('Error en la solicitud');
                        }
                    })
                    .then(data => {
                        log.debug('Respuesta del servidor setOrdenDeDesarrollo:', data); 

                        // Hacer Razonar la Ontologia
                        return fetch('http://localhost:8080/ontology/razonar?ontologia=CONOCIMIENTO', {
                            method: 'GET', // Método HTTP POST
                            headers: {
                                'Content-Type': 'application/json' 
                            }
                        });
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.text(); 
                        } else {
                            throw new Error('Error en la solicitud');
                        }
                    })
                    .then(data => {
                        // Ver en la ontologia si el RA del OA esta Alineado
                        return fetch('http://localhost:8080/ontology/individuals?className=RAOANoAlineado', {
                            method: 'GET', // Método HTTP POST
                            headers: {
                                'Content-Type': 'application/json' 
                            }
                        });
                    })
                    .then(response => {
                        if (response.ok) {
                            return response.text();
                        } else {
                            throw new Error('Error en la solicitud');
                        }
                    })
                    .then(data => {
                        log.debug('Respuesta del servidor RA No Alineado:', data); 

                        // Verificar si el ignorar recomendaciones esta seleccionado
                        if(checkboxIgnorarRecomendaciones.checked){
                            // Ignorar recomendaciones y seguir con la proxima pantalla
                            redirectToH5pEditor(listaTopicosIdyNombre, treeData);
                        }
                        else{
                            // Array con los mensajes correspondientes a las recomendaciones.
                            const mensajes = ["El verbo no pertenece a un nivel de dominio "+
                                 "cognitivo menor o igual al que pertenecen los verbos de todos los resultados de aprendizaje "+
                                 "de la asignatura que refina"];

                            // Ver respuesta de la ontologia sobre RA del OA Alineado
                            if(data.length === 2){
                                    // Esta Alineado
                                    redirectToH5pEditor(listaTopicosIdyNombre, treeData);
                            }
                            else{
                                // No esta Alineado entonces mostrar advertencia
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
                                    p.style.color = "#FFC107"; // Color rojo
                                    p.style.fontWeight = "bold"; // Negrita
                                    p.style.fontSize = "18px"; // Negrita

                                    // Insertar el párrafo en el div contenedor
                                    contenedorMensajes.appendChild(p);
                                });
                                buttonCargarOrden.insertAdjacentElement('afterend', contenedorMensajes);

                            }

                        }

                    })
                    .catch(error => {
                        log.debug('Hubo un problema con la solicitud:', error); // Manejar errores
                    });
                });

                // Definir orden de los Topicos
                let selectedTopics = [];
                var treeData = [];
                const sortableTreeDiv = document.createElement('div');

                // Funcion para permitir ordenar los topicos.
                const reloadSortableTreeDiv = () => {
                    // Actualizar la vista
                    // Inicializar el árbol y renderizar
                    treeData = buildTreeJSON(selectedTopics);

                    // Llamar a la función y agregar el árbol al DOM
                    while (sortableTreeDiv.firstChild) {
                        sortableTreeDiv.removeChild(sortableTreeDiv.firstChild);
                    }
                    
                    const container = document.createElement('div');
                    container.className = 'unidad';
                    container.id = 'topicosSeleccionados';
                    container.style.marginLeft="15px" ;
                    container.style.margin="20px" ;

                    treeData.forEach(item => {
                        const temaDiv = createDivTema(item);
                        createDivTopico(item, item.id, temaDiv);
                        container.appendChild(temaDiv);
                        new Sortable(temaDiv, {
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

                //Get Unidad de Conocimiento de la Ontologia si no es "" entonces ya fue definida
                var selectedUnidad ="";
                fetch(`http://localhost:8080/ontology/getOAUnidad?oaid=${encodeURIComponent("OA"+paramsObject['oaid'])}`)
                .then(response => response.text())
                .then(data => {
                    log.debug('Success selectedUnidad:', data);
                    selectedUnidad=data;
                    // Cargar unidades en la lista desplegable
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


                // Event Listener para manejar el cambio de selección de unidad
                var selectedIndex = null;
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
                              "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({
                              unidad: datos.unidades[selectedIndex].id
                            })
                          })
                          .then(response => {
                            if (!response.ok) {
                              throw new Error("Error en la solicitud");
                            }
                            return response.text();
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

                // Función recursiva para agregar nuevos subtemas/topico
                const agregarNuevoTopico = (parentElement, parentName, addSubtemaButton, nivel, tema) => {
                    addSubtemaButton.addEventListener('click', async () => {
                        await ModalFactory.create({
                            type: ModalFactory.types.SAVE_CANCEL,
                            title: 'Crear Nuevo Tópico',
                            body: `
                                <form id="subtopicForm">
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

                                    guardarSubtema(datosCopyAux[selectedIndex], parentName, topicName, topicRelation);

                                    // Crear un nuevo subtema
                                    const newSubtopicDiv = document.createElement('div');
                                    newSubtopicDiv.style.marginLeft = `${nivel * 20}px`;
                                    const newSubtopicCheckbox = document.createElement('input');
                                    newSubtopicCheckbox.type = 'checkbox';
                                    newSubtopicCheckbox.style.transform = "scale(1.5)"; // Escala el tamaño
                                    newSubtopicCheckbox.style.margin = "10px"; // Ajusta el espaciado
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
                                    newSubtopicLabel.textContent = `${topicName}`;
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
                        checkbox.style.transform = "scale(1.5)"; // Escala el tamaño
                        checkbox.style.margin = "10px"; // Ajusta el espaciado
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

                    
                //Funcion auxiliar para Ordenar topicos
                const createDivTema = (item) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = '-'.repeat(item.level * 5) + item.nombre;
                    itemDiv.className = 'tema'; // Clase para aplicar estilos
                    itemDiv.draggable = true; // Habilitar draggable
                    itemDiv.id = item.id;
                    itemDiv.style.fontFamily = 'Arial, sans-serif'; // Set font family
                    itemDiv.style.fontSize = '24px'; // Set font size
                    return itemDiv;
                };
                    

                //Funcion auxiliar para Ordenar topicos
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

                // Funcion para agregar el nodo al diccionario para Ordenar Topicos
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

                
                // Funcion para encontrar al padre del nodo para Ordenar Topicos
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

               
                // Funcion para crear arbol para Ordenar Topicos
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

                    });

                    // Construir el árbol final desde las raíces
                    const finalTree = Object.values(topicDict);

                    return finalTree;
                };

 
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
                    input.style.width = '500px'; // Ancho de 400 píxeles
                    container.appendChild(label);
                    container.appendChild(input);
                    return container;
                }

            });
        }
    };
});
