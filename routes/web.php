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

$app->get('/urls', ['as' => 'urls', 'uses' => 'Mikrotik@urls']);

$app->get('/key', function(){
	return str_random(32);
});

$app->post('/login', 'Login@authenticate');