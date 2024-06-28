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
class verify_verb_level extends external_api {
    /**
     * Parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters(
            [
                'raasignatura' => new external_value(PARAM_TEXT, 'raasignatura'),
                'verbo' => new external_value(
                    PARAM_TEXT,
                    'verb'
                )
            ]
        );
    }


    public static function execute( string $raasignatura, string $verbo): array {
        require(__DIR__ . '/../../lib/easyrdf/vendor/autoload.php');
       // Configura el endpoint SPARQL
        $endpoint = 'http://localhost:3030/OA/sparql'; // Reemplaza 'dataset' con el nombre de tu dataset

        // Define la consulta SPARQL
        $sparql = new \EasyRdf\Sparql\Client($endpoint);

        $query = '
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

        $rows = $sparql->query($query);

        // Initialize an array to store the results
        $results = array();

        // Process the results
        foreach ($rows as $row) {
            // Concatenate the values into a single string
            // $result = $row->value . ' ' . $row->nivelRAAsignatura . ' ' . $row->nivelOtroVerbo;
            $result = array(
                'value' => ' ' . $row->value,
                'nivelRAAsignatura' =>' ' .  $row->nivelRAAsignatura,
                'nivelOtroVerbo' => ' ' . $row->nivelOtroVerbo
            );
        }

        return array('result' => $result);
    }

    public static function execute_returns() {

        return new external_single_structure(
            [
                'result' => new external_single_structure([
                    'value' => new external_value(PARAM_TEXT, 'Id of the created user'),
                    'nivelRAAsignatura' => new external_value(PARAM_TEXT, 'The name of the group'),
                    'nivelOtroVerbo' => new external_value(PARAM_TEXT, 'The name of the group'),
                ])
            ]
        );
    }
}
