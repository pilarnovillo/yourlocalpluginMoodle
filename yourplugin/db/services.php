<?php

defined('MOODLE_INTERNAL') || die;

$functions = [
    'local_yourplugin_store_oa_fields' => [
        'classname'     => 'local_yourplugin\external\store_oa_fields',
        'classpath'     => '',
        'description'   => 'Stores OAs fields on the DB',
        'type'          => 'write',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_store_oa' => [
        'classname'     => 'local_yourplugin\external\store_oa',
        'classpath'     => '',
        'description'   => 'Stores OAs on the DB',
        'type'          => 'write',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_get_oa_fields' => [
        'classname'     => 'local_yourplugin\external\get_oa_fields',
        'classpath'     => '',
        'description'   => 'Get OAs from the DB',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_get_oa' => [
        'classname'     => 'local_yourplugin\external\get_oa',
        'classpath'     => '',
        'description'   => 'Get OAs from the DB',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_save_changes_automatically' => [
        'classname'     => 'local_yourplugin\external\save_changes_automatically',
        'classpath'     => '',
        'description'   => 'save_changes_automatically',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_verify_verb_level' => [
        'classname'     => 'local_yourplugin\external\verify_verb_level',
        'classpath'     => '',
        'description'   => 'check verb',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_get_oa_ontology' => [
        'classname'     => 'local_yourplugin\external\get_oa_ontology',
        'classpath'     => '',
        'description'   => 'get_oa_ontology',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_guardar_topico_oa' => [
        'classname'     => 'local_yourplugin\external\guardar_topico_oa',
        'classpath'     => '',
        'description'   => 'guardar o eliminar relacion entre oa y topico',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
    'local_yourplugin_get_oa_topics' => [
        'classname'     => 'local_yourplugin\external\get_oa_topics',
        'classpath'     => '',
        'description'   => 'get selected topics on the oa',
        'type'          => 'read',
        'ajax'        => true,
        'services'      => [MOODLE_OFFICIAL_MOBILE_SERVICE],
    ],
];
