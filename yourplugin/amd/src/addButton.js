/*eslint linebreak-style: ["error", "windows"]*/
define(['jquery','core/log','core/ajax'], function($, log, ajax){
    return {
        init: function(eventData) {
            $(document).ready(function(){
                // Parse el JSON-encoded eventData
                var eventDataObject = JSON.parse(eventData);

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

                var buttonCrearNuevoOA = document.createElement('button');

                buttonCrearNuevoOA.setAttribute('id', 'seleccionarBtn');
                buttonCrearNuevoOA.textContent = 'Crear nuevo OA';
                for (const propiedad in estilosBoton) {
                    buttonCrearNuevoOA.style[propiedad] = estilosBoton[propiedad];
                }
                var mainDiv = document.querySelector('div[role="main"]');
                mainDiv.appendChild(buttonCrearNuevoOA);

                const createNewOA = (
                    courseid,
                    name
                ) => ajax.call([{
                    methodname: 'local_yourplugin_store_oa',
                    args: {
                        courseid,
                        name
                    },
                }])[0];

                // Event listener to button
                buttonCrearNuevoOA.addEventListener('click', async function() {

                    const courseid = eventDataObject.courseid ;
                    const name ="empty name";

                    // Creo nuevo OA en la base de datos de mi plugin y el id es mi OAID
                    const response = await createNewOA(courseid, name, oaid);
                    var oaid = response[0].id;

                    // Redirigir a la página de tu plugin local
                    window.location.href = 'http://localhost/local/yourplugin/index.php?courseid=' + eventDataObject.courseid +
                     "&contextid=" + eventDataObject.contextid + "&oaid=" + oaid;
                });

                //TODO implementar para poder editar un OA existente

            });
        }
    };
});
