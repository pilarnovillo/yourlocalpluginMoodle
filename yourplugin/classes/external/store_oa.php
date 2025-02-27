<?php

namespace local_yourplugin\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_multiple_structure;
use core_external\external_value;

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

        $transaction = $DB->start_delegated_transaction(); 
        $record = new \stdClass();
        $record->name = $name;
        $record->course = $courseid;
        $new_record_id = $DB->insert_record('localyourpluginoa', $record);
        $record->id = $new_record_id;

        $transaction->allow_commit();

        try {
            
            //OWLAPI integration
            // URL del endpoint con el parámetro oaid
            $apiUrl = 'http://localhost:8080/ontology/startService?oaidParam=' . urlencode($new_record_id); 

            // Inicializa cURL
            $ch = curl_init();

            // Configura la URL y otras opciones
            curl_setopt($ch, CURLOPT_URL, $apiUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            // Ejecuta la solicitud y guarda la respuesta
            $response = curl_exec($ch);

            // Verifica si ocurrió algún error
            if (curl_errno($ch)) {
                echo 'Error:' . curl_error($ch);
            } else {
                // URL del endpoint para razonar
                $apiUrl = 'http://localhost:8080/ontology/razonar?ontologia=CONOCIMIENTO'; 

                // Configura la URL y otras opciones
                curl_setopt($ch, CURLOPT_URL, $apiUrl);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 

                // Ejecuta la solicitud y guarda la respuesta
                $response = curl_exec($ch);

                // Verifica si ocurrió algún error
                if (curl_errno($ch)) {
                    echo 'Error:' . curl_error($ch);
                }
                else{
                    // Define the URL 
                    $url = "http://localhost:8080/ontology/createNewOA";

                    $data = array('oaid' => $new_record_id);

                    $ch = curl_init($url);

                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch, CURLOPT_POST, true);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

                    $response = curl_exec($ch);

                    if (curl_errno($ch)) {
                        echo 'Error:' . curl_error($ch);
                    } 
                    else{
                        $url = "http://localhost:8080/ontology/synchronizeReasoner?ontologia=CONOCIMIENTO";

                        $ch = curl_init($url);

                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                        $response = curl_exec($ch);

                        if (curl_errno($ch)) {
                            echo 'Error:' . curl_error($ch);
                        }
                    }
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
