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
class save_changes_automatically extends external_api {
    /**
     * Parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters(
            array(
                'oaid' => new external_value(PARAM_INT, 'The ID of the entity'),
                'raoa' => new external_single_structure(
                    array(
                        'raasignatura' => new external_multiple_structure(
                            new external_value(PARAM_TEXT, 'RA Asignatura')
                        ),
                        'verbo' => new external_value(PARAM_TEXT, 'Verbo description'),
                        'objeto' => new external_value(PARAM_TEXT, 'Objeto description'),
                        'condicion' => new external_value(PARAM_TEXT, 'Condicion description'),
                        'finalidad' => new external_value(PARAM_TEXT, 'Finalidad description')
                    ), 'Dictionary description'
                ),
                'contenidos' => new external_multiple_structure(
                    new external_value(PARAM_TEXT, 'Description of each string in the array'),
                    'Description of the array of strings'
                ),
                'actividades' => new external_multiple_structure(
                    new external_single_structure(
                        array(
                            'fieldX' => new external_value(PARAM_TEXT, 'Field X description'),
                            'fieldY' => new external_value(PARAM_TEXT, 'Field Y description')
                        )
                    ), 'Array 3 description'
                ),
                'metadatos' => new external_multiple_structure(
                    new external_single_structure(
                        array(
                            'fieldI' => new external_value(PARAM_INT, 'Field I description'),
                            'fieldII' => new external_value(PARAM_INT, 'Field II description'),
                            'fieldIII' => new external_value(PARAM_INT, 'Field III description')
                        )
                    ), 'Array 4 description'
                ),
            )
        );
    }


    public static function execute( int $oaid, array $raoa, array $contenidos, array $actividades, array $metadatos,): array {
        require(__DIR__ . '/../../lib/easyrdf/vendor/autoload.php');
       // Configura el endpoint SPARQL
       $record = new \stdClass();
        try {
            $record->message = "no entro al for";
            // Configura el endpoint SPARQL
            $endpoint1 = 'http://localhost:3030/OA'; // Cambia 'dataset' por el nombre de tu dataset
        
            $sparql1 = new \EasyRdf\Sparql\Client($endpoint1);
        
            foreach ($raoa["raasignatura"] as $raasignatura) {
                $insertQuery = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
                INSERT DATA {
            
                    oaca:RA{$oaid} oaca:raOARefinaRAAsignatura  oaca:{$raasignatura}.
                    
                }"; 

                $resultInsert = $sparql1->update($insertQuery);

                $record->message = "Result Status: ".$resultInsert->getStatus();
            }

            // Verbo
            $verbo = $raoa["verbo"];

            $insertQueryVerbo = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
                INSERT DATA {
            
                    oaca:RA{$oaid} oaca:raTieneVerbo  oaca:{$verbo}.
                    
                }"; 

            $resultInsertVerbo = $sparql1->update($insertQueryVerbo);

            $record->message = "Result Status Verbo: ".$resultInsertVerbo->getStatus();

            
            //Almacenar topicos seleccionados en el OA
            // foreach ($contenidos as $topicoSeleccionado) {
            //     $insertQuery = "PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>
            //     INSERT DATA {
            
            //         oaca:RA{$oaid} oaca:raOARefinaRAAsignatura  oaca:{$raasignatura}.
                    
            //     }"; 

            //     $resultInsert = $sparql1->update($insertQuery);

            //     $record->message = "Result Status: ".$resultInsert->getStatus();
            // }
            
            
            
        
            // echo "RESULTS INSERT DATA " . $resultInsert;
            // echo "Data inserted successfully. Response code: " . $resultInsert->getStatus() . "\n";
        } catch (Exception $e) {
            $record->message = $e->getMessage();
        }

        
        

        return [$record];
    }

    public static function execute_returns() {

        return new external_multiple_structure(
            new external_single_structure([
                'message' => new external_value(PARAM_TEXT, 'id', VALUE_OPTIONAL),
            ])
        );
    }
}
