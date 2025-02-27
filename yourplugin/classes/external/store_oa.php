<?php

namespace local_yourplugin\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_multiple_structure;
use core_external\external_value;
use core_external\external_warnings;
use context_module;

/**
 * This is the external method for getting access information for a h5p activity.
 *
 * @copyright  2020 Carlos Escobedo <carlos@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class store_oa extends external_api {
    /**
     * Parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters(
            [
                'courseid' => new external_value(PARAM_INT, 'id'),
                'name' => new external_value(
                    PARAM_TEXT,
                    'multilang compatible name, course unique'
                )
            ]
        );
    }


    public static function execute(int $courseid, string $name): array {
        global $CFG, $DB;
        require_once("$CFG->dirroot/group/lib.php");
        require(__DIR__ . '/../../lib/easyrdf/vendor/autoload.php');

        // $params = self::validate_parameters(self::execute_parameters(), ['groups' => $groups]);

        $transaction = $DB->start_delegated_transaction(); //If an exception is thrown in the below code, all DB queries in this code will be rollback.

        $record = new \stdClass();
        $record->name = $name;
        $record->course = $courseid;
        $new_record_id = $DB->insert_record('localyourpluginoa', $record);
        $record->id = $new_record_id;

        // now security checks
        // $context = get_context_instance(CONTEXT_COURSE, $group->courseid);
        // self::validate_context($context);
        // require_capability('moodle/course:managegroups', $context);

        $transaction->allow_commit();

        try {
            // Configura el endpoint SPARQL
            $endpoint1 = 'http://localhost:3030/OA'; // Cambia 'dataset' por el nombre de tu dataset
        
            $sparql1 = new \EasyRdf\Sparql\Client($endpoint1);
        
            $insertQuery = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
            INSERT DATA {
                oaca:OA{$new_record_id} a oaca:OA .
        
                oaca:RA{$new_record_id} a oaca:ResultadoAprendizajeOA .
                oaca:Evalucacion{$new_record_id} a oaca:Evaluacion .
                oaca:EstructuraDeMetadato{$new_record_id} a oaca:EstructuraDeMetadato .
                oaca:Contenido{$new_record_id} a oaca:ContenidoDeInstruccion .
                oaca:Actividad{$new_record_id} a oaca:ActividadDeAprendizaje .
        
                oaca:OA{$new_record_id} oaca:oaTieneComponente oaca:RA{$new_record_id}, oaca:Evalucacion{$new_record_id}, oaca:EstructuraDeMetadato{$new_record_id}, oaca:Contenido{$new_record_id}, oaca:Actividad{$new_record_id}.
        
            }";
        
            $resultInsert = $sparql1->update($insertQuery);
        
            // echo "RESULTS INSERT DATA " . $resultInsert;
            // echo "Data inserted successfully. Response code: " . $resultInsert->getStatus() . "\n";


            //OWLAPI integration
            $apiUrl = 'http://localhost:8080/ontology/startService?oaidParam=' . urlencode($new_record_id); // URL del endpoint con el parámetro oaid

            // Inicializa cURL
            $ch = curl_init();

            // Configura la URL y otras opciones
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para obtener el resultado en una variable en lugar de imprimirlo

            // Ejecuta la solicitud y guarda la respuesta
            $response = curl_exec($ch);

            // Verifica si ocurrió algún error
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            } else {

                $apiUrl = 'http://localhost:8080/ontology/razonar?ontologia=CONOCIMIENTO'; // URL del endpoint para razonar

                // Configura la URL y otras opciones
                curl_setopt($ch, CURLOPT_URL, $apiUrl);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Para obtener el resultado en una variable en lugar de imprimirlo

                // Ejecuta la solicitud y guarda la respuesta
                $response = curl_exec($ch);

                // Verifica si ocurrió algún error
                if (curl_errno($ch)) {
                    echo 'Error:' . curl_error($ch);
                }
                else{
                    // Define the URL of the Spring Boot endpoint
                    $url = "http://localhost:8080/ontology/createNewOA";

                    // The data to be sent in the POST request
                    $data = array('oaid' => $new_record_id);

                    // Initialize cURL session
                    $ch = curl_init($url);

                    // Set the cURL options for a POST request
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_POST, true);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data)); // Pass the POST fields

                    // Execute the POST request
                    $response = curl_exec($ch);

                    // Check for errors
                    if (curl_errno($ch)) {
                        echo 'Error:' . curl_error($ch);
                    } 
                    else{
                        // Define the URL of the Spring Boot endpoint with the query parameter
                        $url = "http://localhost:8080/ontology/synchronizeReasoner?ontologia=CONOCIMIENTO";

                        // Initialize cURL session
                        $ch = curl_init($url);

                        // Set the cURL options for a GET request
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                        // Execute the GET request
                        $response = curl_exec($ch);

                        // Check for errors
                        if (curl_errno($ch)) {
                            echo 'Error:' . curl_error($ch);
                        }
                    }
                    // Close the cURL session
                    curl_close($ch);

                }
            }

        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
        }

        return  [$record];
    }

    public static function execute_returns() {

        return new external_multiple_structure(
            new external_single_structure([
                'id' => new external_value(PARAM_INT, 'id', VALUE_OPTIONAL),
                'course' => new external_value(PARAM_INT, 'id of course'),
                'name' => new external_value(PARAM_TEXT, 'multilang compatible name, course unique'),
            ])
        );
    }
}
