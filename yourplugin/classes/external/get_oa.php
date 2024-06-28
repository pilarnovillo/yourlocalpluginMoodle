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
class get_oa extends external_api {
    /**
     * Parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters(
            [
                'courseid' => new external_value(PARAM_INT, 'courseid')
            ]
        );
    }


    public static function execute(int $courseid): array {
        global $CFG, $DB;
        require_once("$CFG->dirroot/group/lib.php");

        $transaction = $DB->start_delegated_transaction(); //If an exception is thrown in the below code, all DB queries in this code will be rollback.

        // Define the conditions for your query
        $conditions = array('course' => $courseid);

        // Fetch the records
        $records = $DB->get_records('localyourpluginoa', $conditions);
        // var_dump($records);

        $transaction->allow_commit();

        // Prepare the result

        // Check if any records were returned and process them
        foreach ($records as $record) {
                $result[] = (array) $record; // Convert each record to an array
        }
       

        return $result;
    }

    public static function execute_returns() {

        return new external_multiple_structure(
            new external_single_structure(
                array(
                    'id' => new external_value(PARAM_INT, 'ID of the record'),
                    'course' => new external_value(PARAM_INT, 'Course ID'),
                    'name' => new external_value(PARAM_TEXT, 'Name'),
                )
            )
        );
    }
}
