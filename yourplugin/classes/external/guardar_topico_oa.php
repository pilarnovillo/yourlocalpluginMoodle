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
class guardar_topico_oa extends external_api {
    /**
     * Parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters(
            [
                'idTopico' => new external_value(
                    PARAM_TEXT,
                    'id topico'
                ),
                'oaid' =>  new external_value(PARAM_INT, 'The ID of the entity'),
                'selected' => new external_value(PARAM_BOOL, 'The boolean value indicating if selected o deleted'),
            ]
        );
    }


    public static function execute(string $idTopico, int $oaid, bool $selected ): array {
        require(__DIR__ . '/../../lib/easyrdf/vendor/autoload.php');
       // Configura el endpoint SPARQL
       $record = new \stdClass();
        try {

            $record->message = "no entro al if";
            // Configura el endpoint SPARQL
            $endpoint1 = 'http://localhost:3030/OA'; // Cambia 'dataset' por el nombre de tu dataset
        
            $sparql1 = new \EasyRdf\Sparql\Client($endpoint1);

            if($selected){
                $insertQuery = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
                INSERT DATA {
            
                    oaca:Contenido{$oaid} oaca:contenidoDesarrollaTopico  oaca:{$idTopico}.
                    
                }"; 

                $resultInsert = $sparql1->update($insertQuery);

                $record->message = "Result Status: ".$resultInsert->getStatus();
            }
            else{
                $deleteQuery = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
                DELETE DATA {
            
                    oaca:Contenido{$oaid} oaca:contenidoDesarrollaTopico  oaca:{$idTopico}.
                    
                }"; 

                $resultInsert = $sparql1->update($deleteQuery);

                $record->message = "Result Status: ".$resultInsert->getStatus();

            }
            

        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            $record->message = $e->getMessage();
        }

        return  [$record];
    }

    public static function execute_returns() {

        return new external_multiple_structure(
            new external_single_structure([
                'message' => new external_value(PARAM_TEXT, 'id', VALUE_OPTIONAL),
            ])
        );
    }
}
