<?php

class local_yourplugin_observer
{
    public static function course_viewed(\core\event\course_viewed $event)
    {
        $event_data = $event->get_data();
        
        global $PAGE, $OUTPUT;

        // Verificar si estamos dentro de un curso
        if ($event->contextlevel==50) {
            // Obtener ID del curso
            $courseid = $PAGE->course->id;

            // Incluir javascript
            $PAGE->requires->js_call_amd('local_yourplugin/addButton', 'init', [json_encode($event_data)]);
        }
    }
}