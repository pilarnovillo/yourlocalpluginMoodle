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
