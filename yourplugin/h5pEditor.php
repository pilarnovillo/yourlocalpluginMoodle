<?php

//TODO move this to another file

use core_h5p\local\library\autoloader;
use core_h5p\editor_ajax;
use core_h5p\editor;
use Moodle\H5PCore;

// require_once(__DIR__ . '/config.php');
require(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/formslib.php');
require_once("$CFG->libdir/filestorage/file_storage.php");
require_once($CFG->libdir.'/adminlib.php');
// echo $CFG->libdir;
// echo __DIR__ .' /../../config.php';
// require 'vendor/autoload.php'; // Importa la biblioteca EasyRDF
require(__DIR__ . '/lib/easyrdf/vendor/autoload.php');

global $PAGE, $CFG, $OUTPUT;



class test_editor_form extends moodleform {
    
    // Add elements to form.
    /** @var editor H5P editor object */
    private $editor;

    /**
     * The form definition.
     */
    public function definition() {
        global $DB, $OUTPUT, $USER;
        // A reference to the form is stored in $this->form.
        // A common convention is to store it in a variable, such as `$mform`.
        $mform = $this->_form; // Don't forget the underscore!

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
            // $editor->set_library($library, $context->id, 'user', 'private', 0);
            $editor->set_library($library, $contextid, 'contentbank', 'public');
        }
        $this->editor = $editor;
        $mformid = 'coolh5peditor';
        $mform->setAttributes(array('id' => $mformid) + $mform->getAttributes());

        // $this->add_action_buttons();

        $mform->addElement('header', 'reportsettings', "Editing a H5P inside a quickform");

        $editor->add_editor_to_form($mform);

        // Add a checkbox to ignore validation
        $mform->addElement('advcheckbox', 'ignorevalidation', 'ignorevalidation');
        $mform->setDefault('ignorevalidation', 0);

        $this->add_action_buttons();

        // Add custom Delete button
        $mform->addElement('submit', 'deletebutton', 'Delete', array('style' => 'background-color: red; color: white; padding: 10px 20px;'));
    }

    public function save_h5p(stdClass $data) {
        $this->editor->save_content($data);
    }

    // Custom validation should be added here.
    function validation($data, $files) {
        //Si se quiere eliminar se saltea la validacion 
        if (isset($data['deletebutton'])) {
            // Bypass validation when delete is pressed
            return array();
        }

        global $DB;
        $errors= array();
        // TODO enviar info a la ontologia 
        
        
        print_r($data);

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
        // Mostrar el resultado
        echo "OAID:".$oaid;

        //Necesito saber a que subactividad pertenece--->ID del h5p puede ser el id(param) de la subactividad 
        
        if (isset($data['id'])) {
            $idSubAct = $data['id'];
        } else {
            // Obtener el último ID de la tabla
            $last_id = $DB->get_field("h5p", 'MAX(id)', array());
            
            // Si `get_field` no retorna resultados, inicializa $last_id en 0
            $idSubAct = $last_id ? $last_id + 1 : 1;

        }
        echo "ID h5p:".$idSubAct;
        

        //Necesito saber que tipo es el h5p si acti, evaluacion, contenido u ejemplo
        //Si es nuevo tengo el tipo como parametro sino lo saco del nombre
        if (isset($data['tipo'])) {
            $tipo = $data['tipo'];
        } else {
            $parts = explode('-', $h5pparams['metadata']['extraTitle']);
            $tipo = $parts[3];
        }
        // Mostrar el resultado
        echo "TIPO:".$tipo;

        //TOPICO esta en el parametro si es un nuevo h5p o en el nombre si se esta Editando
        // Necesito saber a que topico satisface esta subActividad
        if (isset($data['topic'])) {
            $topic = $data['topic'];
        } else {
            $parts = explode('-', $h5pparams['metadata']['extraTitle']);
            $topic = $parts[0];
        }
        // Mostrar el resultado
        echo "TOPIC:".$topic;

        switch ($tipo) {
            case 'actividad':
                // Lógica para la opción 'Actividad'
                echo "Esto es una Actividad.";
                // URL del endpoint
                $url = "http://localhost:8080/ontology/insertSubactividad";

                // Convertir los datos a formato JSON
                // $jsonDataString = json_encode();

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

                // Imprimir la respuesta
                echo $response;
                
                break;
            
            case 'ejemplo':
                // Lógica para la opción 'Ejemplo'
                echo "Esto es un Ejemplo.";
                //call endpoint http://localhost:8080/ontology/insertEjemplo?idTopico=TOPICID&idEjemplo=IDH5P
                break;
        
            case 'contenido':
                // Lógica para la opción 'Contenido'
                //Contar los elementos de interaccion?
                echo "Esto es un Contenido.";
                break;
        
            default:
                // Lógica para cuando no coincide con ninguno de los casos anteriores
                echo "Tipo no reconocido.";
                break;
        }


        //Tipo de libreria para saber como recorrer el JSON
        echo "LIB: ".$data['h5plibrary'];

        // // Configura el endpoint SPARQL
        // $endpoint1 = 'http://localhost:3030/OA'; // Cambia 'dataset' por el nombre de tu dataset
        
        // $sparql1 = new \EasyRdf\Sparql\Client($endpoint1);
    
        // //TODO que tipo es para crear en la ontologia ej Actividad
        // $insertQuery = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
        // INSERT DATA {
        //     oaca:Actividad{$oaid} a oaca:ActividadDeAprendizaje .
    
        //     oaca:Subactividad{$idSubAct}OA{$oaid} a oaca:Subactividad .
    
        //     oaca:Actividad{$oaid} oaca:actividadSeComponeDe oaca:Subactividad{$idSubAct}OA{$oaid}.
    
        // }";
    
        // $resultInsert = $sparql1->update($insertQuery);

        // echo $resultInsert;
        
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


        // Function to recursively find all "text" fields que REPRESENTA LAS OPCIONES
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



        //Hacer las consultas correspondientes ej Multiple choice
        // Check if the user chose to ignore validation
        if (!isset($data['ignorevalidation']) || !$data['ignorevalidation']) {
            
            // Buscar la cadena "H5P.MultiChoice"
            // $searchString = "H5P.MultiChoice";
            // $found = searchInArray($h5pparams, $searchString);

            // if ($found) {
            //     echo "The string '$searchString' was found in the JSON.";
            // } else {
            //     echo "The string '$searchString' was not found in the JSON.";
            // }

            $question = $h5pparams['params']['question'];
            $questionText = str_replace(array("\n", "\r"), '', strip_tags($question));
            if ($questionText === 'Pregunta6') {
                echo 'The question is Pregunta6';
                return [];
            } else {
                echo '<div id="error-message" style="color: red;">HERE</div>';
                echo 'The question is not Pregunta6';
                echo "IM ON THE VALIDATION";
                $errors['name'] = "FAKE ERROR";
            }

            // Initialize the array to store text fields
            // $textFields = [];
            // findTextFields($h5pparams, $textFields);

            // // Output the text fields
            // echo "\nNumber of 'text' fields found OPCIONES: " . count($textFields);

            // // Check if "Ninguna de las anteriores" or "Todas las anteriores" exists
            // $foundNinguna = false;
            // $foundTodas = false;

            // foreach ($textFields as $text) {
            //     if (strpos($text, "Ninguna de las anteriores") !== false) {
            //         $foundNinguna = true;
            //     }
            //     if (strpos($text, "Todas las anteriores") !== false) {
            //         $foundTodas = true;
            //     }
            // }

            // if ($foundNinguna) {
            //     echo "'Ninguna de las anteriores' was found.\n";
            // }

            // if ($foundTodas) {
            //     echo "'Todas las anteriores' was found.\n";
            // }

        }
        

        return $errors;
        
    }
}

class myform extends moodleform {
    

    /**
     * The form definition.
     */
    public function definition() {
        global $DB, $OUTPUT, $USER;
        // A reference to the form is stored in $this->form.
        // A common convention is to store it in a variable, such as `$mform`.
        $mform = $this->_form; // Don't forget the underscore!

    
        // Add elements to your form.
        $mform->addElement('text', 'email', get_string('email'));

        // Set type of element.
        $mform->setType('email', PARAM_NOTAGS);

        // Default value.
        $mform->setDefault('email', 'Please enter email');

        $mform->addElement('select', 'unidadSelect', 'Unidad', array(), null);


        // $mform->addElement('checkbox', 'ratingtime',  'RA' ,'DERECHA');

        // $mform->addElement('advcheckbox', 'ratingtime1', get_string('ratingtime1', 'forum'), 'Label displayed after checkbox', array('group' => 1), array(0, 1));


    }

    // Custom validation should be added here.
    function validation($data, $files) {
        return [];
    }

}



//h5p config
require_login(null, false);

$contentid = optional_param('id', null, PARAM_INT);
$library = optional_param('library', null, PARAM_TEXT);
$contextid = optional_param('contextid', null, PARAM_INT);
$topic = optional_param('topic', null, PARAM_TEXT);
$oaid = optional_param('oaid', null, PARAM_INT);
$tipo = optional_param('tipo', null, PARAM_TEXT);

$context = context_system::instance();
$fs = new file_storage();

require_capability('moodle/h5p:updatelibraries', $context);

// $pagetitle = 'H5P Editor manual testing';
// $url = new \moodle_url("/h5p/index.php");
// Get the current URL with all parameters
// $current_url = new moodle_url('/local/yourplugin/' . basename($_SERVER['REQUEST_URI']));
$current_url=  basename($_SERVER['REQUEST_URI']);
echo basename($_SERVER['REQUEST_URI']);


$PAGE->set_context($context);
// $PAGE->set_url($url);
// $PAGE->set_title($pagetitle);
// $PAGE->set_heading($pagetitle);

// Verificar si los datos fueron enviados
if (isset($_POST['dataArray'])) {
    // Decodificar el array JSON enviado desde JavaScript
    $dataArray = json_decode($_POST['dataArray'], true);

    // Mostrar el contenido del array
    echo "<pre>";
    print_r($dataArray);
    echo "</pre>";
}

if (empty($contentid)) {
    $contentid = null;
}

$values = [
    'id' => $contentid,
    'library' => $library,
    'contextid' => $contextid,
    'topic' => $topic,
    'oaid' => $oaid,
    'tipo' => $tipo,
];

// Instantiate the myform form from within the plugin.
$mform = new test_editor_form($current_url, $values);

// Form processing and displaying is done here.
if ($mform->is_cancelled()) {
    // If there is a cancel element on the form, and it was pressed,
    // then the `is_cancelled()` function will return true.
    // You can handle the cancel operation here.
    $contentid = null;
    $library = null;
} else if ($data = $mform->get_data()) {

    if (isset($data->deletebutton)) {
        // Handle delete button submission here
        // TODO For example: delete the relevant record, or perform any deletion action. 
        echo "Delete button pressed";
        redirect($current_url, 'Item deleted successfully', 2);
    } else {

        // Decode the JSON string inside h5pparams into an associative array
        $h5pparams = json_decode($data->h5pparams, true);
        //TODO verificar si ya tiene el nombre del topico o no porque al editarlo intenta agregarlo nuevamente LISTO abajo
        // Update the value of the "extraTitle" field
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

        // Encode the modified h5pparams array back into JSON format
        $data->h5pparams = json_encode($h5pparams);

        // When the form is submitted, and the data is successfully validated,
        // the `get_data()` function will return the data posted in the form.
        $mform->save_h5p($data);
        $contentid = null;
        $library = null;
    }
}
else{
    echo "I AM ON THE LAST ELSE";
}

echo $OUTPUT->header();

//Create table
$table = new html_table();
$table->width = '70%';

// $table->head = array("firstname","count");
$table->align = array( 'left','centre');
$table->size = array( '55%','15%');

// Sample data array of objects
// $result = [
//             (object) ['firstname' => 'John', 'lastname' => 'Doe', 'count' => 3],
//             (object) ['firstname' => 'Jane', 'lastname' => 'Smith', 'count' => 5]
// ];

// foreach($result as $rec) {

//     $table->data[] = new html_table_row(array( implode(array($rec->firstname," ",$rec->lastname)), $rec->count));

// }

echo html_writer::start_div();
echo html_writer::table($table);
echo html_writer::end_div();

// $mform1 = new myform(null, $values);
// // Form processing and displaying is done here.
// if ($mform1->is_cancelled()) {
//     // If there is a cancel element on the form, and it was pressed,
//     // then the `is_cancelled()` function will return true.
//     // You can handle the cancel operation here.
// } else if ($fromform = $mform1->get_data()) {
//     // When the form is submitted, and the data is successfully validated,
//     // the `get_data()` function will return the data posted in the form.
// } else {
//     // This branch is executed if the form is submitted but the data doesn't
//     // validate and the form should be redisplayed or on the first display of the form.

//     // Set anydefault data (if any).
//     $mform1->set_data($toform);

//     // Display the form.
//     $mform1->display();
// }

function checkTitleEndsWith($title, $searchString) {
    // Get the length of the search string
    $searchStringLength = strlen($searchString);
    // Get the ending part of the title that is the same length as the search string
    $ending = substr($title, -$searchStringLength);
    // Compare the ending with the search string
    return $ending === $searchString;
}

if ($contentid === null && empty($library)) {
    // Create a form.
    echo html_writer::start_tag('form', array('method' => 'post', 'action' => ''));
    echo html_writer::start_div();

    $h5pcontents = $DB->get_records('h5p', null, 'id', 'id, pathnamehash, jsoncontent');

    foreach ($h5pcontents as $h5pcontent) {
        $file = $fs->get_file_by_hash($h5pcontent->pathnamehash);
        
        if ($file) {
            
            $filecontextid = $file->get_contextid();
            $options[] = [];
            if($filecontextid == $contextid){//Filtar solo los correspondientes a este curso, mas abajo filtro por OA
                list($filecontext, $course, $cm) = get_context_info_array($filecontextid);
                $coursename = $course->fullname ?? $SITE->fullname;
                // $modulename = ($course) ? ' - Module: ' . ($cm->name ?? 'ERROR: No module') : '';
                $params = json_decode($h5pcontent->jsoncontent);
                $h5pcontenttitle = ' - ' . ($params->metadata->title ?? 'ERROR: No title');
                //Filtramos solo los h5p correspondientes a este OA 
                // TODO filtrar los que corresponden a los topicos seleccionados
                if(checkTitleEndsWith($h5pcontenttitle, "-ID".$oaid)){
                    $options[$h5pcontent->id] = $coursename .  $h5pcontenttitle;

                }
                
                // if($h5pcontent->id==33){    
                    // Send the file to the user for download
                    // Get the URL of the file

                    // $url = moodle_url::make_pluginfile_url(
                    //     $file->get_contextid(),
                    //     $file->get_component(),
                    //     $file->get_filearea(),
                    //     $file->get_itemid(),
                    //     $file->get_filepath(),
                    //     $file->get_filename(),
                    //     false                     // Do not force download of the file.
                    // );

                    // echo $url;
                    // echo $file->get_contextid().$file->get_component().$file->get_filearea().$file->get_itemid().$file->get_filepath().$file->get_filename();
                    // // Echo the HTML button with the file URL
                    // echo '<a href="' . $url . '" download>Download File</a>';

                // }
            }
        }
    }

    echo html_writer::label('Select a content to edit', 'id');
    echo html_writer::select($options, 'id');

    // Button to submit form.
    echo html_writer::start_div('', array('style' => 'margin-top: 20px'));
    echo html_writer::tag('button', 'Edit');
    echo html_writer::end_div();

    $options2 = [];
    autoloader::register();
    $editor_ajax = new editor_ajax();
    $libraries = $editor_ajax->getLatestLibraryVersions();

    foreach ($libraries as $library) {
        $key = H5PCore::libraryToString(['name'=>$library->machine_name, 'majorVersion' => $library->major_version,
            'minorVersion' => $library->minor_version]);
        $options2[$key] = $library->title;
    }

    $topics = [];
    $tipos = array(
        'contenido' => 'Contenido',
        'ejemplo' => 'Ejemplo',
        'actividad' => 'Actividad',
        'evaluacion' => 'Evaluacion'
    );
    echo html_writer::label('Select a content to create for specific topic', 'library');
    echo html_writer::select($topics, 'topic');
    echo html_writer::select($tipos, 'tipo');
    echo html_writer::select($options2, 'library');

    // Button to submit form.
    echo html_writer::start_div('', array('style' => 'margin-top: 20px'));
    echo html_writer::tag('button', 'Create1');
    echo html_writer::end_div();

    // Close form.
    echo html_writer::end_div();
    echo html_writer::end_tag('form');
} else {
    $mform->display();
}



// echo $instanciasOAJSON;
// $PAGE->requires->js_call_amd('local_yourplugin/main', 'init', array($instanciasOAJSON));

echo $OUTPUT->footer();
