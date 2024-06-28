<?php

class local_yourplugin_observer
{
    // public static function course_module_created(\core\event\course_module_created $event)
    // {
    //     $event_data = $event->get_data();
    //     // var_dump(json_encode($event_data));
        
    //     // die();
    //     global $PAGE, $OUTPUT;
    //     echo $OUTPUT->header();

    //     $PAGE->requires->js_call_amd('local_yourplugin/main', 'init', [json_encode($event_data)]);
    //     // $data = [
    //     //     'name' => 'Lorem ipsum',
    //     // ];
    //     // echo $OUTPUT->render_from_template('local_yourplugin/yourplugin', $data);

    //     echo $OUTPUT->footer();
       
    // }

    public static function course_viewed(\core\event\course_viewed $event)
    {
        $event_data = $event->get_data();
        var_dump(json_encode($event_data));
        
        // die();
        global $PAGE, $OUTPUT;
        // echo $OUTPUT->header();

        // Check if we're viewing a course page
        if ($event->contextlevel==50) {
            // Get the course ID
            $courseid = $PAGE->course->id;

            $PAGE->requires->js_call_amd('local_yourplugin/addButton', 'init', [json_encode($event_data)]);
        }
        // echo "<h2>Selecciona una Unidad:</h2>";
        // echo $PAGE;
        // $PAGE->requires->js_call_amd('local_yourplugin/addButton', 'init', [json_encode($event_data)]);
        
        // $data = [
        //     'name' => 'Lorem ipsum',
        // ];
        // echo $OUTPUT->render_from_template('local_yourplugin/yourplugin', $data);

        // echo $OUTPUT->footer();
       
    }

    



}