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

global $PAGE, $CFG, $OUTPUT, $DB;



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


echo $OUTPUT->header();

// Imprimir el título <h3>
echo "<h3>Cargar Metadatos</h3>";
// Get the current date and time as a string
$date_time = date('Ymd_His'); // Example format: 20230610_141501

function add_files_to_zip($zip) {
    global $DB, $OUTPUT, $USER, $CFG;
    $date_time = date('Ymd_His');
    $fs = new file_storage();
    // Archivos H5P a incluir

    $h5pcontents = $DB->get_records('h5p', null, 'id', 'id, pathnamehash, jsoncontent');

    foreach ($h5pcontents as $h5pcontent) {
        $file = $fs->get_file_by_hash($h5pcontent->pathnamehash);
        
        if ($file) {

            if($h5pcontent->id==52){ 
                $fileName = $file->get_filename();
                $file_path_h5p = $file->get_filepath() . $fileName;
                $file_path_h5p_server = $CFG->dataroot . $file_path_h5p;
                file_put_contents($file_path_h5p_server, $file->get_content());
                try {

                    // Get the content of the stored_file object
                    // $h5p_content = $file->get_content();

                    // Create a temporary file for the H5P content
                    // $tempFile = tempnam(sys_get_temp_dir(), 'h5p');
                    // file_put_contents($tempFile, $h5p_content);

                    // Directorio donde se va a extraer el contenido del archivo H5P
                    $extractPath = $CFG->dataroot . '/'. str_replace(".h5p", "", $fileName) ."/";

                    // Crea un objeto ZipArchive
                    $unzipNew = new ZipArchive();
                
                    // Open the ZIP file from the temporary file
                    if ($unzipNew->open($file_path_h5p_server) === TRUE) {
                        // Extract contents to output directory
                        $unzipNew->extractTo($extractPath);
                        $unzipNew->close();

                        echo "Successfully extracted contents to $extractPath";

                        $url = "http://localhost:3000/api/sendParameter";
                        $data = array(
                            "parameter"=>$extractPath, //"C:/Users/piluc/Downloads/multiple-choice-713",//TODO path to unzip created new for h5p
                            "parameter2"=>$file_path_h5p_server//"C:/Users/piluc/Downloads/arithmetic-quiz-22-57860.h5p"
                        );

                        // Encode the data array into a JSON string
                        $jsonData = json_encode($data);

                        // Iniciar cURL
                        $ch = curl_init();

                        // Establecer la URL y otras opciones
                        curl_setopt($ch, CURLOPT_URL, $url);
                        curl_setopt($ch, CURLOPT_POST, true);
                        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                            'Content-Type: application/json',
                            'Content-Length: ' . strlen($jsonData)
                        ));

                        // Ejecutar la solicitud y obtener la respuesta
                        $response = curl_exec($ch);

                        // Verificar si hubo algún error
                        if(curl_errno($ch)) {
                            echo 'Error:' . curl_error($ch);
                        } 

                        // Define the file paths
                        $htmlFilePath = $CFG->dataroot .'/index.html';

                        // Save the HTML response to the file
                        file_put_contents($htmlFilePath, $response);


                        // Cerrar cURL
                        curl_close($ch);
                    } else {
                        echo "Failed to extract contents.";
                    }
                } catch (Exception $e) {
                    echo 'Error al extraer archivos: ',  $e->getMessage();
                }   
                $contentImagesFolder = $extractPath . "/content/";
                if (file_exists($contentImagesFolder)) {

                    $files = new RecursiveIteratorIterator(
                        new RecursiveDirectoryIterator($contentImagesFolder, RecursiveDirectoryIterator::SKIP_DOTS),
                        RecursiveIteratorIterator::SELF_FIRST
                    );
                
                    foreach ($files as $name => $fileInsideFolder) {
                        // Get the real and relative path for current file
                        $filePath = $fileInsideFolder->getRealPath();
                        $relativePath = substr($filePath, strlen($contentImagesFolder)-1);
                        echo $filePath;
                        echo $relativePath;

                        // Skip directories (they are added automatically)
                        if ($fileInsideFolder->isDir()) {
                            // Add directory to the archive
                            $zip->addEmptyDir($relativePath);
                            
                        }else{
                            // Add current file to the archive
                            $zip->addFile($filePath, $relativePath);
                        }
                    }

                }


                $zip->addFromString(basename($file_path_h5p), $file->get_content());
                // Add the HTML file to the ZIP archive
                $zip->addFile($htmlFilePath, basename($htmlFilePath));

                //SCORM FILES
                $adlcp_rootv1p2Path = $CFG->dataroot ."/adlcp_rootv1p2.xsd";
                $ims_xmlPath = $CFG->dataroot ."/ims_xml.xsd";
                $imscp_rootv1p1p2Path = $CFG->dataroot ."/imscp_rootv1p1p2.xsd";
                $imsmd_rootv1p2p1Path = $CFG->dataroot ."/imsmd_rootv1p2p1.xsd";
                $SCORM_API_wrapperPath = $CFG->dataroot ."/SCORM_API_wrapper.js";
                $h5padaptorPath = $CFG->dataroot ."/h5p-adaptor.js";
                $metadataXMLPath = $CFG->dataroot ."/metadata.xml";//TODO generar automaticamente
                $manifestPath = $CFG->dataroot ."/imsmanifest.xml";//TODO generar automaticamente
                
                
                $zip->addFile($adlcp_rootv1p2Path, basename($adlcp_rootv1p2Path));
                $zip->addFile($ims_xmlPath, basename($ims_xmlPath));
                $zip->addFile($imscp_rootv1p1p2Path, basename($imscp_rootv1p1p2Path));
                $zip->addFile($imsmd_rootv1p2p1Path, basename($imsmd_rootv1p2p1Path));
                $zip->addFile($SCORM_API_wrapperPath, basename($SCORM_API_wrapperPath));
                $zip->addFile($h5padaptorPath, basename($h5padaptorPath));
                $zip->addFile($metadataXMLPath, basename($metadataXMLPath));
                $zip->addFile($manifestPath, basename($manifestPath));
            }
        }
    }

    // Agregar el archivo .txt al ZIP
    // if (file_exists($txt_file)) {
    //     $zip->addFile($txt_file, basename($txt_file));
    // }
    $fs = get_file_storage();

    $fileinfo = [
        'contextid' => 14,   // ID of the context.
        'component' => 'contentbank', // Your component name.
        'filearea'  => 'public',       // Usually = table name.
        'itemid'    => 0,              // Usually = ID of row in table.
        'filepath'  => '/',            // Any path beginning and ending in /.
        'filename'  => 'metadatos' . $date_time . '.txt',   // Any filename.
    ];

    // Create a new file containing the text 'hello world'.
    $fileMetadatos = $fs->create_file_from_string($fileinfo, 'Metadatos');
    $file_pathMetadatos = $fileMetadatos->get_filepath() . $fileMetadatos->get_filename();
    $zip->addFromString(basename($file_pathMetadatos), $fileMetadatos->get_content());
}

// Crear un nuevo archivo ZIP
// Nombre del archivo ZIP
$zip_filename = 'archivos2.zip';
$zip_filepath = $CFG->dataroot . '/' . $zip_filename;

// Crear un nuevo archivo ZIP y guardarlo en el servidor
$zip = new ZipArchive();
if ($zip->open($zip_filepath, ZipArchive::CREATE) !== TRUE) {
    die("No se puede abrir el archivo ZIP.");
}

// Llamar a la función para agregar archivos al ZIP
add_files_to_zip($zip);

// var_dump($zip);

// Cerrar el archivo ZIP
$zip->close();

// Enviar el archivo ZIP al navegador para su descarga
if (file_exists($zip_filepath)) {
    // Almacenar el archivo ZIP en el área de archivos de Moodle
    // Configura el contexto y el área de archivos según tu necesidad
    $contextid = 14;//context_system::instance()->id;
    $component = 'contentbank'; // Reemplaza con el componente correspondiente
    $filearea = 'public'; // Reemplaza con el área de archivo correspondiente
    $itemid = 0; // Ajusta según tu necesidad
    $filepath = '/';
    

    // Use this string to create a unique filename
    $filename = 'archivos_' . $date_time . '.zip';

    $filerecord = array(
        
        'contextid' => $contextid,
        'component' => $component,
        'filearea' => $filearea,
        'itemid' => $itemid,
        'filepath' => $filepath,
        'filename' => $filename,
        'timecreated' => time(),
        'timemodified' => time(),
        'mimetype' => 'application/zip',
        'userid' => $USER->id,
    );

    // Eliminar cualquier archivo existente con el mismo nombre
    // $fs->delete_area_files($contextid, $component, $filearea, $itemid);

    // Crear el archivo
    $file = $fs->create_file_from_pathname($filerecord, $zip_filepath);

    $url = moodle_url::make_pluginfile_url(
        $file->get_contextid(),
        $file->get_component(),
        $file->get_filearea(),
        $file->get_itemid(),
        $file->get_filepath(),
        $file->get_filename(),
        false                     // Do not force download of the file.
    );

    // Echo the HTML button with the file URL
    echo '<a href="' . $url . '" download>Exportar OA</a>';

    
} else {
    die("Archivo ZIP no encontrado.");
}


echo $OUTPUT->footer();
