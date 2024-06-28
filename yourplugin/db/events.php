<?php

defined('MOODLE_INTERNAL') || die();

$observers = [
    [
        'eventname' => '\core\event\course_module_created',
        'callback' => 'local_yourplugin_observer::course_module_created',
    ],
    [
        'eventname' => '\core\event\course_module_viewed',
        'callback' => 'local_yourplugin_observer::course_module_viewed',
    ],
    [
        'eventname' => '\core\event\course_viewed',
        'callback' => 'local_yourplugin_observer::course_viewed',
    ],
];