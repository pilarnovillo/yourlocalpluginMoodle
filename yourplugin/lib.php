<?php
defined('MOODLE_INTERNAL') || die();
function local_yourplugin_extend_settings_navigation($settingsnav, $context) {
    global $CFG;

    if ($context->contextlevel == CONTEXT_SYSTEM) {
        $node = navigation_node::create(
            'Your Plugin',
            new moodle_url('/local/yourplugin/index.php'),
            navigation_node::TYPE_CUSTOM,
            null,
            'yourplugin',
        );

        if ($CFG->version >= 2021031700) {
            $node->showinflatnavigation = true;
        }

        $settingsnav->add_node($node);
    }
}


