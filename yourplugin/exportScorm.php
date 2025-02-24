<?php

require(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/formslib.php');
require_once("$CFG->libdir/filestorage/file_storage.php");
require_once($CFG->libdir.'/adminlib.php');

global $PAGE, $CFG, $OUTPUT, $DB;

// Requiere que el usuario inicie sesión
require_login(null, false);

$contentid = optional_param('id', null, PARAM_INT);

$context = context_system::instance();
$fs = new file_storage();

require_capability('moodle/h5p:updatelibraries', $context);

// Obtener URL
$current_url=  basename($_SERVER['REQUEST_URI']);

$PAGE->set_context($context);

if (empty($contentid)) {
    $contentid = null;
}

// Obtener la fecha y la hora actual como string
$date_time = date('Ymd_His'); // Example format: 20230610_141501

// Funcion para verificar como termina el titulo del recurso H5P
function checkTitleEndsWith($title, $searchString) {
    // Get the length of the search string
    $searchStringLength = strlen($searchString);
    // Get the ending part of the title that is the same length as the search string
    $ending = substr($title, -$searchStringLength);
    // Compare the ending with the search string
    return $ending === $searchString;
}

// Función para crear el imsmanifest.xml de cada subcarpeta
function createManifestFile($fileFolder, $indexFile, $name) {
    $manifestContent = <<<XML
        <?xml version="1.0" encoding="utf-8" standalone="no"?>
        <manifest identifier="$name" version="1" 
            xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" 
            xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
            <metadata>
                <schema>ADL SCORM</schema>
                <schemaversion>1.2</schemaversion>
                <adlcp:location>metadata.xml</adlcp:location>
            </metadata>
            <organizations default="editor.exportDialog.defaults.authorName">
                <organization identifier="editor.exportDialog.defaults.authorName">
                    <title>$name</title>
                    <item identifier="item_$name" identifierref="resource_$name">
                        <title>$name</title>
                        <adlcp:masteryscore>0</adlcp:masteryscore>
                        <metadata>
                            <schema>ADL SCORM</schema>
                            <schemaversion>1.2</schemaversion>
                            <adlcp:location>metadata.xml</adlcp:location>
                        </metadata>
                    </item>
                    <metadata>
                        <schema>ADL SCORM</schema>
                        <schemaversion>1.2</schemaversion>
                        <adlcp:location>metadata.xml</adlcp:location>
                    </metadata>
                </organization>
            </organizations>
            <resources>
                <metadata>
                    <schema>ADL SCORM</schema>
                    <schemaversion>1.2</schemaversion>
                    <adlcp:location>metadata.xml</adlcp:location>
                </metadata>
                <resource identifier="resource_$name" type="webcontent" adlcp:scormtype="sco" href="$indexFile">
                    <metadata>
                        <schema>ADL SCORM</schema>
                        <schemaversion>1.2</schemaversion>
                        <adlcp:location>metadata.xml</adlcp:location>
                    </metadata>
                    <file href="SCORM_API_wrapper.js"/>
                    <file href="h5p-adaptor.js"/>
                    <file href="$indexFile"/>
                </resource>
            </resources>
        </manifest>
        XML;

    file_put_contents("$fileFolder/imsmanifest.xml", $manifestContent);
}

// Función para crear el imsmanifest.xml en la carpeta padre
function createParentManifest($parentFolder, $h5pFiles) {
    $manifestHeader = <<<XML
<?xml version="1.0" encoding="utf-8" standalone="no"?>
        <manifest identifier="parent_course" version="1.0"
            xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2" 
            xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
            <metadata>
                <schema>ADL SCORM</schema>
                <schemaversion>1.2</schemaversion>
                <adlcp:location>metadata.xml</adlcp:location>
            </metadata>
            <organizations default="organization_parent">
                <organization identifier="organization_parent">
                    <title>Parent Course</title>
XML;

    $manifestItems = "";
    $manifestResources = "";

    foreach ($h5pFiles as $file) {
        if ($file != '.' && $file != '..') {
            $name = $file;
            $manifestItems .= <<<XML
                <item identifier="item_$name" identifierref="resource_$name">
                    <title>$name</title>
                </item>
    XML;

            $manifestResources .= <<<XML
            <resource identifier="resource_$name" type="webcontent" adlcp:scormtype="sco" href="$name/index.html">
                <file href="$name/index.html"/>
            </resource>
    XML;
        }
    }

    $manifestFooter = <<<XML
        </organization>
    </organizations>
    <resources>
$manifestResources
    </resources>
</manifest>
XML;

    $fullManifest = $manifestHeader . $manifestItems . $manifestFooter;

    file_put_contents("$parentFolder/imsmanifest.xml", $fullManifest);

    global $CFG;
    //SCORM FILES
    $adlcp_rootv1p2Path = $CFG->dataroot ."/adlcp_rootv1p2.xsd";
    $ims_xmlPath = $CFG->dataroot ."/ims_xml.xsd";
    $imscp_rootv1p1p2Path = $CFG->dataroot ."/imscp_rootv1p1p2.xsd";
    $imsmd_rootv1p2p1Path = $CFG->dataroot ."/imsmd_rootv1p2p1.xsd";
    $SCORM_API_wrapperPath = $CFG->dataroot ."/SCORM_API_wrapper.js";
    $h5padaptorPath = $CFG->dataroot ."/h5p-adaptor.js";
    
    copy($adlcp_rootv1p2Path,  $parentFolder.'/'.basename($adlcp_rootv1p2Path));
    copy($ims_xmlPath, $parentFolder.'/'.basename($ims_xmlPath));
    copy($imscp_rootv1p1p2Path, $parentFolder.'/'.basename($imscp_rootv1p1p2Path));
    copy($imsmd_rootv1p2p1Path, $parentFolder.'/'.basename($imsmd_rootv1p2p1Path));
    copy($SCORM_API_wrapperPath, $parentFolder.'/'.basename($SCORM_API_wrapperPath));
    copy($h5padaptorPath, $parentFolder.'/'.basename($h5padaptorPath));
}


// Funcion para eliminar carpeta y su contenido recusivamente
function deleteFolder($folderName) {
    if (!is_dir($folderName)) {
        return;
    }

    // Abrir directorio
    $files = array_diff(scandir($folderName), ['.', '..']);
    foreach ($files as $file) {
        $filePath = $folderName . DIRECTORY_SEPARATOR . $file;

        // Si es directorio llamar a deleteFolder recursively
        if (is_dir($filePath)) {
            deleteFolder($filePath);
        } else {
            // sino solo eliminar el archivo
            unlink($filePath);
        }
    }

    // Finalmente, elmiminar la carpeta vacia
    rmdir($folderName);
}

// Funcion para crear una carpeta, eliminandola si ya existia
function createFolder($folderName) {
    // Ver si existe la carpeta
    if (file_exists($folderName)) {
        // Eliminar carpeta y su contenido 
        deleteFolder($folderName);
    }

    // Crear carpeta con permisos 0777
    if (mkdir($folderName, 0777, true)) {
        // echo "Carpeta '$folderName' creada exitosamente.\n";
    } else {
        echo "Error al crear la carpeta '$folderName'.\n";
    }
}

// Funcion para agregar carpeta al ZIP
function zipFolder($zip,$folderPath) {
    
        // Agregar la carpeta al ZIP
        $folderPath = realpath($folderPath);

        if (is_dir($folderPath)) {
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($folderPath),
                RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($files as $name => $file) {
                // Ignorar los directorios
                if (!$file->isDir()) {
                    // Obtener la ruta relativa para agregar al archivo ZIP
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($folderPath) + 1);

                    // Agregar el archivo al ZIP
                    $zip->addFile($filePath, $relativePath);
                }
            }
        }
    
}

// Funcion para modificar el Src en el html
function modifyImgSrc($htmlFilePath) {

    // Leer el contenido del archivo HTML como una cadena
    $htmlString = file_get_contents($htmlFilePath);

    // Modifica el script h5p.js en el archivo HTML para que la ruta de los archivos sea solo la relativa
    // Reemplazar con una cadena vacía
    $replace = '"")';

    // Expresión regular para hacer coincidir el patrón (permitiendo variaciones como espacios).
    $pattern = '/window\.location\.protocol\s*\+\s*["\']\/\/["\']\s*\+\s*window\.location\.host\s*\+\s*n\s*\)\s*\+\s*["\']\/["\']/';

    // Realiza el reemplazo.
    $modifiedHtmlString = preg_replace($pattern, $replace, $htmlString);

    // Define el patrón de expresión regular para encontrar todas las paths
    $patternImages = '/\d+\/(images|videos)\/[^"]+/';

    // Usar preg_replace_callback para modificar todas las paths dynamically
    $updatedHtml = preg_replace_callback($patternImages, function ($matches) {
        $pathWithNumber = $matches[0];
        $pathWithoutNumber = preg_replace('/^\d+\//', '', $pathWithNumber);
        
        // Retornar path actualizada
        return  $pathWithoutNumber ;
    }, $modifiedHtmlString);

    file_put_contents($htmlFilePath, $updatedHtml);

}


// Funcion para agregar todos los archivos al ZIP
function add_files_to_zip($zip) {
    global $DB, $OUTPUT, $USER, $CFG;
    $date_time = date('Ymd_His');
    $fs = new file_storage();
    // Archivos H5P a incluir filtrando por OAID
    $oaid = optional_param('oaid', null, PARAM_INT);
    $h5pcontents = $DB->get_records('h5p', null, 'id', 'id, pathnamehash, jsoncontent');

    $oaFolderName =  $CFG->dataroot . '/OA'.$oaid;
    createFolder($oaFolderName);

    foreach ($h5pcontents as $h5pcontent) {
        $file = $fs->get_file_by_hash($h5pcontent->pathnamehash);
        
        if ($file) {
            
            $params = json_decode($h5pcontent->jsoncontent);
            $h5pcontenttitle = ' - ' . ($params->metadata->title ?? 'ERROR: No title');
            if(checkTitleEndsWith($h5pcontenttitle, "-ID".$oaid)){
              
                $fileName = $file->get_filename();
                $file_path_h5p = $file->get_filepath() . $fileName;
                $file_path_h5p_server = $CFG->dataroot . $file_path_h5p;
                file_put_contents($file_path_h5p_server, $file->get_content());


                $oaFileFolderName = $oaFolderName .'/'. str_replace(".h5p", "", $fileName);
                createFolder($oaFileFolderName);
                file_put_contents($oaFileFolderName .'/'. $fileName, $file->get_content());

                try {

                    // Directorio donde se va a extraer el contenido del archivo H5P
                    $extractPath = $CFG->dataroot . '/'. str_replace(".h5p", "", $fileName) ."/";

                    // Crea un objeto ZipArchive
                    $unzipNew = new ZipArchive();
                
                    if ($unzipNew->open($file_path_h5p_server) === TRUE) {
                        $unzipNew->extractTo($extractPath);
                        $unzipNew->close();

                        $url = "http://localhost:3000/api/sendParameter";
                        $data = array(
                            "parameter"=>$extractPath, 
                            "parameter2"=>$file_path_h5p_server
                        );

                        // Transformar a JSON
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

                        // Definir el path del archivo
                        $htmlFilePath = $oaFileFolderName.'/index.html';
                        // Guardar la respuesta html en el archivo
                        file_put_contents($htmlFilePath, $response);
                        // Cerrar cURL
                        curl_close($ch);

                        createManifestFile($oaFileFolderName, 'index.html', str_replace(".h5p", "", $fileName));

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
                        $filePath = $fileInsideFolder->getRealPath();
                        $relativePath = substr($filePath, strlen($contentImagesFolder)-1);

                        if ($fileInsideFolder->isDir()) {
                            if (mkdir($oaFileFolderName.'/'.$relativePath, 0777, true)) {
                                // echo "Carpeta '$oaFileFolderName.'/'.$relativePath' creada exitosamente.\n";
                            } else {
                                echo "Error al crear la carpeta '$oaFileFolderName.'/'.$relativePath'.\n";
                            }
                        }else{
                            copy($filePath, $oaFileFolderName.'/'.$relativePath);
                        }
                    }

                }

                // Modifica el archivo HTML para que la ruta de los archivos sea solo la relativa.
                $htmlFile = $oaFileFolderName.'/index.html';  // Ruta del archivo HTML
                modifyImgSrc($htmlFile);


                //SCORM FILES
                $adlcp_rootv1p2Path = $CFG->dataroot ."/adlcp_rootv1p2.xsd";
                $ims_xmlPath = $CFG->dataroot ."/ims_xml.xsd";
                $imscp_rootv1p1p2Path = $CFG->dataroot ."/imscp_rootv1p1p2.xsd";
                $imsmd_rootv1p2p1Path = $CFG->dataroot ."/imsmd_rootv1p2p1.xsd";
                $SCORM_API_wrapperPath = $CFG->dataroot ."/SCORM_API_wrapper.js";
                $h5padaptorPath = $CFG->dataroot ."/h5p-adaptor.js";

                copy($adlcp_rootv1p2Path,  $oaFileFolderName.'/'.basename($adlcp_rootv1p2Path));
                copy($ims_xmlPath, $oaFileFolderName.'/'.basename($ims_xmlPath));
                copy($imscp_rootv1p1p2Path, $oaFileFolderName.'/'.basename($imscp_rootv1p1p2Path));
                copy($imsmd_rootv1p2p1Path, $oaFileFolderName.'/'.basename($imsmd_rootv1p2p1Path));
                copy($SCORM_API_wrapperPath, $oaFileFolderName.'/'.basename($SCORM_API_wrapperPath));
                copy($h5padaptorPath, $oaFileFolderName.'/'.basename($h5padaptorPath));
               
            }
            
        }
        
    }

    $fs = get_file_storage();

    // Configuraciones de moodle
    $fileinfo = [
        'contextid' => 14,   // ID of the context.
        'component' => 'contentbank', // Your component name.
        'filearea'  => 'public',       // Usually = table name.
        'itemid'    => 0,              // Usually = ID of row in table.
        'filepath'  => '/',            // Any path beginning and ending in /.
        'filename'  => 'metadatos' . $date_time . '.txt',   // Any filename.
    ];

    $fileMetadatos = $fs->create_file_from_string($fileinfo, 'Metadatos');
    $file_pathMetadatos = $fileMetadatos->get_filepath() . $fileMetadatos->get_filename();
    $zip->addFromString(basename($file_pathMetadatos), $fileMetadatos->get_content());
}

// Crear un nuevo archivo ZIP
// Nombre del archivo ZIP
$oaid = optional_param('oaid', null, PARAM_INT);
$zip_filename = 'OAID'.$oaid.'.zip';
$zip_filepath = $CFG->dataroot . '/' . $zip_filename;

// Verificar si el archivo ZIP ya existe
if (file_exists($zip_filepath)) {
    // Eliminar el archivo ZIP existente
    if (unlink($zip_filepath)) {
        // echo "Archivo ZIP existente eliminado exitosamente.\n";
    } else {
        die("Error al eliminar el archivo ZIP existente.\n");
    }
}

// Crear un nuevo archivo ZIP y guardarlo en el servidor
$zip = new ZipArchive();
if ($zip->open($zip_filepath, ZipArchive::CREATE) !== TRUE) {
    die("No se puede abrir el archivo ZIP.");
}

// Llamar a la función para agregar archivos al ZIP
add_files_to_zip($zip); 

$oaFolderName =  $CFG->dataroot . '/OA'.$oaid;
createParentManifest($oaFolderName, scandir($oaFolderName));

zipFolder($zip,$oaFolderName);

// Cerrar el archivo ZIP
$zip->close();

// Enviar el archivo ZIP al navegador para su descarga
if (file_exists($zip_filepath)) {
    // Almacenar el archivo ZIP en el área de archivos de Moodle
    $contextid = 14;
    $component = 'contentbank'; 
    $filearea = 'public'; 
    $itemid = 0;
    $filepath = '/';
    

    // Use this string to create a unique filename
    $filename = 'OAID_'.$oaid.'_' . $date_time . '.zip';

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

     // Mensaje de éxito
     $message = '<a href="' . $url . '" download>Exportar OA</a>';
     $processing = false; // El proceso ha terminado

    
} else {
    die("Archivo ZIP no encontrado.");
}

echo $OUTPUT->header();

echo $OUTPUT->footer();
