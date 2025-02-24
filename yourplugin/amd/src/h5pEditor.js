/*eslint linebreak-style: ["error", "windows"]*/
define(['jquery','core/log'], function($, log){
    return {
        init: function(datos_json) {
            $(document).ready(function(){
                // Convertir los datos JSON de PHP a objetos JavaScript
                var datos = JSON.parse(datos_json);

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

                const selectMenuid= document.getElementById("menuid");
                selectMenuid.options[0].text = "Seleccionar";

                // Obtener parametro courseid
                var paramCourseid = paramsObject['courseid'];
                var selectMenutopic = document.getElementById('menutopic');
                if(selectMenutopic){
                    // Elimina todas las opciones del select
                    selectMenutopic.options.length = 0;

                    // Llenar el select con los datos recursivamente
                    createOptionsRecursively(selectMenutopic, datos.treeData);
                }

                // Select del tipo de recurso
                const selectMenulibrary= document.getElementById("menulibrary");
                selectMenulibrary.options[0].text = "Seleccionar";

                // Logica para el Select del tipo de componente
                var selectMenutipo = document.getElementById('menutipo');
                selectMenutipo.options[0].text = "Seleccionar";
                selectMenutipo.addEventListener("change", function () {
                    Array.from(selectMenulibrary.options).forEach(option => {
                            option.hidden = false; // Ocultar la opcion
                    });

                    const menutipo = this.value; // Obtiene el valor seleccionado
                    const menutopic = document.getElementById("menutopic");
                    // Si el tipo de componente es evaluacion
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
                                option.hidden = true; // Ocultar opcion en el select del tipo de recurso
                            }
                        });
                    } else {
                        menutopic.disabled = false; // Activa el select menutopic
                    }
                });

                // Mover el mensaje de error a donde corresponde
                var saveChangesButtonH5P = document.getElementById('id_submitbutton');
                var errorMessage = document.getElementById("error-message");
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
                // Event listener to button
                buttonFin.addEventListener('click', async function() {

                    // Redirigir a la proxima pantalla
                    window.location.href = 'http://localhost/local/yourplugin/metadatos.php?courseid=' + paramCourseid
                    + '&oaid=' + paramsObject['oaid'];
                });

                // Agregar titulo a la pagina
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
