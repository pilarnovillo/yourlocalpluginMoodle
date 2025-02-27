<?php

namespace local_yourplugin\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_multiple_structure;
use core_external\external_value;

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
        $record = new \stdClass();
        try {

            $record->message = "Existoso";

            if($selected){
                //OWLAPI Integration
                $url = "http://localhost:8080/ontology/linkTopicToOA?oaid=" . urlencode($oaid)."&idTopic=".urlencode($idTopico);

                $ch = curl_init($url);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);

                $response = curl_exec($ch);

                if (curl_errno($ch)) {
                    echo 'Error:' . curl_error($ch);
                }

                curl_close($ch);
            }
            else{
                //OWLAPI Integration
                $url = "http://localhost:8080/ontology/unlinkTopicToOA?oaid=" . urlencode($oaid)."&idTopic=".urlencode($idTopico);

                $ch = curl_init($url);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);

                $response = curl_exec($ch);

                if (curl_errno($ch)) {
                    echo 'Error:' . curl_error($ch);
                }

                curl_close($ch);
            }
            

        } catch (Exception $e) {
            $record->message = $e->getMessage();
        }

        return  [$record];
    }

    public static function execute_returns() {

        return new external_multiple_structure(
            new external_single_structure([
                'message' => new external_value(PARAM_TEXT, 'message', VALUE_OPTIONAL),
            ])
        );
    }
}
