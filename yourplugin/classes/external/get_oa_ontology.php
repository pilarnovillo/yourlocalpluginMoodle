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
class get_oa_ontology extends external_api {
    /**
     * Parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters(
            [
                'id' => new external_value(PARAM_INT, 'id')
            ]
        );
    }


    public static function execute(int $id): array {
        require(__DIR__ . '/../../lib/easyrdf/vendor/autoload.php');

        $record = new \stdClass();
        try{
            // Configura el endpoint SPARQL
            $endpoint = 'http://localhost:3030/OA/sparql'; // Reemplaza 'dataset' con el nombre de tu dataset

            // Define la consulta SPARQL
            $sparql = new \EasyRdf\Sparql\Client($endpoint);

            $query = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX oaca: <http://www.semanticweb.org/valer/ontologies/OntoOA#>

            SELECT * WHERE { 
                ?oa a oaca:OA.
                FILTER(?oa = oaca:OA$id)
                ?oa  oaca:oaTieneComponente  ?ra .
                ?ra a oaca:ResultadoAprendizajeOA.
                ?ra oaca:raOARefinaRAAsignatura ?raasig.
            }";

            $results = $sparql->query($query);


            // Inicializa arrays para agrupar las instancias
            $raasigArray = [];
            
            // Procesa cada resultado
            foreach ($results as $result) {
                $record = new \stdClass();
                $raasig = (string) $result->raasig;
                $record->raasig = $raasig;
                array_push($raasigArray, $record);
            }

            

        }catch (Exception $e) {
            return [$e->getMessage()] ;
        }
        

        return  $raasigArray;
    }

    public static function execute_returns() {

        return new external_multiple_structure(
            new external_single_structure([
                'raasig' => new external_value(PARAM_TEXT, 'ra', VALUE_OPTIONAL),
            ])
        );
    }
}
