<?php

//TODO move this to another file

use core_h5p\local\library\autoloader;
use core_h5p\editor_ajax;
use core_h5p\editor;
use Moodle\H5PCore;

// require_once(__DIR__ . '/config.php');
require(__DIR__ . '/../../config.php');
require_once($CFG->libdir.'/formslib.php');
require_once("$CFG->libdir/filestorage/file_storage.php");
require_once($CFG->libdir.'/adminlib.php');
// echo $CFG->libdir;
// echo __DIR__ .' /../../config.php';
// require 'vendor/autoload.php'; // Importa la biblioteca EasyRDF
require(__DIR__ . '/lib/easyrdf/vendor/autoload.php');

global $PAGE, $CFG, $OUTPUT, $DB;



//h5p config
require_login(null, false);

$contentid = optional_param('id', null, PARAM_INT);
$library = optional_param('library', null, PARAM_TEXT);
$contextid = optional_param('contextid', null, PARAM_INT);
$topic = optional_param('topic', null, PARAM_TEXT);

$context = context_system::instance();
$fs = new file_storage();

require_capability('moodle/h5p:updatelibraries', $context);

// $pagetitle = 'H5P Editor manual testing';
// $url = new \moodle_url("/h5p/index.php");
// Get the current URL with all parameters
// $current_url = new moodle_url('/local/yourplugin/' . basename($_SERVER['REQUEST_URI']));
$current_url=  basename($_SERVER['REQUEST_URI']);
echo basename($_SERVER['REQUEST_URI']);


$PAGE->set_context($context);
// $PAGE->set_url($url);
// $PAGE->set_title($pagetitle);
// $PAGE->set_heading($pagetitle);


echo $OUTPUT->header();

$PAGE->requires->js_call_amd('local_yourplugin/metadatos', 'init', null);

// Get the current date and time as a string
$date_time = date('Ymd_His'); // Example format: 20230610_141501


echo $OUTPUT->footer();
