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

        $this->add_action_buttons();
    }

    public function save_h5p(stdClass $data) {
        $this->editor->save_content($data);
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


if (empty($contentid)) {
    $contentid = null;
}

$values = [
    'id' => $contentid,
    'library' => $library,
    'contextid' => $contextid,
    'topic' => $topic,
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

    // Decode the JSON string inside h5pparams into an associative array
    $h5pparams = json_decode($data->h5pparams, true);
    //TODO verificar si ya tiene el nombre del topico o no porque al editarlo intenta agregarlo nuevamente
    // Update the value of the "extraTitle" field
    $h5pparams['metadata']['extraTitle'] = $data->topic."-" . $h5pparams['metadata']['extraTitle'];
    $h5pparams['metadata']['title'] = $data->topic ."-" .$h5pparams['metadata']['title'] ;

    // Encode the modified h5pparams array back into JSON format
    $data->h5pparams = json_encode($h5pparams);

    // When the form is submitted, and the data is successfully validated,
    // the `get_data()` function will return the data posted in the form.
    $mform->save_h5p($data);
    $contentid = null;
    $library = null;
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
            if($filecontextid == $contextid){//TODO Filtar solo los correspondientes a este curso, TODO podria filtrar tambien correspondientes solo a este OA?
                list($filecontext, $course, $cm) = get_context_info_array($filecontextid);
                $coursename = $course->fullname ?? $SITE->fullname;
                // $modulename = ($course) ? ' - Module: ' . ($cm->name ?? 'ERROR: No module') : '';
                $params = json_decode($h5pcontent->jsoncontent);
                $h5pcontenttitle = ' - ' . ($params->metadata->title ?? 'ERROR: No title');
                $options[$h5pcontent->id] = $coursename .  $h5pcontenttitle;
                if($h5pcontent->id==33){    
                    // Send the file to the user for download
                    // Get the URL of the file

                    $url = moodle_url::make_pluginfile_url(
                        $file->get_contextid(),
                        $file->get_component(),
                        $file->get_filearea(),
                        $file->get_itemid(),
                        $file->get_filepath(),
                        $file->get_filename(),
                        false                     // Do not force download of the file.
                    );

                    // echo $url;
                    // echo $file->get_contextid().$file->get_component().$file->get_filearea().$file->get_itemid().$file->get_filepath().$file->get_filename();
                    // // Echo the HTML button with the file URL
                    // echo '<a href="' . $url . '" download>Download File</a>';

                }
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
    echo html_writer::label('Select a content to create for specific topic', 'library');
    echo html_writer::select($topics, 'topic');
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


// Cargar el archivo OWL
$graph =  new \EasyRdf\Graph();
// $graph->load();
$graph->parseFile(__DIR__ . '/OntoOA-3.owl');

// Configura el endpoint SPARQL
$endpoint = 'http://localhost:3030/OA/sparql'; // Reemplaza 'dataset' con el nombre de tu dataset

// Define la consulta SPARQL
$sparql = new \EasyRdf\Sparql\Client($endpoint);

$query = '
PREFIX ex: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
SELECT ?topico WHERE {
    ?asignatura a ex:Asignatura .
    ?asignatura ex:asignaturaTieneContenidoMinimo ?contenidoMinimo .
    ?contenidoMinimo ex:contenidoMinimoSeOrganizaEnUnidad ?unidad .
    ?unidad ex:unidadCompuestaDeTema ?tema .
    ?tema ex:temaContieneTopico ?topico .
  }';

$result = $sparql->query($query);

// Procesar los resultados
foreach ($result as $row) {
    // echo "Topico SPARQL: " . $row->topico . "\n";
}

$query1 = '
PREFIX ex: <http://www.semanticweb.org/valer/ontologies/OntoOA#>

SELECT ?value ?nivelRAAsignatura ?nivelOtroVerbo
WHERE {
<http://www.semanticweb.org/valer/ontologies/OntoOA#MADRACurricular1> ex:raTieneVerbo ?value .
?value ex:verboPerteneceANivel ?nivelRAAsignatura .

{
    SELECT ?otroVerbo ?nivelOtroVerbo
    WHERE {
    <http://www.semanticweb.org/valer/ontologies/OntoOA#Aplica> ex:verboPerteneceANivel ?nivelOtroVerbo .
    }
    ORDER BY ASC(?nivelOtroVerbo)
    LIMIT 1
}
}';

$result1 = $sparql->query($query1);
print_r($result1);

// Procesar los resultados
foreach ($result1 as $row) {
    // echo "SPARQL: " . $row->nivelRAAsignatura . "\n";
}

// Encuentra la asignatura 'MAD'
// Configura los prefijos necesarios
\EasyRdf\RdfNamespace::set('ex', 'http://www.semanticweb.org/valer/ontologies/OntoOA#'); // Ajusta el prefijo según tu OWL

$asignaturaUri = null;
foreach ($graph->allOfType('ex:Asignatura') as $asignatura) {
        // Obtener el URI y etiqueta de la instancia
        $uri = $asignatura->getUri();

        // Extraer la etiqueta de la URI (texto después del carácter #)
        $etiqueta = substr($uri, strrpos($uri, '#') + 1);
        // echo "etiqueta: " . $etiqueta . "\n";

    if ($etiqueta == 'MatematicaDiscreta') {//TODO esto deberia venir como parametro
        $asignaturaUri = $uri;
        break;
    }
}

$instanciasOA = array();

if ($asignaturaUri) {
    $asignatura = $graph->resource($asignaturaUri);

    // Agregar asignatura al array
    $instanciasOA['asignatura'] = $asignatura->getUri();

    // Obtener RAs de la asignatura
    $RAsAsignatura = $asignatura->allResources('ex:asignaturaTieneRAAsignatura');
    $instanciasOA['RAsAsignatura'] = array();
    
    foreach ($RAsAsignatura as $RAAsignatura) {
        $instanciasOA['RAsAsignatura'][] = $RAAsignatura->getUri();
    }

    // Obtener contenidos mínimos de la asignatura
    $contenidosMinimo = $asignatura->allResources('ex:asignaturaTieneContenidoMinimo');
    $instanciasOA['contenidosMinimo'] = array();

    foreach ($contenidosMinimo as $contenidoMinimo) {
        $contenidoMinimoArray = array();
        $contenidoMinimoArray['uri'] = $contenidoMinimo->getUri();
        
        // Obtener unidades del contenido mínimo
        $unidades = $contenidoMinimo->allResources('ex:contenidoMinimoSeOrganizaEnUnidad');
        $contenidoMinimoArray['unidades'] = array();

        foreach ($unidades as $unidad) {
            $unidadArray = array();
            $unidadArray['uri'] = $unidad->getUri();

            // Obtener temas de la unidad
            $temas = $unidad->allResources('ex:unidadCompuestaDeTema');
            $unidadArray['temas'] = array();
            
            foreach ($temas as $tema) {
                $temaArray = array();
                $temaArray['uri'] = $tema->getUri();

                // Obtener tópicos del tema
                $topicos = $tema->allResources('ex:temaContieneTopico');
                $temaArray['topicos'] = array();

                foreach ($topicos as $topico) {
                    $topicoArray = array();
                    $topicoArray['uri'] = $topico->getUri();

                    // Obtener tipos del tópico
                    $tipos = $topico->allResources('ex:topicoTieneTipo');
                    $topicoArray['tipos'] = array();
                    
                    foreach ($tipos as $tipo) {
                        $topicoArray['tipos'][] = $tipo->getUri();
                    }

                    // Obtener partes del tópico
                    $partes = $topico->allResources('ex:topicoTieneParte');
                    $topicoArray['partes'] = array();
                    
                    foreach ($partes as $parte) {
                        $topicoArray['partes'][] = $parte->getUri();
                    }

                    // Obtener soportes del tópico
                    $soportes = $topico->allResources('ex:topicoTieneSoporte');
                    $topicoArray['soportes'] = array();
                    
                    foreach ($soportes as $soporte) {
                        $topicoArray['soportes'][] = $soporte->getUri();
                    }

                    // Agregar el tópico al array de tópicos del tema
                    $temaArray['topicos'][] = $topicoArray;
                }

                // Agregar el tema al array de temas de la unidad
                $unidadArray['temas'][] = $temaArray;
            }

            // Agregar la unidad al array de unidades del contenido mínimo
            $contenidoMinimoArray['unidades'][] = $unidadArray;
        }

        // Agregar el contenido mínimo al array de contenidos mínimos de la asignatura
        $instanciasOA['contenidosMinimo'][] = $contenidoMinimoArray;
    }


// Convertir la matriz a formato JSON
$instanciasOAJSON = json_encode($instanciasOA);
    
} else {
    echo "Asignatura 'MAD' no encontrada.\n";
}

$PAGE->requires->js_call_amd('local_yourplugin/main', 'init', array($instanciasOAJSON));

echo $OUTPUT->footer();

// Get the toolbar ready. CONTENT BANK

// $cb = new \core_contentbank\contentbank();
// $context = context::instance_by_id(14, MUST_EXIST);
// $toolbar = array ();

// // Get all contents managed by active plugins where the user has permission to render them.
// $contenttypes = [];
// $enabledcontenttypes = $cb->get_enabled_content_types();
// foreach ($enabledcontenttypes as $contenttypename) {
//     $contenttypeclass = "\\contenttype_$contenttypename\\contenttype";
//     $contenttype = new $contenttypeclass($context);
//     if ($contenttype->can_access()) {
//         $contenttypes[] = $contenttypename;
//     }
// }

// $foldercontents = $cb->search_contents($search, 14, $contenttypes);

// // Place the Add button in the toolbar.
// if (has_capability('moodle/contentbank:useeditor', $context)) {
//     // Get the content types for which the user can use an editor.
//     $editabletypes = $cb->get_contenttypes_with_capability_feature(\core_contentbank\contenttype::CAN_EDIT, $context);
//     if (!empty($editabletypes)) {
//         // Editor base URL.
//         $editbaseurl = new moodle_url('/contentbank/edit.php', ['contextid' => $contextid]);
//         $toolbar[] = [
//             'name' => get_string('add'),
//             'link' => $editbaseurl, 'dropdown' => true,
//             'contenttypes' => $editabletypes,
//             'action' => 'add'
//         ];
//     }
// }

// // Render the contentbank contents.
// $folder = new \core_contentbank\output\bankcontent($foldercontents, $toolbar, $context, $cb);
// // var_dump($folder);
// echo $OUTPUT->render($folder);
// echo $OUTPUT->$toolbar;



