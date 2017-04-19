<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', 'Mikrotik@index');
$app->get('/login', ['as' => 'login', 'uses' => 'Login@index']);
$app->get('/logout', ['as' => 'logout', 'uses' => 'Login@logout']);

$app->get('/boards', 'Mikrotik@boards');
$app->get('/filters', 'Mikrotik@filter_rules');
$app->get('/nat', 'Mikrotik@nat');
$app->get('/mangle', 'Mikrotik@mangle');
$app->get('/address-lists', 'Mikrotik@address_lists');
$app->get('/layer7-protocols', 'Mikrotik@layer7_protocols');

$app->get('/pull/filter-rules/{rb}', 'Mikrotik@import_filter_rules');
$app->get('/pull/nat/{rb}', 'Mikrotik@import_nat');
$app->get('/pull/mangle/{rb}', 'Mikrotik@import_mangle');
$app->get('/pull/address-lists/{rb}', 'Mikrotik@import_address_lists');
$app->get('/pull/layer-7-protocols/{rb}', 'Mikrotik@import_layer7_protocols');

$app->post('/push/filters/{rb}', 'Mikrotik@push_filter_rules');
$app->post('/push/nat/{rb}', 'Mikrotik@push_nat');
$app->post('/push/mangle/{rb}', 'Mikrotik@push_mangle');
$app->post('/push/address-lists/{rb}', 'Mikrotik@push_address_lists');
$app->post('/push/layer-7-protocols/{rb}', 'Mikrotik@push_layer7_protocols');

$app->get('/boards/delete', 'Mikrotik@delete_boards');
$app->get('/filters/delete/{rb}', 'Mikrotik@delete_filters');
$app->get('/nat/delete/{rb}', 'Mikrotik@delete_nat');
$app->get('/mangle/delete/{rb}', 'Mikrotik@delete_mangle');
$app->get('/address-lists/delete/{rb}', 'Mikrotik@delete_address_lists');
$app->get('/layer-7-protocols/delete/{rb}', 'Mikrotik@delete_layer7_protocols');

$app->post('/boards/save', 'Mikrotik@save_board');
$app->post('/filters/save', 'Mikrotik@save_filter_rules');
$app->post('/nat/save', 'Mikrotik@save_nat');
$app->post('/mangle/save', 'Mikrotik@save_mangle');
$app->post('/address-lists/save', 'Mikrotik@save_address_list');
$app->post('/layer-7-protocols/save', 'Mikrotik@save_layer7_protocol');

$app->post('/boards/update', 'Mikrotik@update_board');
$app->post('/filters/update', 'Mikrotik@update_filter_rules');
$app->post('/nat/update', 'Mikrotik@update_nat');
$app->post('/mangle/update', 'Mikrotik@update_mangle');
$app->post('/address-lists/update', 'Mikrotik@update_address_list');
$app->post('/layer-7-protocols/update', 'Mikrotik@update_layer7_protocol');

$app->get('/urls', ['as' => 'urls', 'uses' => 'Mikrotik@urls']);

$app->get('/key', function(){
	return str_random(32);
});

$app->get('/canvas[/{text}]', 'Canvas@index');

$app->post('/login', 'Login@authenticate');