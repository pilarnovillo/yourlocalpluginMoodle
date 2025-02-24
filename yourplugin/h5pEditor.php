<?php

use core_h5p\local\library\autoloader;
use core_h5p\editor_ajax;
use core_h5p\editor;
use Moodle\H5PCore;

require(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/formslib.php');
require_once("$CFG->libdir/filestorage/file_storage.php");
require_once($CFG->libdir.'/adminlib.php');

global $PAGE, $CFG, $OUTPUT;


class test_editor_form extends moodleform {
    
    // Agregar elementos al formulario H5P
    /** @var editor H5P editor object */
    private $editor;

    /**
     * Definicion del Formulario
     */
    public function definition() {
        global $DB, $OUTPUT, $USER;

        $mform = $this->_form; 

        //h5p form config
        $id = $this->_customdata['id'] ?? null;
        $library = $this->_customdata['library'] ?? null;
        $contextid = $this->_customdata['contextid'];
        $topic = $this->_customdata['topic'] ?? null;
        $oaid = $this->_customdata['oaid'] ?? null;
        $tipo = $this->_customdata['tipo'] ?? null;

        $editor = new editor();

        
        if ($id) {
            $mform->addElement('hidden', 'id', $id);
            $mform->setType('id', PARAM_INT);

            $editor->set_content($id);
        }
        if ($library) {
            $mform->addElement('hidden', 'library', $library);
            $mform->setType('library', PARAM_RAW);

            $mform->addElement('hidden', 'contextid', $contextid);
            $mform->setType('contextid', PARAM_RAW);

            $mform->addElement('hidden', 'topic', $topic);
            $mform->setType('topic', PARAM_RAW);

            $mform->addElement('hidden', 'oaid', $oaid);
            $mform->setType('oaid', PARAM_RAW);

            $mform->addElement('hidden', 'tipo', $tipo);
            $mform->setType('tipo', PARAM_RAW);

            $context = context_user::instance($USER->id);

            $editor->set_library($library, $contextid, 'contentbank', 'public');
        }
        $this->editor = $editor;
        $mformid = 'coolh5peditor';
        $mform->setAttributes(array('id' => $mformid) + $mform->getAttributes());

        $mform->addElement('header', 'reportsettings', "Editing a H5P inside a quickform");

        $editor->add_editor_to_form($mform);

        // Agregar checkbox para ignorar recomendaciones
        $mform->addElement('advcheckbox', 'ignorevalidation', 'Ignorar Recomendaciones');
        $mform->setDefault('ignorevalidation', 0);

        $this->add_action_buttons();

        // Agregar boton Eliminar 
        $mform->addElement('submit', 'deletebutton', 'Eliminar', array('style' => 'background-color: red; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s ease;'));
    }

    public function save_h5p(stdClass $data) {
        $this->editor->save_content($data);
    }

    // Validaciones personalizadas
    function validation($data, $files) {
        //Si se quiere eliminar se saltea la validacion 
        if (isset($data['deletebutton'])) {
            return array();
        }

        global $DB;
        // Array para almacenar las recomendaciones correspondientes al recurso H5P
        $errors= array();

        // Decodificar el valor de 'h5pparams' como un array asociativo
        $h5pparams = json_decode($data['h5pparams'], true);
            
        //Necesito saber a que OA pertenece(lo saco del param o del nombre), a que Actividad va a ser la unica del OA
        if (isset($data['oaid'])) {
            $oaid = $data['oaid'];
        } else {
            $parts = explode('-', $h5pparams['metadata']['extraTitle']);
            $oaid = $parts[2];
            $oaid = str_replace(array("ID"), '', strip_tags($oaid));
        }

        //Necesito saber a que subactividad pertenece--->ID del h5p puede ser el id(param) de la subactividad 
        if (isset($data['id'])) {
            $idSubAct = $data['id'];
        } else {
            // Obtener el último ID de la tabla
            $last_id = $DB->get_field("h5p", 'MAX(id)', array());
            
            // Si `get_field` no retorna resultados, inicializa $last_id en 0
            $idSubAct = $last_id ? $last_id + 1 : 1;

        }
        
        //Necesito saber que tipo es el h5p si acti, evaluacion, contenido u ejemplo
        //Si es nuevo tengo el tipo como parametro sino lo saco del nombre
        if (isset($data['tipo'])) {
            $tipo = $data['tipo'];
        } else {
            $parts = explode('-', $h5pparams['metadata']['extraTitle']);
            $tipo = $parts[3];
        }

        //TOPICO esta en el parametro si es un nuevo h5p o en el nombre si se esta Editando
        // Necesito saber a que topico satisface esta subActividad
        if (isset($data['topic'])) {
            $topic = $data['topic'];
        } else {
            $parts = explode('-', $h5pparams['metadata']['extraTitle']);
            $topic = $parts[0];
        }

        switch ($tipo) {
            case 'actividad':
                // Lógica para la opción 'Actividad'
                echo "Esto es una Actividad.";
                // URL del endpoint
                $url = "http://localhost:8080/ontology/insertSubactividad";
                // Construir la URL con los parámetros
                $fullUrl = $url . "?idSubact=" . urlencode($idSubAct) . "&oaid=" . urlencode($oaid) . "&idTopico=" . urlencode($topic) . "&library=" . urlencode($data['h5plibrary']);
                // Inicializar cURL
                $ch = curl_init($fullUrl);

                // Configurar las opciones de cURL
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para recibir la respuesta como string
                curl_setopt($ch, CURLOPT_POST, true); // Usar el método POST
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json', // Especificar que enviamos JSON
                    'Content-Length: ' . strlen($data['h5pparams'])
                ));
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data['h5pparams']); // Cuerpo de la solicitud en JSON

                // Ejecutar la solicitud
                $response = curl_exec($ch);

                // Manejar posibles errores de cURL
                if(curl_errno($ch)) {
                    echo 'Error en cURL: ' . curl_error($ch);
                }

                // Cerrar cURL
                curl_close($ch);
                
                break;
            
            case 'ejemplo':
                // Lógica para la opción 'Ejemplo'
                echo "Esto es un Ejemplo.";
                $url = "http://localhost:8080/ontology/insertEjemplo";

                // Construir la URL con los parámetros
                $fullUrl = $url . "?idEjemplo=" . urlencode($idSubAct) .  "&idTopico=" . urlencode($topic);

                // Inicializar cURL
                $ch = curl_init($fullUrl);

                // Configurar las opciones de cURL
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para recibir la respuesta como string
                curl_setopt($ch, CURLOPT_POST, true); // Usar el método POST

                // Ejecutar la solicitud
                $response = curl_exec($ch);

                // Manejar posibles errores de cURL
                if(curl_errno($ch)) {
                    echo 'Error en cURL: ' . curl_error($ch);
                }

                // Cerrar cURL
                curl_close($ch);

                break;
        
            case 'contenido':
                // Lógica para la opción 'Contenido'
                //TODO Contar los elementos de interaccion

                // URL del endpoint
                $url = "http://localhost:8080/ontology/insertContenido";

                // Construir la URL con los parámetros
                $fullUrl = $url . "?idContenido=" . urlencode($idSubAct) . "&oaid=" . urlencode($oaid) . "&library=" . urlencode($data['h5plibrary']);

                // Inicializar cURL
                $ch = curl_init($fullUrl);

                // Configurar las opciones de cURL
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para recibir la respuesta como string
                curl_setopt($ch, CURLOPT_POST, true); // Usar el método POST
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json', // Especificar que enviamos JSON
                    'Content-Length: ' . strlen($data['h5pparams'])
                ));
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data['h5pparams']); // Cuerpo de la solicitud en JSON

                // Ejecutar la solicitud
                $response = curl_exec($ch);

                // Manejar posibles errores de cURL
                if(curl_errno($ch)) {
                    echo 'Error en cURL: ' . curl_error($ch);
                }

                // Cerrar cURL
                curl_close($ch);

                break;
            case 'evaluacion':
                // URL del endpoint
                $url = "http://localhost:8080/ontology/insertEvaluacion";

                // Construir la URL con los parámetros
                $fullUrl = $url . "?idEvaluacion=" . urlencode($idSubAct) . "&oaid=" . urlencode($oaid) . "&library=" . urlencode($data['h5plibrary']);

                // Inicializar cURL
                $ch = curl_init($fullUrl);

                // Configurar las opciones de cURL
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para recibir la respuesta como string
                curl_setopt($ch, CURLOPT_POST, true); // Usar el método POST
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json', // Especificar que enviamos JSON
                    'Content-Length: ' . strlen($data['h5pparams'])
                ));
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data['h5pparams']); // Cuerpo de la solicitud en JSON

                // Ejecutar la solicitud
                $response = curl_exec($ch);

                // Manejar posibles errores de cURL
                if(curl_errno($ch)) {
                    echo 'Error en cURL: ' . curl_error($ch);
                }

                // Cerrar cURL
                curl_close($ch);

                break;
            default:
                // Lógica para cuando no coincide con ninguno de los casos anteriores
                echo "Tipo no reconocido.";
                break;
        }

        
        // Función recursiva para buscar una cadena en un array o un objeto
        function searchInArray($array, $search) {
            foreach ($array as $key => $value) {
                if (is_array($value) || is_object($value)) {
                    if (searchInArray((array)$value, $search)) {
                        return true;
                    }
                } else {
                    if (strpos($value, $search) !== false) {
                        return true;
                    }
                }
            }
            return false;
        }    


        // Funcion recursiva para buscar todos los campos "text" que representa las opciones.
        function findTextFields($array, &$textFields = []) {
            foreach ($array as $key => $value) {
                if (is_array($value)) {
                    // Recursively search if the value is an array
                    findTextFields($value, $textFields);
                } elseif ($key === 'text') {
                    // If the key is "text", add the value to the result
                    $textFields[] = $value;
                }
            }
        }

        // Verificar si el checkbos Ingnorar recomendaciones esta seleccionado
        if (!isset($data['ignorevalidation']) || !$data['ignorevalidation']) {
            // Hacer las consultas correspondientes para recomendaciones dentro del editor H5P
            //Tipo de libreria para saber como recorrer el JSON
            $h5plibrary = $data['h5plibrary'];
            // TODO completar para todos los tipos de recurso

            //MultiChoice
            // Buscar la cadena "H5P.MultiChoice"
            $searchString = "H5P.MultiChoice";
            $found = searchInArray($h5pparams, $searchString);

            if ($found) {
                // Buscar todos los campos text, que serian las opciones del MultiChoice
                $textFields = [];
                findTextFields($h5pparams, $textFields);

                // Verificar si "Ninguna de las anteriores" o "Todas las anteriores" existen
                $foundNinguna = false;
                $foundTodas = false;

                foreach ($textFields as $text) {
                    if (strpos($text, "Ninguna de las anteriores") !== false) {
                        $foundNinguna = true;
                    }
                    if (strpos($text, "Todas las anteriores") !== false) {
                        $foundTodas = true;
                    }
                }

                if ($foundNinguna) {
                    $errors['foundNinguna'] = "Se recomienda evitar opciones como 'Ninguna de las anteriores'";
                }

                if ($foundTodas) {
                    $errors['foundTodas'] = "Se recomienda evitar opciones como 'Todas las anteriores'";
                }
            }

        }

        if (!empty($errors)) {
            // Con el id luego el javascript lo coloca en el lugar correspondiente
            echo '<div id="error-message" style="color: red;">';
            foreach ($errors as $error) {
                echo "<p>$error</p>"; // Muestra cada mensaje en un <p>
            }
            echo '</div>';
        }
        
        return $errors;
        
    }
}


session_start(); // Iniciar la sesión

// Requiere que el usuario inicie sesión
require_login(null, false);

// Definir parametros
$contentid = optional_param('id', null, PARAM_INT);
$library = optional_param('library', null, PARAM_TEXT);
$contextid = optional_param('contextid', null, PARAM_INT);
$topic = optional_param('topic', null, PARAM_TEXT);
$oaid = optional_param('oaid', null, PARAM_INT);
$tipo = optional_param('tipo', null, PARAM_TEXT);

// Configuraciones H5P
$context = context_system::instance();
$fs = new file_storage();
require_capability('moodle/h5p:updatelibraries', $context);

// Obtener URL
$current_url=  basename($_SERVER['REQUEST_URI']);

$PAGE->set_context($context);

// Verificar si los datos fueron enviados
if (isset($_POST['dataArray'])) {
    // Decodificar el array JSON enviado desde JavaScript
    $dataArray = json_decode($_POST['dataArray'], true);
    
    // Guardar el array en la sesión para futuras visitas
    $_SESSION['dataArray'] = $dataArray;  
}

// Recuperar el array de la sesión si no fue enviado por POST
if (isset($_SESSION['dataArray'])) {
    $dataArray = $_SESSION['dataArray'];
    $dataArrayJSON = json_encode($dataArray);
    
} else {
    echo "No hay datos disponibles.";
}

if (empty($contentid)) {
    $contentid = null;
}

// Definir parametros 
$values = [
    'id' => $contentid,
    'library' => $library,
    'contextid' => $contextid,
    'topic' => $topic,
    'oaid' => $oaid,
    'tipo' => $tipo,
];

// Instanciar el formulario H5P en el plugin.
$mform = new test_editor_form($current_url, $values);

// Procesar y mostrar el formulario H5P.
if ($mform->is_cancelled()) {
    // Si el recurso H5P se cancela, `is_cancelled()`retorna true.
    $contentid = null;
    $library = null;
    $_SESSION['dataArray']=$dataArray;
} else if ($data = $mform->get_data()) {

    if (isset($data->deletebutton)) {
        // TODO Eliminar recurso H5P 
        echo "Delete button pressed";
        redirect($current_url, 'Se ha eliminado el recurso existosamente', 2);
    } else {
        // Transformar JSON a un array
        $h5pparams = json_decode($data->h5pparams, true);
        // Actualizar el valor de "extraTitle" 
        // Verificar si el tópico ya está en el extraTitle
        if (strpos($h5pparams['metadata']['extraTitle'], $data->topic) === false) {
            // Si el tópico no está en extraTitle, lo agregamos
            $h5pparams['metadata']['extraTitle'] = $data->topic . "-" . $h5pparams['metadata']['extraTitle'] . "-ID" . $oaid;
        }

        // Verificar si el tópico ya está en el title
        if (strpos($h5pparams['metadata']['title'], $data->topic) === false) {
            // Si el tópico no está en title, lo agregamos
            $h5pparams['metadata']['title'] = $data->topic . "-" . $h5pparams['metadata']['title'] . "-ID" . $oaid;
        }

        // Transformar de nuevo el array en JSON
        $data->h5pparams = json_encode($h5pparams);

        // Cuando se guarda el formulario H5P, y todo fue validado `get_data()` retorna la info
        $mform->save_h5p($data);
        $contentid = null;
        $library = null;
    }
}
else{
    echo "error";
}

echo $OUTPUT->header();

//Crear tabla
$table = new html_table();
$table->width = '70%';
$table->align = array( 'left','centre');
$table->size = array( '55%','15%');

echo html_writer::start_div();
echo html_writer::table($table);
echo html_writer::end_div();

// Funcion para verificar como termina el titulo del recurso H5P
function checkTitleEndsWith($title, $searchString) {
    // Obtener el largo de la cadena searchString
    $searchStringLength = strlen($searchString);
    // Obtener la ultima parte del title del mismo largo que searchString
    $ending = substr($title, -$searchStringLength);
    // Comparar las cadenas
    return $ending === $searchString;
}

// Si se trata de un nuevo recurso H5P
if ($contentid === null && empty($library)) {
    // Crear formulario
    echo html_writer::start_tag('form', array('method' => 'post', 'action' => ''));
    echo html_writer::start_div();

    $h5pcontents = $DB->get_records('h5p', null, 'id', 'id, pathnamehash, jsoncontent');

    foreach ($h5pcontents as $h5pcontent) {
        $file = $fs->get_file_by_hash($h5pcontent->pathnamehash);
        
        if ($file) {
            
            $filecontextid = $file->get_contextid();
            $options[] = [];
            //Filtar solo los correspondientes a este curso, mas abajo filtro por OA
            if($filecontextid == $contextid){
                list($filecontext, $course, $cm) = get_context_info_array($filecontextid);
                $coursename = $course->fullname ?? $SITE->fullname;
                $params = json_decode($h5pcontent->jsoncontent);
                $h5pcontenttitle = ' - ' . ($params->metadata->title ?? 'ERROR: No title');
                //Filtramos solo los h5p correspondientes a este OA 
                // TODO filtrar los que corresponden a los topicos seleccionados
                if(checkTitleEndsWith($h5pcontenttitle, "-ID".$oaid)){
                    $options[$h5pcontent->id] = $coursename .  $h5pcontenttitle;
                }
            }
        }
    }

    echo html_writer::label('Selecccionar un archivo para editar: ', 'id');
    echo html_writer::select($options, 'id');

    // Boton para editar H5P existente
    echo html_writer::start_div('', array('style' => 'margin-top: 20px'));
    echo html_writer::tag('button', 'Editar', array('id' => 'buttonEditarH5P', 'style' => 'background-color: #0073e6; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s ease;'));
    echo html_writer::end_div();

    $options2 = [];
    autoloader::register();
    $editor_ajax = new editor_ajax();
    $libraries = $editor_ajax->getLatestLibraryVersions();

    //Tipos de recurso H5P
    foreach ($libraries as $library) {
        $key = H5PCore::libraryToString(['name'=>$library->machine_name, 'majorVersion' => $library->major_version,
            'minorVersion' => $library->minor_version]);
        $options2[$key] = $library->title;
    }

    $topics = [];
    // Tipos de componente
    $tipos = array(
        'contenido' => 'Contenido',
        'ejemplo' => 'Ejemplo',
        'actividad' => 'Actividad',
        'evaluacion' => 'Evaluacion'
    );
    echo html_writer::label('Seleccionar para crear nuevo archivo: ', 'library');
    echo html_writer::select($tipos, 'tipo');
    echo html_writer::select($topics, 'topic');
    echo html_writer::select($options2, 'library');

    // Boton para crear un recurso H5P nuevo
    echo html_writer::start_div('', array('style' => 'margin-top: 20px'));
    echo html_writer::tag('button', 'Crear', array('id' => 'buttonCrearNuevoH5P', 'style' => 'background-color: #0073e6; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s ease;'));
    echo html_writer::end_div();

    // Cerrar formulario
    echo html_writer::end_div();
    echo html_writer::end_tag('form');
} else {
    $mform->display();
}

// Incluir javascript
$PAGE->requires->js_call_amd('local_yourplugin/h5pEditor', 'init', array($dataArrayJSON)); 
echo $OUTPUT->footer();
