/*eslint linebreak-style: ["error", "windows"]*/
define(['jquery','core/log','core/ajax'], function($, log, ajax){
    log.debug('Your module is loading2.');
    return {
        init: function(eventData) {
            $(document).ready(function(){
                // log.debug(eventParameter);
                // alert("Hiiiii");
                // Parse the JSON-encoded eventData
                var eventDataObject = JSON.parse(eventData);

                // // Print the parameter to the console
                log.debug(eventDataObject);

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

                /**
                        * Function to create
                */
                async function getOAsbyCourseid() {
                    // ...
                    const courseid = eventDataObject.courseid;

                    const getOAs = async (courseid) => {
                        const response = await ajax.call([{
                            methodname: 'local_yourplugin_get_oa',
                            args: { courseid }
                        }]);
                        return response[0];
                    };

                    try {
                        const response = await getOAs(courseid);
                        log.debug(response);

                        response.forEach(function(record) {
                            // Create a button
                            var buttonOA = document.createElement('button');
                            buttonOA.textContent = 'Edit ' + record.name;

                            // Set the URL
                            var courseid = record.course;
                            var contextid = eventDataObject.contextid;
                            var oaid = record.id; // Assuming 'oaid' is the record's ID

                            // Set the button's click event to navigate to the desired URL
                            buttonOA.addEventListener('click', function() {
                                fetch(`http://localhost:8080/ontology/startService?oaidParam=${oaid}`)
                                .then(response => response.text())
                                .then(data => {
                                    log.debug('Endpoint message:', data);
                                    fetch(`http://localhost:8080/ontology/razonar?ontologia=CONOCIMIENTO`)
                                    .then(response => response.text())
                                    .then(data => {
                                        log.debug('Endpoint message:', data);
                                        fetch(`http://localhost:8080/ontology/razonar?ontologia=OntoU`)
                                        .then(response => response.text())
                                        .then(data => {
                                            log.debug('Endpoint message:', data);
                                            var url = 'http://localhost/local/yourplugin/index.php?courseid=' + courseid +
                                                    '&contextid=' + contextid + '&oaid=' + oaid;
                                            window.location.href = url;
                                        })
                                        .catch(error => {
                                            log.debug('Error:', error);
                                        });
                                    })
                                    .catch(error => {
                                        log.debug('Error:', error);
                                    });
                                })
                                .catch(error => {
                                    log.debug('Error:', error);
                                });
                            });
                            // Append the button to the container
                            mainDiv.appendChild(buttonOA);

                        });


                    } catch (error) {
                        log.debug('Error fetching OA fields:', error);
                    }
                }

                getOAsbyCourseid();

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

                // Add event listener to button
                buttonCrearNuevoOA.addEventListener('click', async function() {
                    log.debug("CLICKED");

                    const courseid = eventDataObject.courseid ;
                    const name ="empty name";

                    const response = await createNewOA(courseid, name, oaid);
                    var oaid = response[0].id;


                    // Redirigir a la página de tu plugin local
                    window.location.href = 'http://localhost/local/yourplugin/index.php?courseid=' + eventDataObject.courseid +
                     "&contextid=" + eventDataObject.contextid + "&oaid=" + oaid;
                });


            });
        }
    };
});
