<?php

require(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/formslib.php');
require_once("$CFG->libdir/filestorage/file_storage.php");
require_once($CFG->libdir.'/adminlib.php');

global $PAGE, $CFG, $OUTPUT;


// Requiere que el usuario inicie sesión
require_login(null, false);

// Obtener URL
$current_url=  basename($_SERVER['REQUEST_URI']);

// Configuraciones de Moodle
$context = context_system::instance();
$PAGE->set_context($context);

echo $OUTPUT->header();

// Inicializa CURL
$ch = curl_init();

// URL del endpoint para razonar
$apiUrl = 'http://localhost:8080/ontology/razonar?ontologia=OntoU';

// Configura la URL y otras opciones
curl_setopt($ch, CURLOPT_URL, $apiUrl);
// Para obtener el resultado en una variable en lugar de imprimirlo
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 

// Ejecuta la solicitud y guarda la respuesta
$response = curl_exec($ch);

// Verifica si ocurrió algún error
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {

        // URL del endpoint para sincronizar el razonador sobre la ontologia CONOCIMIENTO
        $apiUrl = 'http://localhost:8080/ontology/synchronizeReasoner?ontologia=CONOCIMIENTO';

        // Configura la URL y otras opciones
        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        // Para obtener el resultado en una variable en lugar de imprimirlo
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Ejecuta la solicitud y guarda la respuesta
        $response = curl_exec($ch);

        // Verifica si ocurrió algún error
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }

        // Obtener el courseid del url
        $courseid = optional_param('courseid', null, PARAM_INT);

        // Obtener el course object en base al courseid
        $course = get_course($courseid);

        // Accesder al nombre del curso en moodle
        if ($course) {
            $coursename = $course->fullname;
            $asignatura = $coursename;

            $apiUrl = 'http://localhost:8080/ontology/unidadesTemasTopicosOntoU?asignatura=' . urlencode($asignatura); // URL del endpoint con el parámetro 'asignatura'

            // Configura la URL y otras opciones
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para obtener el resultado en una variable en lugar de imprimirlo
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); // Cabecera para aceptar JSON

            // Ejecuta la solicitud y guarda la respuesta
            $response = curl_exec($ch);

            // Verifica si ocurrió algún error
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            } else {
                // Decodifica la respuesta JSON
                $unidadesTemasTopicos = json_decode($response, true);
                
                if ($unidadesTemasTopicos === null) {
                    echo 'Error al decodificar la respuesta JSON.';
                }
            }
        } else {
            echo "Course not found.";
            // TODO si no existe decir que primero debe ser procesado el plan
        }
        
        
}    

// Cierra el recurso cURL
curl_close($ch);

// Transformar variable a JSON
$instanciasOAJSON = json_encode($unidadesTemasTopicos);

// Incluir javascript
$PAGE->requires->js_call_amd('local_yourplugin/main', 'init', array($instanciasOAJSON));

echo $OUTPUT->footer();


