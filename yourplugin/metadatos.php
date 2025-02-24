<?php

require(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/formslib.php');
require_once("$CFG->libdir/filestorage/file_storage.php");
require_once($CFG->libdir.'/adminlib.php');

global $PAGE, $CFG, $OUTPUT, $DB;

// Requiere que el usuario inicie sesión
require_login(null, false);

$context = context_system::instance();

// Obtener URL
$current_url=  basename($_SERVER['REQUEST_URI']);

$PAGE->set_context($context);

echo $OUTPUT->header();

// Incluir javascript
$PAGE->requires->js_call_amd('local_yourplugin/metadatos', 'init', null);

echo $OUTPUT->footer();
