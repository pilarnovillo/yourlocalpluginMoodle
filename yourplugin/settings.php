<?php
defined('MOODLE_INTERNAL') || die;

if ($hassiteconfig) { // needs this condition or there is error on login page
    
    $settings = new admin_settingpage('local_yourplugin', 'This plugin');
    $ADMIN->add('localplugins', $settings);

    $settings->add(new admin_setting_configtext('local_yourplugin/option',
        'Option', 'Information about this option', 100, PARAM_INT));
}